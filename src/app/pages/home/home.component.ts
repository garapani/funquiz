import { Component, OnInit } from '@angular/core';
import Consts from '../../consts';
import { DataService } from '../../dataService/dataService';
import { Router } from '@angular/router';
import RegisterUser from '../../model/registerUser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    './home.component.css',
    './home.component.mobile.css',
    '../../global.css',
    '../../global.mobile.css'
  ],
  providers: [DataService]
})
export class HomeComponent implements OnInit {
  userName: string;
  isQuizStarted: boolean;

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {
    const userId = this.dataService.getCurrentUserIdFromCookie();
    console.log(userId);
    if (this.dataService.isDataValid(userId)) {
      this.router.navigate([Consts.ShareQuizPagePath, { QuizId: userId }]);
    }
  }

  onStart() {
    this.isQuizStarted = true;
  }

  onCreateQuiz() {
    if (this.dataService.isDataValid(this.userName)) {
      this.dataService.registerUser(this.userName).subscribe(
        function(data) {
          console.log(data);
          if (data != null) {
            const registeredUser = data as RegisterUser;
            this.router.navigate([
              Consts.CreateQuizPagePath,
              {
                QuizId: registeredUser.userId,
                AccessToken: registeredUser.accessToken
              }
            ]);
            console.log('exiting onCreateQuiz of homeComponent');
          }
        }.bind(this),
        function(error) {
          console.log(error);
        }.bind(this)
      );
    }
  }
}
