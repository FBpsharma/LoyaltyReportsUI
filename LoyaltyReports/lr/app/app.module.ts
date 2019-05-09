import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CookieService } from 'ngx-cookie-service';
import { LrHeaderComponent } from './core/lr-header/lr-header.component';
import { LrModule } from './core/lr.module';
import { LrAnalyticService } from 'lr/app/core/lr-analytic.service';

@NgModule({
  declarations: [
    AppComponent,
    LrHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    LrModule
  ],
  providers: [
    CookieService,
    LrAnalyticService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
