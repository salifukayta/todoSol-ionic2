import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { TodoPage } from '../pages/todo/todo';
import { CloudModule, CloudSettings } from '@ionic/cloud-angular';
import { LoginPage } from '../pages/login/login';
import { FirebaseService } from '../pages/login/firebase.service';
import { CloudIonicService } from '../pages/login/cloud-ionic.service';
import { TaskFirebaseService } from '../pages/todo/task-firebase.service';
import { TaskPage } from '../pages/task/add-task';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'dea3ad8d'
  },
  'auth': {
    'facebook': {
      'scope': ['email', 'public_profile']
    }
  }
};

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    TodoPage,
    TaskPage,
    Page1,
    Page2
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    TodoPage,
    TaskPage,
    Page1,
    Page2
  ],
  providers: [TaskFirebaseService, CloudIonicService, FirebaseService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
