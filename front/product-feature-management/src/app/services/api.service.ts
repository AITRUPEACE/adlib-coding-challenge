import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

// This class is a base class for all API services. It provides basic methods for making HTTP requests.
// It is a generic class that takes a type parameter T which represents the type of the response body.
// Body is of type B which is a subtype of T. By default, B is equal to T.
// The URL of the API is constructed by concatenating the base URL with the path parameter
// Base URL is taken from the environment configuration file
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  protected baseUrl = environment.apiUrl;
  protected defaultHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(protected http: HttpClient) { }

  protected get<T>(path: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${path}`, { 
      headers: this.defaultHeaders,
      params 
    });
  }

  protected post<T, B = T>(path: string, body: B): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${path}`, body, { 
      headers: this.defaultHeaders 
    });
  }

  protected put<T, B = T>(path: string, body: B): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${path}`, body, { 
      headers: this.defaultHeaders 
    });
  }

  protected delete<T>(path: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${path}`, { 
      headers: this.defaultHeaders 
    });
  }
} 