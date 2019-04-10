import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../shared/common.service';
import { LoyaltyService } from '../../loyalty.service';
import { Observable, of } from 'rxjs';
// import * as FusionCharts from 'fusioncharts';

@Component({
  selector: 'membership-growth',
  templateUrl: './membership-growth.component.html',
  styleUrls: ['./membership-growth.component.css']
})
export class MembershipGrowthComponent implements OnInit {
  dataStatusInfo: string = 'Loading data...';
  currentTimeRangeSelected: string = "Year";
  prefixesArray: Array<any> = ["", "K", "M", "B", "T"];
  membershipGrowthData: Array<any>;
  chart: any;
  x: any;
  y: any;
  line: any;
  svg: any;
  bars: any;
  dataSource: Object;
  chartConfig: Object;
  data: any = [];
  times: any = [];
  chartCategory: any = [];
  objMemberCount: any = [];
  objNewMembers: any = [];
  maxY: number;

  monthAliasMapping: any = {
      "Jan": "1",
      "Feb": "2",
      "Mar": "3",
      "Apr": "4",
      "May": "5",
      "Jun": "6",
      "Jul": "7",
      "Aug": "8",
      "Sep": "9",
      "Oct": "10",
      "Nov": "11",
      "Dec": "12"
  }

  constructor(private commonService: CommonService, private loyaltyService: LoyaltyService) {
  }

  ngOnInit() {
    var newDt = new Date().setMonth(new Date().getMonth() - 3);
    var requestObject: any = {};
    requestObject.isSameStore = false;
    requestObject.tileId = "loyalty_membership";
    //remove later
    this.getRefreshedData(requestObject);
  }

  // $scope.$on("selectedTimeSpanEvent", function(event, message) {
  //     this.currentTimeRangeSelected = message;
  // });

  drawLineChart(chartData: any) {
    for (var i = 0; i < chartData.length; i++) {
      var obj = {};
      if (chartData[i].hasOwnProperty("Month")) {
        var notMonth = this.monthAliasMapping[chartData[i].Month];
        if ("undefined" != notMonth) {
          obj["Month"] = chartData[i].Month +" "+ "'" + (chartData[i].Year).slice(-2);
        } else {
          obj["Month"] = this.monthAliasMapping[chartData[i].Month] +" "+ "'" + (chartData[i].Year).slice(-2);
        }
      } else if (chartData[i].hasOwnProperty("Quarter")) {
          obj["Month"] = chartData[i].Quarter +" "+ "'" + (chartData[i].Year).slice(-2);
      } else {
          obj["Month"] = chartData[i].Year;
      }
      obj["Member Count (1,000)"] = [chartData[i].TotalMember, chartData[i].Delta, chartData[i].Status];
      obj["New Members (1,000)"] = [chartData[i].newTotalMember, chartData[i].newDelta, chartData[i].Status];
      this.data.push(obj);
      this.times.push(obj["Month"]);
      this.chartCategory.push({"label": obj["Month"]});
      this.objMemberCount.push({"value": chartData[i].TotalMember});
      this.objNewMembers.push({"value": chartData[i].newTotalMember});
    }

    this.maxY = Math.max.apply(Math, this.objMemberCount.map(function(o) {
        return Number(o.value);
    }));
    this.maxY = this.maxY * 1.5;
    console.log(this.maxY);

    this.chartConfig = {
      width: '700',
      height: '200',
      type: 'mscombidy2d',
      dataFormat: 'json',
    };

    this.dataSource = {
        "chart": {
          // "xAxisname": obj["Month"],
          "pYAxisName": "Member Count (1,000)",
          "sYAxisName": "New Members (1,000)",
          // "numberPrefix": "$",
          "pYNumDivLines": "5",
          "sYNumDivLines": "4",
          "pYAxisMaxValue": this.maxY,
          // "divlineColor": "#999999",
          // "divLineIsDashed": "1",
          // "divLineDashLen": "1",
          // "divLineGapLen": "1",
          // "toolTipColor": "#ffffff",
          // "toolTipBorderThickness": "0",
          // "toolTipBgColor": "#000000",
          // "toolTipBgAlpha": "80",
          // "toolTipBorderRadius": "2",
          // "toolTipPadding": "5",
          "theme": "fusion"
        },
        "categories": [{
          "category": this.chartCategory
        }],
        "dataset": [{
          "seriesName": "Member Count",
          "renderAs": "line",
          "color": "#74A0D7",
          "data": this.objMemberCount
        },
        {
            "seriesName": "New Members",
            // "showValues": "1",
            "color": "#8BD2C6",
            "data": this.objNewMembers
          }
        ]
    };
  }

abbreviateNumber(number: any){                	    
    var convertedNum = Math.log10(number);
    convertedNum = convertedNum / 3 | 0;
    var prefix = this.prefixesArray[convertedNum];
    var scale = Math.pow(10, convertedNum * 3);             	  
    var hello = number/scale;                	  
    var result = hello.toFixed(2) + prefix;
    return result;
}

  // $scope.$on("refreshLoyaltyTileData", function(event, message) {
  //     message.tileId = "loyalty_membership";
  //     message.timeRange = "period";
  //     message.fromTile = true;
  //     getRefreshedData(message);
  // });

  // $scope.$on("refreshTileData", function(event, message) {
  //     message.tileId = "loyalty_membership";
  //     getRefreshedData(message);
  // });

  // $scope.drillToGridScreen = function(name) {
  //     var obj = new Object();
  //     obj.name = name;
  //     $scope.$emit("DRILL_TO_LOYALTY_L3", obj);
  // }

  getRefreshedData(reqObj: any) {
    this.membershipGrowthData = [];
    this.dataStatusInfo = "Loading data...";
    var obj = this.commonService.getLoyaltyCockpitTileRequest(reqObj, reqObj.tileId, "level1");
    this.loyaltyService.getLoyaltyCockpitTileData(obj).subscribe((response) => {
      if (response && response.successFlag) {
          // hideLoader();
          this.membershipGrowthData = []; 
          if (response.result && response.result.length > 0) {
             this.membershipGrowthData = response.result.concat();
              // setTimeout(() => {
                this.drawLineChart(response.result);
              // }, 1000);
          } else {
              this.membershipGrowthData = [];
              this.dataStatusInfo = "No data available";
          }
      } else {
        // hideLoader();
        this.membershipGrowthData = [];
        this.dataStatusInfo = "No data available";
      }
      }, (error) => {
        // hideLoader();
        this.membershipGrowthData = [];
        this.dataStatusInfo = "No data available";
      });
  }
}
