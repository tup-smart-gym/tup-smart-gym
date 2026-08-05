import { Injectable } from '@angular/core';

type AnalyticsEventParams = Record<string, string | number | boolean>;

declare let gtag: (...args: unknown[]) => void;

@Injectable({
  providedIn: 'root',
})
export class Analytics {
  
  private sendEvent(eventName: string, params: AnalyticsEventParams = {}): void {
    if(typeof gtag === 'function'){
      gtag('event',eventName,params);
    } else{
      console.warn('gtag no disponible, evento no enviado: ',eventName);
    }
  }
  
  trackLogin(email: string ,method: string = 'Google'): void {
    this.sendEvent('login',{method,user_email: email});
  }

  trackSectionView(sectionName: string): void{
    this.sendEvent('view_section',{section_name: sectionName});
  }

  trackFeatureAction(actionName: string, details: AnalyticsEventParams = {}): void {
    this.sendEvent(actionName,details);
  }
}
