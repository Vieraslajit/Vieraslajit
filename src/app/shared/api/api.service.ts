import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Taxonomy, TaxonomyDescription, TaxonomyImage } from '../model/Taxonomy';
import { Observable } from 'rxjs/Observable';
import { PagedResult } from '../model/PagedResult';
import { Informal } from '../model/Informal';
import { NewsElement } from '../model/NewsElement';
import { Autocomplete } from '../model/Autocomplete';
import { WarehouseQueryCount } from '../model/Warehouse';
import { WarehouseQueryList } from '../model/Warehouse';
import { Information } from '../model/Information';
import { userProperty, UserService } from '../service/user.service';
import { query } from '@angular/core/src/animation/dsl';
import { Document } from '../model/Document';

/**
 * Handles creation of API requests
 */

@Injectable()
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Returns person details from /person/ endpoint:
   * {
   *  "id": "string",
   *  "fullName": "string",
   *  "emailAddress",
   *  "defaultLanguage": "string",
   *  "role": ["string"]
   * }
   * 
   * @param personToken person-token received from laji-auth on login
   */
  personByToken(personToken: string) {
    return this.httpClient.get(
      `${environment.lajiApi.url}person/` + personToken,
      { params: { 'access_token': environment.lajiApi.accessToken } }
    );
  }

  /**
   * Returns login related information from /person-token/ endpoint
   * {
   *  "personId": "string",
   *  "target": "string",
   *  "next": "string"
   * }
   * 
   * next = path that is used for redirection after login is complete
   * 
   * @param token person-token received from laji-auth on login
   */
  personToken(token: string) {
    return this.httpClient.get(
      `${environment.lajiApi.url}person-token/` + token,
      { params: { 'access_token': environment.lajiApi.accessToken } }
    );
  }

  /**
   * Used for autocompletion of searchqueries
   * 
   * Returns:
   * [
   *   {
   *     "key": "string",
   *     "value": "string",
   *     "payload": {}
   *   }
   * ]
   * 
   * @param endpoint Target API endpoint
   * @param field Field type to be autocompleted: taxon, collection, friends, unit, person
   * @param query Query as defined by LajiApi.AutocompleteQuery
   */
  autocompleteFindByField(endpoint: LajiApi.Endpoints.autocomplete, field: string, query: LajiApi.AutocompleteQuery): Observable<Autocomplete>;
  autocompleteFindByField(endpoint: LajiApi.Endpoints.autocomplete, field: string, query: object = {}): Observable<any> {
    const url = `${environment.lajiApi.url}/${endpoint}`;
    return this.httpClient.get(
      url,
      { params: { ...query, 'access_token': environment.lajiApi.accessToken } }
    );
  }

  /**
   * 
   * 
   * @param endpoint Target API endpoint
   * @param count 
   * @param query Query as defined by LajiApi.warehousequeryCountQuery
   */
  warehouseQueryCountGet(endpoint: LajiApi.Endpoints.warehousequerycount, count: string, query: LajiApi.warehousequerycountQuery): Observable<WarehouseQueryCount>;
  warehouseQueryCountGet(endpoint: LajiApi.Endpoints.warehousequerycount, count: string, query: object = {}): Observable<any> {
    const url = `${environment.lajiApi.url}${endpoint}`;
    return this.httpClient.get(
      url,
      { params: { ...query, 'access_token': environment.lajiApi.accessToken } }
    );
  }

  /**
   * 
   * @param endpoint 
   * @param query 
   */
  warehouseQueryListById(endpoint: LajiApi.Endpoints.warehousequerylist, query: LajiApi.WarehouseQueryListQuery): Observable<PagedResult<WarehouseQueryList>>;
  warehouseQueryListById(endpoint: LajiApi.Endpoints.warehousequerylist, query: object = {}): Observable<any> {
    const url = `${environment.lajiApi.url}${endpoint}`;
    return this.httpClient.get(
      url,
      { params: { ...query, 'access_token': environment.lajiApi.accessToken } }
    );
  }

  /**
   * @param endpoint Target API endpoint
   * @param query
   * @param id Optional group id.
   */
  informalTaxonGroups(endpoint: LajiApi.Endpoints.informalRoots, query: LajiApi.Query): Observable<PagedResult<Informal>>;
  informalTaxonGroups(endpoint: LajiApi.Endpoints.informalChildren, query: LajiApi.Query, id: string): Observable<PagedResult<Informal>>;
  informalTaxonGroups(endpoint: LajiApi.Endpoints, query: object = {}, id?: string): Observable<any> {
    const url = `${environment.lajiApi.url}/${endpoint}`.replace('%id%', id);
    return this.httpClient.get(
      url,
      { params: { ...query, 'access_token': environment.lajiApi.accessToken } }
    );
  }

  /** 
   * Returns range that is of type select (alt)
   * @param endpoint Target API endpoint
   * @param range Type of range
   * @param query
  */
  fetchMetadata(endpoint: LajiApi.Endpoints.metadataRange, range: string, query: LajiApi.Query): Observable<Array<any>>;
  fetchMetadata(endpoint: LajiApi.Endpoints, range?: string, query: object = {}): Observable<any> {
    const url = `${environment.lajiApi.url}/${endpoint}`.replace('%range%', range);
    return this.httpClient.get(
      url,
      { params: { ...query, 'access_token': environment.lajiApi.accessToken } }
    );
  }

  /**
  * Taxonomy API
  * @param endpoint Target API endpoint
  * @param id Id of the given taxon
  * @param query
  */
  taxonomyFindById(endpoint: LajiApi.Endpoints.taxon, id: string, query: LajiApi.Query): Observable<Taxonomy>;
  taxonomyFindById(endpoint: LajiApi.Endpoints.media, id: string, query: LajiApi.Query): Observable<Array<TaxonomyImage>>;
  taxonomyFindById(endpoint: LajiApi.Endpoints.description, id: string, query: LajiApi.Query): Observable<Array<any>>;
  taxonomyFindById(endpoint: LajiApi.Endpoints.taxonSpecies, id: string, query: LajiApi.Query): Observable<PagedResult<Taxonomy>>;
  taxonomyFindById(endpoint: LajiApi.Endpoints.taxonParents, id: string, query: LajiApi.Query): Observable<Array<Taxonomy>>;
  taxonomyFindById(endpoint: LajiApi.Endpoints, id: string, query: object = {}): Observable<any> {
    const url = `${environment.lajiApi.url}/${endpoint}`.replace('%id%', id);
    return this.httpClient.get(
      url,
      { params: { ...query, 'access_token': environment.lajiApi.accessToken } }
    );
  }

  /** 
  * News API
  * @param endpoint Target API endpoint
  * @param query
  */
  newsFindAll(endpoint: LajiApi.Endpoints.newsArray, query: LajiApi.Query): Observable<PagedResult<NewsElement>>;
  newsFindAll(endpoint: LajiApi.Endpoints, query: object = {}): Observable<any> {
    const url = `${environment.lajiApi.url}/${endpoint}`;
    return this.httpClient.get(
      url,
      { params: { ...query, 'access_token': environment.lajiApi.accessToken } }
    );
  }

  /** 
  * Information API
  * @param endpoint Target API endpoint
  * @param id Id of the information
  */
  informationFindById(endpoint: LajiApi.Endpoints.information, id: string): Observable<Information>;
  informationFindById(endpoint: LajiApi.Endpoints, id: string): Observable<any> {
    const url = `${environment.lajiApi.url}/${endpoint}`.replace('%id%', id);
    return this.httpClient.get(
      url,
      { params: { 'access_token': environment.lajiApi.accessToken } }
    );
  }

  /** 
  * Form API
  * @param endpoint Target API endpoint
  * @param id Id of the form
  * @param lang Language of the form
  */
  formById(endpoint: LajiApi.Endpoints.form, id: string, lang: string): Observable<any>;
  formById(endpoint: LajiApi.Endpoints, id: string, lang: string): Observable<any> {
    const url = `${environment.lajiApi.url}/${endpoint}`.replace('%id%', id);
    return this.httpClient.get(
      url,
      { params: { lang: lang, 'access_token': environment.lajiApi.accessToken } }
    );
  }
  documentsByPersonToken(endpoint: LajiApi.Endpoints.documents, query: LajiApi.Query): Observable<any>;
  documentsByPersonToken(endpoint: LajiApi.Endpoints.documents, query: object = {}): Observable<any> {
    const url = `${environment.lajiApi.url}${endpoint}`;
    return this.httpClient.get(
      url,
      { params: { ...query, 'access_token': environment.lajiApi.accessToken } });
  }

  /**
   * Document API for POST method
   * @param endpoint Target API endpoint
   * @param personToken Persontoken received from laji-auth on login 
   * @param data Data to send
   */
  documentPost(endpoint: LajiApi.Endpoints.createDocument, personToken: string, data: Document): Observable<Document>;
  documentPost(endpoint: LajiApi.Endpoints, personToken: string, data?: Document, documentId?: string): Observable<any> {
    const url = `${environment.lajiApi.url}/${endpoint}`;
    return this.httpClient.post(
      url,
      JSON.stringify(data),
      { params: { 'personToken': personToken, 'access_token': environment.lajiApi.accessToken } }
    );
  }
  /**
   * Document API for GET methods
   * @param endpoint Target API endpoint
   * @param personToken Persontoken received from laji-auth on login
   * @param documentId ID of the document
   */
  documentGet(endpoint: LajiApi.Endpoints.getDocument, personToken: string, documentId: string): Observable<Document>;
  documentGet(endpoint: LajiApi.Endpoints, personToken: string, documentId: string): Observable<any> {
    const url = `${environment.lajiApi.url}/${endpoint}`.replace('%id%', documentId);
    return this.httpClient.get(
      url,
      { params: { 'personToken': personToken, 'access_token': environment.lajiApi.accessToken } }
    );
  }

  documentUpdate(endpoint: LajiApi.Endpoints.updateDocument, id: string, data: Document, personToken: string): Observable<any> {
    const url = `${environment.lajiApi.url}/${endpoint}`.replace('%id%', id);
    return this.httpClient.put(
      url,
      JSON.stringify(data),
      { params: { 'personToken': personToken, 'access_token': environment.lajiApi.accessToken } }
    );
  }
}

export namespace LajiApi {
  /** Endpoints in api.laji.fi */
  export enum Endpoints {
    informalRoots = 'informal-taxon-groups/roots',
    informalChildren = 'informal-taxon-groups/%id%/children',
    taxonParents = 'taxa/%id%/parents',
    taxon = 'taxa/%id%',
    taxonSpecies = 'taxa/%id%/species',
    documents = 'documents',
    description = 'taxa/%id%/descriptions',
    media = 'taxa/%id%/media',
    metadataRange = 'metadata/ranges/%range%',
    newsArray = 'news',
    newsElement = 'news/%id%',
    autocomplete = 'autocomplete/taxon',
    warehousequerycount = 'warehouse/query/count',
    warehousequerylist = 'warehouse/query/list',
    information = 'information/%id%',
    form = 'forms/%id%',
    createDocument = 'documents',
    getDocument = 'documents/%id%',
    updateDocument = 'documents/%id%'
  }
  /** Possible query parameters. */
  export interface Query {
    lang?: string;
    informalGroupFilters?: string;
    invasiveSpeciesFilter?: boolean;
    pageSize?: string;
    page?: string;
    tag?: string;
    onlyFinnish?: boolean;
    blacklist?: string;
    selectedFields?: string;
    langFallback?: boolean;
    hasMediaFilter?: boolean;
    includeMedia?: boolean;
    adminStatusFilters?: String;
    personToken?: String;


  }
  export interface AutocompleteQuery {
    q?: string;
    includePayload?: boolean;
    onlyInvasive?: boolean;
    lang?: string;
  }

  export interface warehousequerycountQuery {
    cache?: boolean;
    taxonId?: string;
    individualCountMin?: number;
  }

  export interface WarehouseQueryListQuery {
    taxonId: Array<string>;
    pageSize?: string;
    page: string;
  }

}
