import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LrComponent } from 'lr/app/core/lr.component';

const appRoutes: Routes = [
  { path: ' ', component: LrComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
