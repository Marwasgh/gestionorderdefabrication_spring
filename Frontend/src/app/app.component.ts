import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(
    private analytics: AnalyticsService,
    private seoService: SeoService,
    private router: Router  // inject router
  ) {}

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();

    const token = sessionStorage.getItem('auth_token');
    if (token) {
      // Si token existe, rediriger vers pages/dashboard (ou juste /pages)
      this.router.navigate(['/pages/dashboard']);
    } else {
      // Sinon rediriger vers login
      this.router.navigate(['/login']);
    }
  }

}
