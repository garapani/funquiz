import { environment } from '../environments/environment';

export default class Consts {
  public static RegisterUserUrl = Consts.GetServerUrl() + '/api/User/RegisterUser/';
  public static RegisterFriendUrl = Consts.GetServerUrl() + '/api/Friend/RegisterFriend/';
  public static GetUserQuestionsUrl = Consts.GetServerUrl() + '/api/User/GetUserQuestions/';
  public static GetUserNameUrl = Consts.GetServerUrl() + '/api/User/GetUserName/';
  public static GetUserQuizDetailsUrl = Consts.GetServerUrl() + '/api/User/GetUserQuizDetails/';
  public static GetUserQuizResultsUrl = Consts.GetServerUrl() + '/api/User/QuizResult/';
  public static GetAllQuestionsUrl = Consts.GetServerUrl() + '/api/Questions/GetQuestions/';
  public static PostQuizDetailsUrl = Consts.GetServerUrl() + '/api/Quiz/UpdateQuiz/';
  public static ValidateQuizUrl = Consts.GetServerUrl() + '/api/Quiz/ValidateQuiz/';
  public static DeleteFriendUrl = Consts.GetServerUrl() + '/api/User/DeleteFriend/';
  public static IsUserValidUrl = Consts.GetServerUrl() + '/api/User/IsUserValid/';

  public static InviteUrl = Consts.GetHostUrl() + '/invitePage/';
  public static FacebookAppId = '216947332352224';
  public static AccessTokenString = 'accessToken';

  // route params
  public static AccessTokenRouteParam = 'AccessToken';
  public static QuizIdRouteParam = 'QuizId';
  public static FriendIdRouteParam = 'FriendId';
  public static FriendAccessTokenRouteParam = 'FriendAccessToken';

  // cookie related
  public static CookieExpiryDays = 120;
  public static FriendsDetailsCookieName = 'friends';
  public static UserDetailsCookieName = 'user';
  public static AttemptedQuizzesCookie = 'attemptedQuizzes';

  public static HomePagePath = 'homePage';
  public static AnswerQuizPagePath = 'answerQuizPage';
  public static CreateQuizPagePath = 'createQuizPage';
  public static ShareQuizPagePath = 'shareQuizPage';
  public static InvitePagePath = 'invitePage/:' + Consts.QuizIdRouteParam;
  public static FriendPagePath = 'friendPage';
  public static QuizResultPagePath = 'quizResult';
  public static ScorePagePath = 'scorePage';
  public static ScoresPagePath = 'scoresPage';

  private static GetServerUrl(): string {
    return 'https://funquiz.in';
    if (environment.production) {
      return 'http://funquiz.in';
    } else {
      return 'http://localhost:4000';
    }
  }

  private static GetHostUrl(): string {
    return 'https://funquiz.in';
    if (environment.production) {
      return 'http://funquiz.in';
    } else {
      return 'http://localhost:80';
    }
  }
}
