import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaisSmall } from '../interfaces/paises.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {
  private _regiones: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  private _baseUrl: string = "https://restcountries.eu/rest/v2" 
  get regiones():string[]{
    return [... this._regiones]; // no se manipula _regiones 
  }

  constructor(private http: HttpClient) { }

  getPaisesXRegion(region:string): Observable<PaisSmall[]>{
    const url = `${this._baseUrl}/region/${region}?fields=alpha3Code;name`; 
      return this.http.get<PaisSmall[]>(url)
  }

}
