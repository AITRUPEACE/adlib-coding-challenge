import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feature } from '../models/feature';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class FeatureService extends ApiService {
  private endpoint = 'features';

  getFeatures(): Observable<Feature[]> {
    return this.get<Feature[]>(this.endpoint);    
  }

  getFeature(id: number): Observable<Feature> {
    return this.get<Feature>(`${this.endpoint}/${id}`);
  }

  createFeature(feature: Omit<Feature, 'id'>): Observable<Feature> {
    return this.post<Feature>(this.endpoint, feature);
  }

  updateFeature(id: number, feature: Feature): Observable<Feature> {
    return this.put<Feature>(`${this.endpoint}/${id}`, feature);
  }

  deleteFeature(id: number): Observable<void> {
    return this.delete<void>(`${this.endpoint}/${id}`);
  }
}