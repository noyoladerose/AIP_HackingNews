import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthenticateService } from './services/authenticate.service';
import { NavbarComponent } from './navbar/navbar.component';
import { TokenInterceptorService } from './Auth/token-interceptor.service';
import { ListNewsComponent } from './list-news/list-news.component';
import { CreateNewsComponent } from './create-news/create-news.component';
import { NewsService } from './services/news.service';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    NavbarComponent,
    ListNewsComponent,
    CreateNewsComponent
      ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [NewsService, AuthenticateService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true

  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
