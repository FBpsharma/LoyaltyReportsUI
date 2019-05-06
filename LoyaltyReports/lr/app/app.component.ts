import { Component } from '@angular/core';
import {CompactType, DisplayGrid, GridsterConfig, GridsterItem, GridType} from 'angular-gridster2';
import { DataStorageService } from 'lr/app/shared/data-storage.service';
import { LrAnalyticService } from 'lr/app/core/lr-analytic.service';
import { GridsterCompact } from 'angular-gridster2/lib/gridsterCompact.service';

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
      compactType: CompactType.None,
      margin: 10,
      outerMargin: true,
      outerMarginTop: null,
      outerMarginRight: null,
      outerMarginBottom: null,
      outerMarginLeft: null,
      useTransformPositioning: true,
      mobileBreakpoint: 640,
      minCols: 2,
      maxCols: 2,
      minRows: 3,
      maxRows: 6,
      maxItemCols: 1,
      minItemCols: 1,
      maxItemRows: 3,
      minItemRows: 1,
      defaultItemCols: 1,
      defaultItemRows: 3,
      keepFixedHeightInMobile: false,
      keepFixedWidthInMobile: false,
      scrollSensitivity: 10,
      scrollSpeed: 20,
      ignoreMarginInRow: false,
      draggable: {
        enabled: true,
      },
      resizable: {
        enabled: false,
      },
      swap: true,
      pushDirections: {north: true, east: true, south: true, west: true},
      pushResizeItems: false,
      displayGrid: DisplayGrid.Always,
      disableWindowResize: false,
      disableWarnings: false,
      scrollToNewItems: false
    };

    this.dashboards = [
      {cols: 1, rows: 3, y: 0, x: 0, label: 'Membership Growth'},
      {cols: 1, rows: 3, y: 0, x: 1, label: 'Sales Transaction Summary'},
      {cols: 1, rows: 3, y: 3, x: 0, label: 'Points Activity Summary'}
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
