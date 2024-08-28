import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, count, delay, map, Observable, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CachesStorage, TermCountries } from '../interfaces/cache-storage.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStorage: CachesStorage = {
    byCapital: { term: '', countries: []},
    byCountry: { term: '', countries: []},
    byRegion:  { region: '', countries: []}
  }

  constructor(private http: HttpClient) { }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url)
      .pipe(
        catchError( () => of([])),
        // delay(2000)
      )
  }

  searchCountryAlphCode(code: string): Observable<Country | null> {
    return this.http.get<Country[]>(`${this.apiUrl}/alpha/${code}`)
      .pipe(
        map( countries => countries.length > 0 ? countries[0] : null),
        catchError( () => of(null))
      )
  }

  searchCapital(capital: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${capital}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap( countries => this.cacheStorage.byCapital = { term: capital, countries})
      );
  }

  searchCountry( country: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${country}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap( countries => this.cacheStorage.byCountry = { term: country, countries})
      );
  }

  searchRegion( region: Region ): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${region}`
    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStorage.byRegion = { region: region, countries})
      );
  }

}
