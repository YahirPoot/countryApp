import { Component, Output } from '@angular/core';
import { CountriesService } from '../../service/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent {

  public countries: Country[] = [];

  constructor(private countriesService: CountriesService) {}


  searchByCapital(term: string): void {
    this.countriesService.searchCapital(term)
      .subscribe( countries => {
        this.countries = countries;
      } );

  }

}
