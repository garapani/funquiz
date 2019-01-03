import enviroment from '../environment';

export const MONGO_DB_DEV_CONNECTION_STRING: string = 'mongodb://localhost/funquiz';
export const MONGO_DB_PROD_CONNECTION_STRING: string = 'mongodb://database/funquiz';

export const InviteUrl: string = enviroment.getHostUrl() + '/invitePage/';
export const FacebookAppId: string = '216947332352224';
export const AccessTokenString: string = 'accessToken';
export const AccessTokenCookie: string = 'accessToken';
export const UserIdCookie: string = 'userId';

export const AccessTokenParam: string = 'AccessToken';
export const QuizIdParam: string = 'QuizId';
export const FriendIdParam: string = 'FriendId';
export const FriendAccessTokenParam: string = 'FriendAccessToken';
export const CookieExpiryTime: number = 120;

export const HomePagePath: string = 'homePage';
export const AnswerQuizPagePath: string = 'answerQuizPage';
export const CreateQuizPagePath: string = 'createQuizPage';
export const ShareQuizPagePath: string = 'shareQuizPage';
// export const InvitePagePath = 'invitePage/ =' + enviroment.QuizIdParam; //Todo
export const FriendPagePath: string = 'friendPage';
export const QuizResultPagePath: string = 'quizResult';
export const ScorePagePath: string = 'scorePage';
export const ScoresPagePath: string = 'scoresPage';
