import { Injectable } from '@angular/core';
import { ApiService, LajiApi } from '../api/api.service';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { switchMap } from 'rxjs/operator/switchMap';

@Injectable()
export class FormService {

  private formCache: { [id: string]: any } = {};

  constructor(private apiService: ApiService) { }

  getFormById(id: string, lang: string) {
    if (this.formCache[id]) {
      return Observable.of(this.formCache[id]);
    }
    return this.apiService.formById(LajiApi.Endpoints.form, id, lang)
      .do(result => this.formCache[id] = result);
  }

  loadFormWithDocument(formId: string, lang: string, documentId: string, personToken: string) {
    const form$ = this.formCache[formId] ?
      Observable.of(this.formCache[formId]) :
      this.apiService.formById(LajiApi.Endpoints.form, formId, lang)
        .do(result => this.formCache[formId] = result);

    const data$ = this.apiService.documentGet(LajiApi.Endpoints.getDocument, personToken, documentId);

    return data$
      .switchMap(data => {
        return form$
          .combineLatest(data$, (form, data) => {
            form.formData = data;
            return form;
          });
      });
  }
}
