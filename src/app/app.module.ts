import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { MainComponent } from './components/master/main/main.component';
import { DashboardComponent } from './components/master/dashboard/dashboard.component';
import { NavbartopComponent } from './components/master/navbartop/navbartop.component';
import { FooterComponent } from './components/master/footer/footer.component';
import { LeftsidbarComponent } from './components/master/leftsidbar/leftsidbar.component';
import { RightsidbarComponent } from './components/master/rightsidbar/rightsidbar.component';
import { MasterModule } from './components/master/master.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    DashboardComponent,
    NavbartopComponent,
    FooterComponent,
    LeftsidbarComponent,
    RightsidbarComponent
  ],
  imports: [
    BrowserModule,
    MasterModule,
    AppRoutingModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
