import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
// import {}

@Injectable({
  providedIn: 'root'
})
export class FakeBackendService {

  constructor(private http: HttpClient) { }

  importJSON() {
    return this.http.get(environment.baseURL + 'assets/model.json');
  }
}
