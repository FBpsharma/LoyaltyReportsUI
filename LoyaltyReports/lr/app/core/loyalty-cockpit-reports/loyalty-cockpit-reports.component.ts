import { Component, Input } from '@angular/core';
import {CompactType, DisplayGrid, GridsterConfig, GridsterItem, GridType} from 'angular-gridster2';
import { DataStorageService } from 'lr/app/shared/data-storage.service';
import { LrAnalyticService } from 'lr/app/core/lr-analytic.service';
import { GridsterCompact } from 'angular-gridster2/lib/gridsterCompact.service';
import { LoyaltyService } from '../loyalty.service';
import { CommonService } from '../../shared/common.service';

@Component({
  selector: 'loyalty-cockpit-reports',
  templateUrl: './loyalty-cockpit-reports.component.html',
  styleUrls: ['./loyalty-cockpit-reports.component.scss']
})

export class LoyaltyCockpitReportsComponent {
  title = 'Loyalty Reports';
  options: GridsterConfig;
  dashboards: Array<GridsterItem>;
  isFiltersChanged: boolean;
  dformat: string;
  minStartDate: any;
  maxEndDate: any;
  startDateField: any;
  endDateField: any;
  L1StartDate: any;
  L1EndDate: any;
  drillLevel: string = "level1";
  selectedFiltersString = "<label>Brands: <span> All Brands</span></label><label>Stores: <span> All Stores</span></label>";
  showL3Drill: boolean = false;

  constructor(private dataStorageService: DataStorageService, private  lrAnalyticService: LrAnalyticService, private loyaltyService: LoyaltyService, private commonService: CommonService) {
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

    this.isFiltersChanged = false;

    var df = localStorage.getItem('dateFormat')
    if (df == "dd-MM-yyyy") {
      this.dformat = 'dd/mm/yyyy';
    } else {
      this.dformat = 'mm/dd/yyyy';
    }

    this.loyaltyService.getLoyaltyCockpitDateRange().subscribe((response) => {
      if (response) {
          var maxDate = response.dateRangeMap.maxDate
          var minDate = response.dateRangeMap.minDate
          this.maxEndDate = new Date(maxDate);
          this.minStartDate = new Date(minDate);

          var maxEndDateYear = this.commonService.getFormattedDate(new Date(response.timeFrameStartEndDateMap.yearDate.endDate));
          var minStartDateYear = this.commonService.getFormattedDate(new Date(response.timeFrameStartEndDateMap.yearDate.startDate));

          this.L1StartDate = minStartDateYear;
          this.L1EndDate = maxEndDateYear;

          // setting fiscal date	            	
          var dateStringArr = maxDate.split("-");
          var retrievedStartDate = new Date();
          retrievedStartDate.setMonth(parseInt(dateStringArr[1]) - parseInt(dateStringArr[1]));
          retrievedStartDate.setDate(1);
          retrievedStartDate.setFullYear(parseInt(dateStringArr[0]));

          var retrievedEndDate = new Date();
          retrievedEndDate.setMonth(parseInt(dateStringArr[1]) - 1);
          retrievedEndDate.setDate(parseInt(dateStringArr[2]));
          retrievedEndDate.setFullYear(parseInt(dateStringArr[0]));

          this.startDateField = this.commonService.getFormattedDate(retrievedStartDate);
          this.endDateField = this.commonService.getFormattedDate(retrievedEndDate);
          if (this.drillLevel === "level3") {
            this.selectedFiltersString = "<label>Start Date: <span>" + this.startDateField + "</span></label>" + "<label>End Date: <span>" + this.endDateField + "</span></label> ";
          }

          // init dashboard 
          // if ($scope.routeURL == "/loyalty/cockpit") {
          //     $scope.selectedDashboardId = 'DEFAULT';
          // } else if ($scope.routeURL == "/loyalty/details") {
          //     switchToLevel3View("loyalty", "By Over Time");
          // }
      } else {
        // showUserErrorMessage(results);
      }
      }, (error) => {
        // showErrorMessage(error);
      });
  }

  changedOptions() {
    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged();
    }
  }

  removeItem(widget: any) {
    this.dashboards.splice(this.dashboards.indexOf(widget), 1);
  }

  addItem() {
    this.dashboards.push({x: 0, y: 0, cols: 1, rows: 1});
  }

  ngOnDestroy() {
    this.lrAnalyticService.unsubscribe();
  }
}
