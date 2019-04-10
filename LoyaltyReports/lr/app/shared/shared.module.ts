import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service'

@NgModule({
  declarations: [ ],
  exports: [
    CommonModule,
  ],
  providers: [ CookieService],
})
export class SharedModule {}