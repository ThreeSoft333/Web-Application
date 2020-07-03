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
import {NgxWebstorageModule} from 'ngx-webstorage';
import { RouterModule } from '@angular/router';
import {Approutes} from './app-routing.module';
import {HttpClient,HttpClientModule} from '@angular/common/http';
import { Globale } from 'src/assets/Global';
import { CategoryService } from './components/ecomm/services/category.service';
import { UiSwitchModule } from 'ngx-ui-switch';
import { SubcategoryService } from './components/ecomm/services/SubCategory.service';
import { OptionsModule } from './components/options/options.module';
import { ProductService } from './components/ecomm/services/Product.service';
import { ColorService } from './components/options/services/color.service';
import { SizeService } from './components/options/services/size.service';


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
    OptionsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    NgxWebstorageModule.forRoot(),
    HttpClientModule,
    RouterModule.forRoot(Approutes,{useHash:true}),
    UiSwitchModule
  ],
  providers: [AuthService,Globale,CategoryService,SubcategoryService,ProductService,ColorService,SizeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
