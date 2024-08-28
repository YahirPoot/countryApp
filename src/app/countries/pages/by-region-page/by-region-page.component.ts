import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../service/countries.service';
import { Region } from '../../interfaces/region.type';


@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})

export class ByRegionPageComponent implements OnInit {

  public countries: Country[] = [];
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectRegion?: Region;
  public isLoading: boolean = false;

  constructor( private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.selectRegion = this.countriesService.cacheStorage.byRegion.region;
    this.countries = this.countriesService.cacheStorage.byRegion.countries;
  }

  searchByRegion( region: Region): void {

    this.selectRegion = region;
    this.isLoading = true;

    this.countriesService.searchRegion(region)
      .subscribe(  countries => {
        this.countries = countries;
        this.isLoading = false;
      })
  }
}
