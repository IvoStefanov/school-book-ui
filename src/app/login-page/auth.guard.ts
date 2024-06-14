import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { LoginService } from "./login-page.service";
import { map, Observable, take, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private loginService: LoginService, private router: Router) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
        return this.loginService.user.pipe(
            take(1),
            map(user => {
                return !!user;
            }),
            tap(isAuth => {
                if(!isAuth) {
                    this.router.navigate(['']);
                }
            })
        )
    }
}