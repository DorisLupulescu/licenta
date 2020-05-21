import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  getApiData(latitude: any, longitude: any): Observable<any> {
    return this.httpClient.get<any>(
      `https://parking-v2.cit.cc.api.here.com/parking/facilities.json?app_id=DemoCredForAutomotiveAPI&app_code=JZlojTwKtPLbrQ9fEGznlA&prox=${latitude},${longitude},1000`
    );
  }
}
