import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../shared/common.service';
import { LoyaltyService } from '../../loyalty.service';
import { Observable, of } from 'rxjs';
// import * as FusionCharts from 'fusioncharts';

@Component({
  selector: 'membership-growth',
  templateUrl: './membership-growth.component.html',
  styleUrls: ['./membership-growth.component.scss']
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
  // data: any = [];
  times: any = [];
  chartCategory: any = [];
  objMemberCount: any = [];
  objNewMembers: any = [];
  maxY1: number;
  maxY2: number;

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
      var convertedTotalMember: any;
      var convertedNewTotalMember: any;
      var convertedDelta: any;
      var convertedNewDelta: any;

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
      //Not required: check later
      // obj["Member Count (1,000)"] = [chartData[i].TotalMember, chartData[i].Delta, chartData[i].Status];
      // obj["New Members (1,000)"] = [chartData[i].newTotalMember, chartData[i].newDelta, chartData[i].Status];
      // this.data.push(obj);
      this.times.push(obj["Month"]);
      this.chartCategory.push({"label": obj["Month"]});
      
      convertedTotalMember = "\xa0\xa0" + this.abbreviateNumber(chartData[i].TotalMember);
      convertedNewTotalMember = "\xa0\xa0" + this.abbreviateNumber(chartData[i].newTotalMember);

      //dont show delta in tooltip for current period
      if (!!chartData[i].Status) {
        this.objMemberCount.push({"value": chartData[i].TotalMember, "color": "#74A0D7", "tooltext": convertedTotalMember+ ", Period: " + chartData[i].Status});
        this.objNewMembers.push({"value": chartData[i].newTotalMember, "color": "#8BD2C6","tooltext": convertedNewTotalMember + ", Period: " + chartData[i].Status});
      } else {
        convertedDelta = this.convertDelta(chartData[i].Delta);
        convertedNewDelta = this.convertDelta(chartData[i].newDelta);
        this.objMemberCount.push({"value": chartData[i].TotalMember, "color": "#74A0D7", "tooltext": convertedTotalMember + "," + convertedDelta});
        this.objNewMembers.push({"value": chartData[i].newTotalMember, "color": "#8BD2C6", "tooltext": convertedNewTotalMember + "," + convertedNewDelta});
      }
    }

    this.maxY1 = Math.max.apply(Math, this.objMemberCount.map(function(o: any) {
        return Number(o.value);
    }));
    this.maxY1 = Math.ceil(this.maxY1 * 1.5);
    console.log(this.maxY1);

    this.maxY2 = Math.max.apply(Math, this.objNewMembers.map(function(o: any) {
      return Number(o.value);
    }));
    this.maxY2 = Math.ceil(this.maxY2 * 1.5);
    console.log(this.maxY2);

    this.chartConfig = {
      width: '700',
      height: '220',
      type: 'mscombidy2d',
      dataFormat: 'json',
    };

    this.dataSource = {
        "chart": {
          // "xAxisname": obj["Month"],
          "yAxisName": "Member Count (1,000)",
          "syAxisName": "New Members (1,000)",
          "yAxisNameFontColor": "#74A0D7",
          "syAxisNameFontColor": "#8BD2C6",
          "baseFontSize": "10",
          // "numberPrefix": "$",
          "pyNumDivLines": "5",
          "syNumDivLines": "4",
          // "pYAxisMaxValue": this.maxY1,
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
          // "plottooltext": "New Tooltip text: $tooltext"
        },
        "categories": [{
          "category": this.chartCategory
        }],
        "dataset": [{
          "seriesName": "Member Count",
          "renderAs": "line",
          "maxvalue": this.maxY1,
          "color": "#74A0D7",
          // "showvalues": "0",
          "data": this.objMemberCount
        },
        {
            "seriesName": "New Members",
            "parentyaxis": "S",
            "renderAs": "bar",
            "maxvalue": this.maxY2,
            "color": "#8BD2C6",
            "data": this.objNewMembers
        }]
        // "styles": {
        //   "definition": [
        //     {
        //       "name": "leftYAxisFont",
        //       "type": "font",
        //       "color": "#74A0D7"
        //     },
        //     {
        //       "name": "rightYAxisFont",
        //       "type": "font",
        //       "color": "#8BD2C6"
        //     }],
        //   "application": [
        //     {
        //       "toObject": "DataLabels",
        //       "styles": "leftYAxisFont"
        //     }
        //   ]
        // }
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

convertDelta(deltaValue: any) {
  var modifiedDeltaValue: any;
  if (deltaValue === 0 || deltaValue === 0.0) {
    modifiedDeltaValue = "\xa0\xa0"+0+ "%" + '\u0394';
   }
  if (deltaValue <= 100 && !(deltaValue === 0 || deltaValue === 0.0)) {
      modifiedDeltaValue = "\xa0\xa0" + deltaValue.toFixed(1).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + "%" + '\u0394';
  }
  if (deltaValue > 100) {
    modifiedDeltaValue = "\xa0\xa0" + '100+' + "%" + '\u0394';
  }
  return modifiedDeltaValue;
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
