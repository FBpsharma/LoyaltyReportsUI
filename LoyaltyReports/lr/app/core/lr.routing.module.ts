
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoyaltyCockpitReportsComponent } from './loyalty-cockpit-reports/loyalty-cockpit-reports.component';
import { LrComponent } from 'lr/app/core/lr.component';

const lrRoutes: Routes = [
  {
    path: '', component: LrComponent, children: [
      { path: 'loyalty/cockpit', component: LoyaltyCockpitReportsComponent }
    ]
  },
];
@NgModule({
  imports: [
    RouterModule.forChild(lrRoutes)
  ],
  exports: [RouterModule]
})
export class LrRoutingModule { }