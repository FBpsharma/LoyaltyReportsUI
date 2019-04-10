import { Component } from '@angular/core';
import {CompactType, DisplayGrid, GridsterConfig, GridsterItem, GridType} from 'angular-gridster2';
import { DataStorageService } from 'lr/app/shared/data-storage.service';
import { LrAnalyticService } from 'lr/app/core/lr-analytic.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Loyalty Reports';
  options: GridsterConfig;
  dashboards: Array<GridsterItem>;
  
  constructor(private dataStorageService: DataStorageService, private  lrAnalyticService: LrAnalyticService) {
  }

  ngOnInit() {
    this.options = {
      gridType: GridType.Fit,
      margins: [10, 12],
      maxCols: 2,
      maxRows: 6,
      draggable: {
        enabled: true
      }
    };

    this.dashboards = [
      { x: 0, y: 0, cols: 1, rows: 3, label: 'Membership Growth'},
      { x: 1, y: 0, cols: 1, rows: 3, label: 'Sales Transaction Summary'},
      { x: 0, y: 3, cols: 1, rows: 3, label: 'Points Activity Summary'}
    ];

    this.lrAnalyticService.subscribe();
  }

  changedOptions() {
    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged();
    }
  }

  removeItem(widget: any) {
    // $event.preventDefault();
    // $event.stopPropagation();
    this.dashboards.splice(this.dashboards.indexOf(widget), 1);
  }

  addItem() {
    this.dashboards.push({x: 0, y: 0, cols: 1, rows: 1});
  }

  ngOnDestroy() {
    this.lrAnalyticService.unsubscribe();
  }
}
