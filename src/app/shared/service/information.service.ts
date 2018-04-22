import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Information } from '../model/Information';
import { ApiService, LajiApi } from '../api/api.service';
import 'rxjs/add/operator/do';


@Injectable()
export class InformationService {

  private informationCache: { [id: string]: any } = {};

  constructor(private apiService: ApiService) { }

  // Get static page information
  getInformation(id: string): Observable<Information> {
    if (this.informationCache[id]) {
      return Observable.of(this.informationCache[id]);
    }
    return this.apiService.informationFindById(LajiApi.Endpoints.information, id)
      .do(result => this.informationCache[id] = result);
  }
}