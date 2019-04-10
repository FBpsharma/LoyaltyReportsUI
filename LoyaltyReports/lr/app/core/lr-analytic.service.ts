import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router, NavigationEnd } from '@angular/router';

declare let ga: Function;
@Injectable()
export class LrAnalyticService {
  private subscription: Subscription;
  constructor(private router: Router) {
  }

  public trackEvent(category: string, label: string, action: string = null, value: number = null) {
    try {
      ga('send', 'event', {
        eventCategory: category, eventLabel: label,
        eventAction: action, eventValue: value
      });
    } catch (error) {
      console.log(`error: ${error}`);
    }

    console.log(category, label, action, value);
  }

  public subscribe() {
    if (!this.subscription) {
      this.subscription = this.router.events.subscribe(e => {
        if (e instanceof NavigationEnd) {
          try {
            ga('set', 'page', e.urlAfterRedirects);
            ga('send', 'pageview');
            console.log(`logged url: ${e.urlAfterRedirects}`);
          } catch {
          }
        }
      });
    }
  }

  public unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
