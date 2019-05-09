import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable()
export class LoyaltyService {
  loyaltyCockpitEndpoint: string = '/LYLReports/loyalty/analytic';

  constructor(private httpClient: HttpClient) {
  }

  getLoyaltyCockpitTileData(obj: object): Observable<any> {
    return this.httpClient.post(this.loyaltyCockpitEndpoint, obj, {observe: 'body', responseType: 'json'});
  }

  getLoyaltyCockpitDateRange(): Observable<any> {
    return this.httpClient.get('/LYLReports/prefetch/analytic/getAvailableDateRangeForLoyaltyCockpit', {observe: 'body', responseType: 'json'});
  }
}
