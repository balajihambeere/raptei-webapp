import {
  BrowserModule,
  BrowserTransferStateModule
} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

// @angular/fire/ Modules
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireFunctionsModule } from '@angular/fire/functions';

// raptei App Modules
import { HomeModule } from './visitor';
import { AdminDashboardModule } from './admin';

// IMPORTANT
// Add your own project credentials to environments/*.ts

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'raptei-webapp' }),
    BrowserTransferStateModule,
    RouterModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase, 'rapteiapp'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireFunctionsModule,
    // ServiceWorkerModule.register('/ngsw-worker.js', {
    //   enabled: environment.production
    // }),
    AppRoutingModule,
    HomeModule,
    AdminDashboardModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
