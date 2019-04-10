
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoyaltyCockpitWidgetComponent } from './loyalty-cockpit-widget/loyalty-cockpit-widget.component';
import { LrComponent } from 'lr/app/core/lr.component';

const lrRoutes: Routes = [
  {
    path: '', component: LrComponent, children: [
      { path: 'loyalty/cockpit', component: LoyaltyCockpitWidgetComponent }
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