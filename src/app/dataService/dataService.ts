import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Consts from '../consts';
import UserQuiz from '../model/userQuiz';
import { CookieService } from 'ngx-cookie-service';
import { AttemptedQuiz } from '../model/cookies/attemptedQuizzes';
import FriendDetails from '../model/cookies/friendsDetails';
import UserDetails from '../model/cookies/userDetails';

@Injectable()
export class DataService {
  USER_ID_QUERY = '?userId=';
  QUIZ_ID_QUERY = '?quizId=';
  CONTENT_TYPE = 'content-type';
  APPLICATION_JSON = 'application/json';

  registerUserUrl: string;
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  //#region post operations
  registerUser(userName: string) {
    const headers: HttpHeaders = this.createHeader();
    console.log(Consts.RegisterUserUrl);
    return this.http.post(
      Consts.RegisterUserUrl,
      JSON.stringify({ name: userName }),
      {
        headers: headers
      }
    );
  }

  registerFriend(userId: string, friendName: string) {
    const headers: HttpHeaders = this.createHeader();
    return this.http.post(
      Consts.RegisterFriendUrl + this.USER_ID_QUERY + userId,
      JSON.stringify({ name: friendName }),
      {
        headers: headers
      }
    );
  }

  postQuizDetails(
    quizId: string,
    accessToken: string,
    questions: Array<UserQuiz>
  ) {
    let headers: HttpHeaders = this.createHeader();
    headers = headers.set(Consts.AccessTokenString, accessToken);
    return this.http.post(
      Consts.PostQuizDetailsUrl + this.QUIZ_ID_QUERY + quizId,
      questions,
      {
        headers: headers
      }
    );
  }

  validateQuiz(
    quizId: string,
    friendId: string,
    accessToken: string,
    answers: Array<UserQuiz>
  ) {
    let headers: HttpHeaders = this.createHeader();
    headers = headers.set(Consts.AccessTokenString, accessToken);
    return this.http.post(
      Consts.ValidateQuizUrl +
        this.QUIZ_ID_QUERY +
        quizId +
        '&friendId=' +
        friendId,
      answers,
      { headers: headers }
    );
  }

  deleteResult(quizId: string, friendId: string, accessToken: string) {
    let headers: HttpHeaders = this.createHeader();
    headers = headers.set(Consts.AccessTokenString, accessToken);
    return this.http.post(
      Consts.DeleteFriendUrl + this.USER_ID_QUERY + quizId,
      JSON.stringify({ friendId: friendId }),
      {
        headers: headers
      }
    );
  }

  isUserValid(userId: string, accessToken: string) {
    const headers: HttpHeaders = this.createHeader();
    return this.http.post(
      Consts.IsUserValidUrl + this.USER_ID_QUERY + userId,
      JSON.stringify({ accessToken: accessToken }),
      {
        headers: headers
      }
    );
  }
  //#endregion

  //#region get operations
  getAllQuestions() {
    const headers: HttpHeaders = this.createHeader();
    return this.http.get(Consts.GetAllQuestionsUrl, { headers: headers });
  }

  getUserQuestions(userId: string) {
    const headers: HttpHeaders = this.createHeader();
    return this.http.get(
      Consts.GetUserQuestionsUrl + this.USER_ID_QUERY + userId,
      {
        headers: headers
      }
    );
  }

  getUserName(userId: string) {
    const headers: HttpHeaders = this.createHeader();
    return this.http.get(Consts.GetUserNameUrl + this.USER_ID_QUERY + userId, {
      headers: headers
    });
  }

  getUserQuizResults(userId: string) {
    const headers: HttpHeaders = this.createHeader();
    return this.http.get(
      Consts.GetUserQuizResultsUrl + this.USER_ID_QUERY + userId,
      {
        headers: headers
      }
    );
  }

  isQuizInProgress(quizId: string): boolean {
    const attemptedQuiz: AttemptedQuiz = this.getAttemptedQuizDetails(quizId);
    if (this.isDataValid(attemptedQuiz)) {
      return true;
    }
    return false;
  }

  isUserAlreadyProvidedAnswer(quizId: string, questionId: string): boolean {
    const attemptedQuiz: AttemptedQuiz = this.getAttemptedQuizDetails(quizId);
    if (
      this.isDataValid(attemptedQuiz) &&
      this.isDataValid(attemptedQuiz.userSelected)
    ) {
      const userSelected: UserQuiz[] = attemptedQuiz.userSelected.filter(
        s => s.questionId === questionId
      );
      if (this.isDataValid(userSelected) && userSelected.length > 0) {
        return true;
      }
    }
    return false;
  }

  getUserAlreadyProvidedAnswer(quizId: string, questionId: string): UserQuiz {
    const attemptedQuiz: AttemptedQuiz = this.getAttemptedQuizDetails(quizId);
    if (
      this.isDataValid(attemptedQuiz) &&
      this.isDataValid(attemptedQuiz.userSelected)
    ) {
      const userSelected: UserQuiz[] = attemptedQuiz.userSelected.filter(
        s => s.questionId === questionId
      );
      if (this.isDataValid(userSelected) && userSelected.length > 0) {
        return userSelected[0];
      }
    }
    return null;
  }
  isQuizCompleted(quizId: string): boolean {
    let quizCompleted = false;
    const friendDetails: FriendDetails = this.getFriendDetailsFromCookie(
      quizId
    );
    if (this.isDataValid(friendDetails)) {
      quizCompleted = friendDetails.quizCompleted;
    }
    return quizCompleted;
  }

  getDetailsOfCompletedQuiz(quizId: string): UserQuiz[] {
    let userQuizzes: UserQuiz[] = [];
    const attemptedQuiz: AttemptedQuiz = this.getAttemptedQuizDetails(quizId);
    if (this.isDataValid(attemptedQuiz)) {
      userQuizzes = attemptedQuiz.userSelected;
    }
    return userQuizzes;
  }

  setAttemptedQuizzesInCookie(
    quizId: string,
    score: number,
    newSelectedOption: UserQuiz
  ) {
    const newAttemptedQuiz: AttemptedQuiz = new AttemptedQuiz();
    newAttemptedQuiz.score = score;
    newAttemptedQuiz.quizId = quizId;
    newAttemptedQuiz.userSelected = [];
    const attemptedQuizzDetails: AttemptedQuiz = this.getAttemptedQuizDetails(
      quizId
    );
    if (this.isDataValid(attemptedQuizzDetails)) {
      newAttemptedQuiz.userSelected = attemptedQuizzDetails.userSelected;
      if (
        this.isDataValid(
          attemptedQuizzDetails.userSelected.find(
            u => u.questionId === newSelectedOption.questionId
          )
        ) === false
      ) {
        newAttemptedQuiz.userSelected.push(newSelectedOption);
      }
    } else {
      newAttemptedQuiz.userSelected.push(newSelectedOption);
    }
    let allAttemptedQuizzes: AttemptedQuiz[] = this.getAttemptedQuizDetailsFromCookie();
    if (this.isDataValid(allAttemptedQuizzes)) {
      if (allAttemptedQuizzes.find(q => q.quizId === quizId)) {
        allAttemptedQuizzes.splice(
          allAttemptedQuizzes.findIndex(q => q.quizId === quizId),
          1
        );
      }
    } else {
      allAttemptedQuizzes = [];
    }
    allAttemptedQuizzes.push(newAttemptedQuiz);
    this.cookieService.set(
      Consts.AttemptedQuizzesCookie,
      JSON.stringify(allAttemptedQuizzes),
      Consts.CookieExpiryDays,
      '/'
    );
  }

  setFriendDetailsInCookie(
    quizId: string,
    friendId: string,
    friendAccessToken: string,
    quizCompleted: boolean = false,
    score: number = 0
  ): void {
    const friend: FriendDetails = new FriendDetails();
    const friends: FriendDetails[] = this.getAllFriendsDetailsFromCookie();
    const foundFriends: FriendDetails[] = friends.filter(
      f => f.friendId === friendId
    );
    friend.friendId = friendId;
    friend.quizId = quizId;
    friend.accessToken = friendAccessToken;
    friend.quizCompleted = quizCompleted;
    friend.score = score;

    if (this.isDataValid(foundFriends) && foundFriends.length > 0) {
      foundFriends.forEach(f => {
        friends.splice(friends.indexOf(f), 1);
      });
    }
    friends.push(friend);
    this.cookieService.set(
      Consts.FriendsDetailsCookieName,
      JSON.stringify(friends),
      Consts.CookieExpiryDays,
      '/'
    );
    console.log(friends);
  }

  getFriendDetailsFromCookie(quizId: string): FriendDetails {
    let friend: FriendDetails;
    const friendsCookie = this.cookieService.get(
      Consts.FriendsDetailsCookieName
    );
    console.log(friendsCookie);
    if (this.isDataValid(friendsCookie)) {
      const allFriends: FriendDetails[] = JSON.parse(
        friendsCookie
      ) as FriendDetails[];
      if (this.isDataValid(allFriends)) {
        const foundFriends: FriendDetails[] = allFriends.filter(
          f => f.quizId === quizId
        );
        if (this.isDataValid(foundFriends)) {
          friend = foundFriends[0];
        }
      }
    }
    return friend;
  }

  getAllFriendsDetailsFromCookie(): FriendDetails[] {
    let friends: FriendDetails[] = [];
    const friendsCookie = this.cookieService.get(
      Consts.FriendsDetailsCookieName
    );
    console.log(friendsCookie);
    if (this.isDataValid(friendsCookie)) {
      friends = JSON.parse(friendsCookie) as FriendDetails[];
    }
    return friends;
  }

  setUserDetailsInCookie(userId: string, accessToken: string) {
    const userDetails: UserDetails = new UserDetails();
    userDetails.userId = userId;
    userDetails.accessToken = accessToken;
    this.cookieService.set(
      Consts.UserDetailsCookieName,
      JSON.stringify(userDetails),
      Consts.CookieExpiryDays,
      '/'
    );
  }

  getUserDetailsFromCookie(): UserDetails {
    let userDetails: UserDetails = new UserDetails();
    const userDetailsCookie = this.cookieService.get(
      Consts.UserDetailsCookieName
    );
    if (this.isDataValid(userDetailsCookie)) {
      userDetails = JSON.parse(userDetailsCookie) as UserDetails;
    }
    return userDetails;
  }

  getCurrentUserIdFromCookie(): string {
    const userDetails: UserDetails = this.getUserDetailsFromCookie();
    if (this.isDataValid(userDetails)) {
      return userDetails.userId;
    }
    return null;
  }

  getCurrentUSerAccessTokenFromCookie(): string {
    const userDetails: UserDetails = this.getUserDetailsFromCookie();
    if (this.isDataValid(userDetails)) {
      return userDetails.accessToken;
    }
    return null;
  }

  isDataValid(data: any): boolean {
    if (data !== undefined && data !== null && data !== '') {
      return true;
    }
    return false;
  }

  public isAndroid(): boolean {
    if (navigator.userAgent.match(/Android/i)) {
      return true;
    }
    return false;
  }

  public isIOS(): boolean {
    if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
      return true;
    }
    return false;
  }

  //#endregion

  //#region private functions
  private createHeader(): HttpHeaders {
    const headers: HttpHeaders = new HttpHeaders().set(
      this.CONTENT_TYPE,
      this.APPLICATION_JSON
    );
    return headers;
  }

  private getAttemptedQuizDetails(quizId: string): AttemptedQuiz {
    const attemptedQuizzes: Array<
      AttemptedQuiz
    > = this.getAttemptedQuizDetailsFromCookie();
    if (this.isDataValid(attemptedQuizzes)) {
      const attemptedQuizDetails: AttemptedQuiz[] = attemptedQuizzes.filter(
        q => q.quizId === quizId
      );
      if (
        this.isDataValid(
          attemptedQuizDetails && attemptedQuizDetails.length > 0
        )
      ) {
        return attemptedQuizzes[0];
      }
    }
    return null;
  }

  private getAttemptedQuizDetailsFromCookie(): AttemptedQuiz[] {
    const attemptedQuizzesCookieValue: string = this.cookieService.get(
      Consts.AttemptedQuizzesCookie
    );
    if (this.isDataValid(attemptedQuizzesCookieValue)) {
      const attemptedQuizzes: AttemptedQuiz[] = JSON.parse(
        attemptedQuizzesCookieValue
      ) as AttemptedQuiz[];
      if (this.isDataValid(attemptedQuizzes)) {
        return attemptedQuizzes;
      }
    }
    return null;
  }

  //#endregion
}
