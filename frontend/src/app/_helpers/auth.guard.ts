import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private token: TokenStorageService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.token.getUser();
        console.log(currentUser);

        if (currentUser) {
            // check if route is restricted by role
            console.log(route.data.roles)
            if (route.data.roles) {
                for(let availableRole of currentUser.roles) {
                    if(route.data.roles.indexOf(availableRole) !== -1) {
                        return true;
                    }
                }
                // role not authorised so redirect to home page
                this.router.navigate(['/home'], { state: { data: { 'message': 'You don\'t have access to that page' } } });
                return false;
            }

            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}