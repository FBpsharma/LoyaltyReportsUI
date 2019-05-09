import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthInterceptor } from '../shared/interceptors/auth.interceptor';
import { LoggingInterceptor } from '../shared/interceptors/logging.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LrRoutingModule } from 'lr/app/core/lr.routing.module';
import { LrComponent } from 'lr/app/core/lr.component';
import { LoyaltyCockpitReportsComponent } from 'lr/app/core/loyalty-cockpit-reports/loyalty-cockpit-reports.component';
import { LoyaltyCockpitWidgetComponent } from 'lr/app/core/loyalty-cockpit-widget/loyalty-cockpit-widget.component';
import { MembershipGrowthComponent } from 'lr/app/core/widgets/membership-growth/membership-growth.component';
import { PointActivitySummaryComponent } from 'lr/app/core/widgets/point-activity-summary/point-activity-summary.component';
import { SalesTransactionSummaryComponent } from 'lr/app/core/widgets/sales-transaction-summary/sales-transaction-summary.component';
import { LoyaltyService } from './loyalty.service';
import { DataStorageService } from '../shared/data-storage.service';
import { GridsterModule } from 'angular-gridster2';
import { FusionChartsModule } from 'angular-fusioncharts';
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

FusionChartsModule.fcRoot(FusionCharts, Charts, FusionTheme);

@NgModule({
  declarations: [
    LrComponent,
    LoyaltyCockpitReportsComponent,
    LoyaltyCockpitWidgetComponent,
    MembershipGrowthComponent,
    PointActivitySummaryComponent,
    SalesTransactionSummaryComponent
  ],
  imports: [
    CommonModule,
    LrRoutingModule,
    GridsterModule,
    FusionChartsModule
  ],
  providers: [
    LoyaltyService,
    DataStorageService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true }
  ]
})
export class LrModule { }
