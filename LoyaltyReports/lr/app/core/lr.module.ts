import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthInterceptor } from '../shared/interceptors/auth.interceptor';
import { LoggingInterceptor } from '../shared/interceptors/logging.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LrRoutingModule } from 'lr/app/core/lr.routing.module';
import { LrComponent } from 'lr/app/core/lr.component';

@NgModule({
  declarations: [
    LrComponent
  ],
  imports: [
    CommonModule,
    LrRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true }
  ]
})
export class LrModule { }
