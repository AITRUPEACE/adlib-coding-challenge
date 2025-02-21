import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feature } from '../models/feature';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {
  private apiUrl = 'api/features';
  constructor(private http: HttpClient) { }

  getFeatures(): Observable<Feature[]> {
    return this.http.get<Feature[]>(this.apiUrl);    
  }

  getFeature(id: number): Observable<Feature> {
    return this.http.get<Feature>(`${this.apiUrl}/${id}`);
  }

  createFeature(feature: Feature): Observable<Feature> {
    return this.http.post<Feature>(this.apiUrl, feature);
  }

  updateFeature(feature: Feature): Observable<Feature> {
    return this.http.put<Feature>(`${this.apiUrl}/${feature.id}`, feature);
  }

  deleteFeature(id: number): Observable<Feature> {
    return this.http.delete<Feature>(`${this.apiUrl}/${id}`);
  }
}