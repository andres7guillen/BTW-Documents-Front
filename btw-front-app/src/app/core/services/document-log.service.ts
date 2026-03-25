import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DocumentLogService {
  private API = 'http://localhost:5228/api/documents';

  constructor(private http: HttpClient) {}

  get(documentId: string, page = 1, pageSize = 10, event = '') {
    return this.http.get(
      `${this.API}/${documentId}/logs?page=${page}&pageSize=${pageSize}&event=${event}`,
    );
  }
}
