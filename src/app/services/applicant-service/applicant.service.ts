import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ApplicantService {

  //------------ FOR DEVELOPMENT (UNCOMMENT) --------------------
  // BASE_URL = "http://localhost:3000";
  BASE_URL = "";


  constructor(private myHttp: Http) { }

  sendApplication(applicationInfo){
    const headers = new Headers({'Content-Type': "application/json"});
    const options = { headers: headers};
    return this.myHttp.post(`${this.BASE_URL}/api/apply`, applicationInfo, options)
    .toPromise()
    .then(myApiString => myApiString.json());
  }
}
