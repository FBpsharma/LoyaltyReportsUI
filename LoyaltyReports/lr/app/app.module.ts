import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GridsterModule } from 'angular-gridster2';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoyaltyCockpitWidgetComponent } from './core/loyalty-cockpit-widget/loyalty-cockpit-widget.component';
import { MembershipGrowthComponent } from './core/widgets/membership-growth/membership-growth.component';
import { SalesTransactionSummaryComponent } from './core/widgets/sales-transaction-summary/sales-transaction-summary.component';
import { PointActivitySummaryComponent } from './core/widgets/point-activity-summary/point-activity-summary.component'
import { LoyaltyService } from './core/loyalty.service';
import { DataStorageService } from './shared/data-storage.service';
import { CookieService } from 'ngx-cookie-service';
import { LrHeaderComponent } from './core/lr-header/lr-header.component';
import { LrModule } from './core/lr.module';
import { LrAnalyticService } from 'lr/app/core/lr-analytic.service';
import { FusionChartsModule } from 'angular-fusioncharts';
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

FusionChartsModule.fcRoot(FusionCharts, Charts, FusionTheme);

@NgModule({
  declarations: [
    AppComponent,
    LoyaltyCockpitWidgetComponent,
    MembershipGrowthComponent,
    SalesTransactionSummaryComponent,
    PointActivitySummaryComponent,
    LrHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GridsterModule,
    HttpClientModule,
    FormsModule,
    LrModule,
    FusionChartsModule
  ],
  providers: [ 
    LoyaltyService,
    DataStorageService,
    CookieService,
    LrAnalyticService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
