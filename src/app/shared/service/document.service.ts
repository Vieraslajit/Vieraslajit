import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService, LajiApi } from '../api/api.service';
import { Document } from '../model/Document';

@Injectable()
export class DocumentService {

  constructor(private apiService: ApiService) { }


  createDocument(personToken: string, data: Document): Observable<Document> {
    return this.apiService.documentPost(LajiApi.Endpoints.createDocument, personToken, data);
  }

  updateDocument(id: string, data: Document, personToken: string): Observable<Document> {
    return this.apiService.documentUpdate(LajiApi.Endpoints.getDocument, id, data, personToken);
  }
}
