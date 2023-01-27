import {Component, OnInit} from '@angular/core';
import {WeatherService} from 'src/app/services/weather.service';
import {clone} from 'lodash';
import {WeatherRootObject} from "../../models/weather.interface";

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  address = 'Budapest';
  addressLastSearch: string | undefined;
  weatherList: WeatherRootObject | null = null;
  isLoading = false;

  constructor(
    private weatherService: WeatherService,
  ) {}


  ngOnInit(): void {
    this.isLoading = true;
    this.displayWeather();
    this.weatherService.findMe();
    this.weatherService.currentAddressNameSubject.subscribe((addressName: string) => {
      this.address = addressName;
      this.displayWeather();
    });
    this.isLoading = false;
  }

  displayWeather(): void {
    this.isLoading = true;
    this.weatherService.getWeather(this.address).subscribe(
      (weatherResponse) => {
        this.weatherList = weatherResponse;
        this.addressLastSearch = clone(this.address);
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = false;
        console.log(err);
      }
    );
  }
}
