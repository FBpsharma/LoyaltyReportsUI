import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../shared/common.service';
import { LoyaltyService } from '../../loyalty.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'sales-transaction-summary',
  templateUrl: './sales-transaction-summary.component.html',
  styleUrls: ['./sales-transaction-summary.component.scss']
})
export class SalesTransactionSummaryComponent implements OnInit {
    salesSummaryData: Array<any>;
    dataStatusInfo: string;
    keyData: Array<any> = [];
    progressList: Array<any> = [];
    years: any;
    currentTimeRangeSelected: string = "Year";

    constructor(private commonService: CommonService, private loyaltyService: LoyaltyService) { }

    ngOnInit() {
      var newDt = new Date().setMonth(new Date().getMonth() - 3);
      var requestObject: any = {};
      requestObject.isSameStore = false;
      requestObject.tileId = "loyalty_sales_transaction_summary";
      //remove later
      this.getRefreshedData(requestObject);
    }
  
    getRefreshedData(reqObj: any) {
      this.salesSummaryData = [];
      this.dataStatusInfo = "Loading data...";
      var obj = this.commonService.getLoyaltyCockpitTileRequest(reqObj, reqObj.tileId, "level1");
      this.loyaltyService.getLoyaltyCockpitTileData(obj).subscribe((response) => {
        if (response && response.successFlag) {
            // hideLoader();
            this.salesSummaryData = [];
            if (response.result && response.result.length > 0) {	            		
                this.salesSummaryData = response.result.concat();
                this.keyData = this.salesSummaryData;
                this.headerFunc(this.keyData);
            } else {
                this.salesSummaryData = [];
                this.dataStatusInfo = "No data available";	                
            }            	
        } else {
          // hideLoader();
          this.salesSummaryData = [];
          this.dataStatusInfo = "No data available";  
        }
      }, (error) => {
          // hideLoader();
          this.salesSummaryData = [];
          this.dataStatusInfo = "No data available";       
    });
  }

  headerFunc(keyData: Array<any>){
    var titles = [];
    var bodyData = [];
    this.progressList = [];
     for( var i=0; i< keyData.length; i++){
         var subObject = keyData[i];
         var keys = Object.keys(subObject);
         for(var j=0; j<keys.length; j++){
             if(keys[j] != "title" && keys[j] != "YOY"){
                 var matchText = keys[j];
                 if(!(this.progressList.includes(matchText))){
                   this.progressList.push(matchText);
                 }
                 if(keys[j] != "YOY"){
                   var year = subObject[keys[j]].year.slice(-2);
                   var matchText = matchText+","+" '"+year;
                 }
                 if(!(titles.includes(matchText))){
                     titles.push(matchText)
                 }
             }
         } 
     }
     this.years = titles;
   }

}
