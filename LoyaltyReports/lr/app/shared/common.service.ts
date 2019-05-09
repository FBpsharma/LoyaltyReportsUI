import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  getLoyaltyCockpitTileRequest (reqObj: any, tileId: string, category: string, grpCondArr?: any, measures?: any, pageNo?: any, optionalMeasures?: any){
    var paramsArray = [];
    var startDate = reqObj.startDate;
    var endDate = reqObj.endDate;

    if (reqObj.storeIds && reqObj.storeIds.length > 0) {
          paramsArray.push({
            "name": "store",
            "value": reqObj.storeIds
          });
    }

    if (reqObj.brandIds && reqObj.brandIds.length > 0) {
          paramsArray.push({
            "name": "brand",
            "value": reqObj.brandIds
          });
    }
    
    if (!reqObj.timeRange) {
          reqObj.timeRange = 'year';
    }

    if (reqObj.timeRange == "Period" || reqObj.timeRange == "period") {
          reqObj.timeRange = "month";
    }

    if (undefined != reqObj.startDate) {
          paramsArray.push({
            "name": "startDate",
            "value": startDate
          });
    }

    if (undefined != reqObj.endDate) {
          paramsArray.push({
            "name": "endDate",
            "value": endDate
          });
    }

    if (category === 'level1') {
      if (reqObj.hasOwnProperty('fromTile') && reqObj.fromTile) {

      } else {
          paramsArray.push({
            "name": "timeframe",
            "value": reqObj.timeRange.toLowerCase()
          });
      }
      paramsArray.push({
        "name": "samestore",
        "value": (reqObj.isSameStore == true)?"1":"0"
      });    
    } else if (category === 'level3') {
      var startDate = reqObj.startDate;
      var endDate = reqObj.endDate;
      var timeGroupConds = reqObj.timeGroupConds;
      var limit_condition: string;

      if (reqObj.pageLimit) {
            limit_condition = "limit "+reqObj.pageLimit.toString();
      }
      
      paramsArray.push({
        "name": "timeframe",
        "value": reqObj.timeRange.toLowerCase()
      });


      paramsArray.push({
        "name": "samestore",
        "value": (reqObj.isSameStore == true)?"1":"0"
      });

      paramsArray.push({
        "name": "group_condition",
        "value": grpCondArr.toString()
      });

      paramsArray.push({
        "name": "select_condition",
        "value": measures.toString()
      });

      paramsArray.push({
        "name": "select_label",
        "value": optionalMeasures?optionalMeasures.toString():[]
      });

      paramsArray.push({
        "name": "sort_condition",
        "value": ""
      });

      paramsArray.push({
        "name": "limit_condition",
        "value": limit_condition
      });

      var customer_mix: any;
      if (reqObj.customer_mix && reqObj.customer_mix.length > 0) {
          customer_mix = reqObj.customer_mix;
          paramsArray.push({
            "name": "customer_mix",
            "value": customer_mix
          });
      }

      var frequency_mix: any;
      if (reqObj.frequency_mix && reqObj.frequency_mix.length > 0) {
          frequency_mix = reqObj.frequency_mix;
          paramsArray.push({
            "name": "frequency_mix",
            "value": frequency_mix
          });
      }

      var net_sales_decile: any;
      if (reqObj.net_sales_decile && reqObj.net_sales_decile.length > 0) {
          net_sales_decile = reqObj.net_sales_decile;
          paramsArray.push({
            "name": "net_sales_decile",
            "value": net_sales_decile
          });
      }

      var mailable_list: any;
      if (reqObj.mailable_list && reqObj.mailable_list.length > 0) {
          mailable_list = reqObj.mailable_list;
          paramsArray.push({
            "name": "mailable_list",
            "value": mailable_list
          });
      }

      var tenure_list: any;
      if (reqObj.tenure_list && reqObj.tenure_list.length > 0) {
          tenure_list = reqObj.tenure_list;
          paramsArray.push({
            "name": "tenure_list",
            "value": tenure_list
          });
      }

      var programname_list: any;
      if (reqObj.programname_list && reqObj.programname_list.length > 0) {
          programname_list = reqObj.programname_list;
          paramsArray.push({
            "name": "programname_list",
            "value": programname_list
          });
      }

      var programtier_list: any;
      if (reqObj.programtier_list && reqObj.programtier_list.length > 0) {
          programtier_list = reqObj.programtier_list;
          paramsArray.push({
            "name": "programtier_list",
            "value": programtier_list
          });
      }

      var region: any;
      if (reqObj.region && reqObj.region.length > 0) {
          region = reqObj.region;
          paramsArray.push({
            "name": "region",
            "value": region
          });
      }

      var DMA: any;
      if (reqObj.DMA && reqObj.DMA.length > 0) {
          DMA = reqObj.DMA;
          paramsArray.push({
            "name": "DMA",
            "value": DMA
          });
      }

      var business_date_dow: any;
      if (reqObj.business_date_dow && reqObj.business_date_dow.length > 0) {
          business_date_dow = reqObj.business_date_dow;
          paramsArray.push({
            "name": "business_date_dow_abr_str",
            "value": business_date_dow
          });
      }

      var day_part_group: any;
      if (reqObj.day_part_group && reqObj.day_part_group.length > 0) {
          day_part_group = reqObj.day_part_group;
          paramsArray.push({
            "name": "day_part_group",
            "value": day_part_group
          });
      }

      var area_of_restaurant: any;
      if (reqObj.area_of_restaurant && reqObj.area_of_restaurant.length > 0) {
          area_of_restaurant = reqObj.area_of_restaurant;
          paramsArray.push({
            "name": "area_of_restaurant",
            "value": area_of_restaurant
          });
      }

      var order_mode: any;
      if (reqObj.order_mode && reqObj.order_mode.length > 0) {
          order_mode = reqObj.order_mode;
          paramsArray.push({
            "name": "order_mode",
            "value": order_mode
          });
      }

      var storegroup_list: any;
      if (reqObj.storegroup_list && reqObj.storegroup_list.length > 0) {
          storegroup_list = reqObj.storegroup_list;
          paramsArray.push({
            "name": "store_group",
            "value": storegroup_list
          });
      }

      var maj_grp: any;
      if (reqObj.maj_grp && reqObj.maj_grp.length > 0) {
          maj_grp = reqObj.maj_grp;
          paramsArray.push({
            "name": "item_major",
            "value": maj_grp
          });
      }

      var min_grp: any;
      if (reqObj.min_grp && reqObj.min_grp.length > 0) {
          min_grp = reqObj.min_grp;
          paramsArray.push({
            "name": "item_minor",
            "value": min_grp
          });
      }

      var offer_name: any;
      if (reqObj.offer_name && reqObj.offer_name.length > 0) {
          offer_name = reqObj.offer_name;
          paramsArray.push({
            "name": "pro_offer_name",
            "value": offer_name
          });
      }

      var offer_type: any;
      if (reqObj.offer_type && reqObj.offer_type.length > 0) {
          offer_type = reqObj.offer_type;
          paramsArray.push({
            "name": "pro_offer_type",
            "value": offer_type
          });
      }

      var inputsource_list: any;
      if (reqObj.inputsource_list && reqObj.inputsource_list.length > 0) {
          inputsource_list = reqObj.inputsource_list;
          paramsArray.push({
            "name": "cus_member_inputsource",
            "value": inputsource_list
          });
      }

      var campaign_list: any;
      if (reqObj.campaign_list && reqObj.campaign_list.length > 0) {
          campaign_list = reqObj.campaign_list;
          paramsArray.push({
            "name": "pro_campaign_name",
            "value": campaign_list
          });
      }

      var channel_list: any;
      if (reqObj.channel_list && reqObj.channel_list.length > 0) {
          channel_list = reqObj.channel_list;
          paramsArray.push({
            "name": "channel",
            "value": channel_list
          });
      }

      var triggered_list: any;
      if (reqObj.triggered_list && reqObj.triggered_list.length > 0) {
          triggered_list = reqObj.triggered_list;
          paramsArray.push({
            "name": "pro_campaign_trigger",
            "value": triggered_list
          });
      }

      var frequency_list: any;
      if (reqObj.frequency_list && reqObj.frequency_list.length > 0) {
          frequency_list = reqObj.frequency_list;
          paramsArray.push({
            "name": "purchaseFrequency",
            "value": frequency_list
          });
      }

      var recency_list: any;
      if (reqObj.recency_list && reqObj.recency_list.length > 0) {
          recency_list = reqObj.recency_list;
          paramsArray.push({
            "name": "purchaseRecency",
            "value": recency_list
          });
      }

      var spend_list: any;
      if (reqObj.spend_list && reqObj.spend_list.length > 0) {
          spend_list = reqObj.spend_list;
          paramsArray.push({
            "name": "purchaseSpend",
            "value": spend_list
          });
      }

      if (pageNo && pageNo > 0) {
          paramsArray.push({
            "name": "pageNumber",
            "value": pageNo
          });
      } else if (undefined == pageNo) {
          paramsArray.push({
            "name": "pageNumber",
            "value": 1
          });
      }
    }

    if (reqObj.period) {
      var obj: any;
      obj = {
              "queries": [{
                "tileid": tileId,
                "category": category,
                "parameters": paramsArray,
                "period":reqObj.period
              }]
      }
      return obj;
    } else {
      obj = {
              "queries": [{
                "tileid": tileId,
                "category": category,
                "parameters": paramsArray
              }]
      }	
      return obj;
    }
    
  };

  getFormattedDate(date: any) {
		if(date && date != null){
		 if(!(date instanceof Date)){
			date = new Date(date);
		 }
		  var year = date.getFullYear();
		  var month = (1 + date.getMonth()).toString();
		  month = month.length > 1 ? month : '0' + month;
		  var day = date.getDate().toString();
		  day = day.length > 1 ? day : '0' + day;

		  var df = localStorage.getItem('dateFormat')
		  var dateStr = month + '/' + day + '/' + year;
		  if(df =="dd-MM-yyyy"){
			  dateStr = day + '/' + month + '/' + year;
		  }
		  return dateStr;
		}else{
			return "";
		}
	}
}
