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
//import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './auth.service';
import { EcommModule } from './components/ecomm/ecomm.module';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgSelectModule } from '@ng-select/ng-select';
import {NgxWebstorageModule} from 'ngx-webstorage';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { RouterModule } from '@angular/router';
import {Approutes} from './app-routing.module';

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
    EcommModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    NgSelectModule,
    NgxWebstorageModule.forRoot(),
    NgxUiLoaderModule,
    RouterModule.forRoot(Approutes,{useHash:true})
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
