import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.local';
import { Taxonomy } from '../model/Taxonomy';
import { Observable } from 'rxjs/Observable';
import { PagedResult } from '../model/PagedResult';
import { Informal } from '../model/Informal';

@Injectable()
export class ApiService {

  constructor(private httpClient: HttpClient) { }


  informalTaxonGroups(endpoint: LajiApi.Endpoints.informalRoots, query: LajiApi.Query): Observable<PagedResult<Informal>>;
  informalTaxonGroups(endpoint: LajiApi.Endpoints, query: object = {}): Observable<any> {
    const url = `${environment.lajiApi.url}/${endpoint}`;
    return this.httpClient.get(
      url,
      { params: { ...query, 'access_token': environment.lajiApi.accessToken } }
    );
  }

  taxonomyFindById(endpoint: LajiApi.Endpoints.taxon, id: string): Observable<Taxonomy>;
  taxonomyFindById(endpoint: LajiApi.Endpoints.taxonSpecies, id: string, query: LajiApi.Query): Observable<PagedResult<Taxonomy>>;
  taxonomyFindById(endpoint: LajiApi.Endpoints, id: string, query: object = {}): Observable<any> {
    const url = `${environment.lajiApi.url}/${endpoint}`.replace('%id%', id);
    return this.httpClient.get(
      url,
      { params: { ...query, 'access_token': environment.lajiApi.accessToken } }
    );
  }
}

export namespace LajiApi {
  export enum Endpoints {
    informalRoots = 'informal-taxon-groups/roots',
    taxon = 'taxa/%id%',
    taxonSpecies = 'taxa/%id%/species',
    document = 'document'
  }

  export interface Query {
    lang?: string;
    informalGroupFilters?: string;
    invasiveSpeciesFilter?: boolean;
    pageSize?: number;
    onlyFinnish?: boolean;
  }
}
