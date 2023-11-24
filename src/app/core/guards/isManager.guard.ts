// import { Injectable, OnInit } from '@angular/core';
// import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// // Auth Services
// import { SessionService } from '../services/session/session.service';
// import { CompanyService } from '../services/company/company.service';

// @Injectable({ providedIn: 'root' })
// export class IsManagerGuard implements CanActivate {
//     isManagerStr: any;
//     isTrialStr: boolean;
//     isPaidStr: boolean;
//     isFreeStr: boolean;

//     constructor(
//         private router: Router,
//         private sessionService: SessionService,
//         private companyService: CompanyService

//     ) {
//         this.companyService.getCompanyLicenceDays().subscribe(
//             (response) => {
//                 this.isTrialStr = response.data.isTrial;
//                 this.isPaidStr = response.data.isPaid;
//                 this.isFreeStr = response.data.isFree;
//             },
//             (error) => {
//             }
//         );
//     }



//     canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//         const isManager = this.sessionService.getCurrentIsManager();

//         if (isManager == "True") {
//             let status = route.data['releaseStatus'];
//             if (status != undefined) {
//                 if (status == "full") {
//                     return true
//                 } else if (status == "payer" && this.isPaidStr == true && this.isFreeStr == false) {
//                     return true
//                 } else if (status == "demo" && this.isPaidStr == false && this.isFreeStr == true) {
//                     return true
//                 }else{
//                     return false
//                 }
//             }
//             return true
//         }
//         else {
//             return false
//         }
//     }

// }
