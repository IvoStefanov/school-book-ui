import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, Observable, take } from "rxjs";
import { LoginService } from "./login-page.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
    constructor(private loginService: LoginService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.loginService.user.pipe(
            take(1),
            exhaustMap(user => {
                const newReq = req.clone({
					params: new HttpParams().set('auth', user.token)
                });
				return next.handle(newReq);

            })
        )
    }

}