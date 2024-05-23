import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Festivo } from '../../../core/entidades/festivo';
import { environment } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class FestivosService {

  private url: string;

  constructor(private http: HttpClient) {
      this.url = `${environment.UrlBase}listado/`
   }

   public listar(year: number): Observable<Festivo[]>{
    return this.http.get<Festivo[]>(`${this.url}${year}`);
   }
}
