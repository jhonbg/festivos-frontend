import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class FestivoService {

  private url: string;

  constructor(private http: HttpClient) {
      this.url = `${environment.UrlBase}verificar/`
   }

  public verificar(year: number, month: number, day: number): Observable<string>{
    return this.http.get(`${this.url}${year}/${month}/${day}`, { responseType: 'text' });
  }
}
