import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API = 'http://localhost:5228/api/documents';

@Injectable({ providedIn: 'root' })
export class DocumentService {
  constructor(private http: HttpClient) {}

  getAll(page = 1, pageSize = 10, status?: string, type?: string): Observable<any> {
    let params: any = {
      page,
      pageSize,
    };

    if (status) params.status = status;
    if (type) params.type = type;

    return this.http.get(`${API}`, { params });

    //return this.http.get(`${API}?page=${page}&pageSize=${pageSize}`);
  }

  getById(id: string): Observable<any> {
    return this.http.get(`${API}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(API, data);
  }

  issue(id: string) {
    return this.http.post(`${API}/${id}/issue`, {});
  }

  cancel(id: string) {
    return this.http.post(`${API}/${id}/cancel`, {});
  }

  delete(id: string) {
    return this.http.delete(`${API}/${id}`);
  }
}
