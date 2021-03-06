import { Headers, Http, RequestOptionsArgs, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';


@Injectable()
export class FormApiClient {
  protected basePath = environment.lajiApi.url;
  public defaultHeaders: Headers = new Headers();
  private _lang: string;
  private _personToken: string;

  constructor(protected http: Http) {
  }

  public set lang(lang) {
    this._lang = lang;
  }

  public get lang() {
    return this._lang;
  }

  public set personToken(token) {
    this._personToken = token;
  }

  public get personToken() {
    return this._personToken;
  }

  public fetch(resource: string, query: any, options?: RequestOptionsArgs): Promise<any> {
    const path = this.basePath + resource;

    const queryParameters = new URLSearchParams();

    if (this._lang !== undefined) {
      queryParameters.set('lang', this._lang);
    }
    if (this._personToken !== undefined) {
      queryParameters.set('personToken', this._personToken);
    }

    for (const param in query) {
      if (!query.hasOwnProperty(param)) {
        continue;
      }
      if (query[param] !== undefined) {
        queryParameters.set(param, query[param]);
      }
    }
    if (!options) {
      options = {};
    }

    const requestOptions: RequestOptionsArgs = {
      method: options['method'] || 'GET',
      headers: options['headers'] ? new Headers(options['headers']) : this.defaultHeaders,
      params: queryParameters,
      body: options['body'] || undefined
    };

    switch (resource) {
      case '/autocomplete/taxon':
        queryParameters.set(
          'excludeNameTypes',
          'MX.misappliedCircumscription,MX.misspelledCircumscription,MX.uncertainCircumscription'
        );
    }

    return this.http.request(path, requestOptions).toPromise(Promise);
  }
}
