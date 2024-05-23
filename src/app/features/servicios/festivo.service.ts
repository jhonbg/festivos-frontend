import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Festivo } from '../../core/entidades/festivo';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class FestivoService {

  private url: string;

  constructor(private http: HttpClient) {
      this.url = `${environment.UrlBase}`
   }

   public listar(year: number): Observable<Festivo[]>{
    return this.http.get<Festivo[]>(`${this.url}listado/${year}`);
   }

   public verificar(year: number, month: number, day: number): Observable<string>{
    return this.http.get(`${this.url}verificar/${year}/${month}/${day}`, { responseType: 'text' });
  }
}
