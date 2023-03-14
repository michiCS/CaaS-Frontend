import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { PrimeNGConfig } from 'primeng/api';
import { authConfig } from './auth.config';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {

    constructor(private primeNgConfig: PrimeNGConfig, private oAuthService: OAuthService) {
        primeNgConfig.ripple = true;
        this.configureWithNewConfigApi();
    }

    private configureWithNewConfigApi() {
        this.oAuthService.configure(authConfig);
        this.oAuthService.tokenValidationHandler = new JwksValidationHandler();
        this.oAuthService.loadDiscoveryDocumentAndTryLogin();
    }
}
