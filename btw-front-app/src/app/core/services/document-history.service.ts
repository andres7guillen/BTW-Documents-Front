import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DocumentHistoryService {
  private API = 'http://localhost:5228/api/documentHistory';

  constructor(private http: HttpClient) {}

  get(documentId: string, page = 1, pageSize = 10, event = '') {
    return this.http.get(
      `${this.API}/${documentId}/history?page=${page}&pageSize=${pageSize}&event=${event}`,
    );
  }

  getHistory(documentId: string, page = 1, pageSize = 10) {
    return this.http.get<any>(`${this.API}/${documentId}?page=${page}&pageSize=${pageSize}`);
  }
}
