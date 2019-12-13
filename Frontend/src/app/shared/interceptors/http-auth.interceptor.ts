import { Injectable, Injector } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private oidcSecurityService: OidcSecurityService;
    constructor(private injector: Injector, private router: Router) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        let requestToForward = req;

        if (this.oidcSecurityService === undefined) {
            this.oidcSecurityService = this.injector.get(OidcSecurityService);
        }
        if (this.oidcSecurityService !== undefined) {
            const token = this.oidcSecurityService.getToken();
            if (token !== '') {
                const tokenValue = 'Bearer ' + token;
                requestToForward = req.clone({
                    setHeaders: { Authorization: tokenValue }
                });
            }
        } else {
            console.log('OidcSecurityService undefined: NO auth header!');
        }

        return next.handle(requestToForward).pipe(
            retry(2),
            catchError((error: HttpErrorResponse) => {
                let errorMessage = '';
                if (error.error instanceof ErrorEvent) {
                    // client-side error
                    errorMessage = `Error: ${error.error.message}`;
                } else {
                    // server-side error
                    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
                    if (error.status === 0) {
                        // Server down
                        this.router.navigate(['/oops/server-down']);
                    }
                }
                return throwError(errorMessage);
            })
        );
    }
}
