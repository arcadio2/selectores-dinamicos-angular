import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { Paises, PaisSmall } from '../interfaces/paises.interface';

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
  getFronteras(codigo:string): Observable<Paises | null> {
    if(!codigo ) {
      return of(null)
    }
    const url = `${this._baseUrl}/alpha/${codigo}`; 
    return this.http.get<Paises>(url)
  }
  getFronterasSmall(codigo:string): Observable<Paises> {
    const url = `${this._baseUrl}/alpha/${codigo}?fields=alpha3Code;name`; 
    return this.http.get<Paises>(url)
  }
  
  getxCodigo(borders:string[]): Observable<PaisSmall[]> {
    if(!borders){
      return of([]);
    }  
    const peticiones: Observable<PaisSmall>[] = [];
    borders.forEach(codigo => {
      const peticion = this.getFronterasSmall(codigo); 
      peticiones.push(peticion); 
    });
    return combineLatest(peticiones); 
  }

}
