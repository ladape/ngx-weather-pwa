import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, Subject} from 'rxjs';
import {WeatherRootObject} from "../models/weather.interface";

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private readonly apiKey: string = environment.openWeatherApiKey;
  private currentLat: any;
  private currentLong: any;
  public currentAddressNameSubject: Subject<any> = new Subject();

  constructor(private http: HttpClient) {}

  public get currentaddressName(): Observable<string> {
    return this.currentAddressNameSubject.asObservable();
  }

  getWeather(address: string): Observable<WeatherRootObject> {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${address}&appid=${this.apiKey}`;

    return this.http.get<WeatherRootObject>(apiUrl);
  }


  findMe(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.currentLat = position.coords.latitude;
          this.currentLong = position.coords.longitude;
          this.handleCurrentaddressName().then((res) => {
            resolve(res);
          }).catch((err) => {
            reject(err);
          });
        });
      } else {
        reject();
      }
    });
  }

  private getAddressNameByLocation(): Observable<any> {
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.currentLat},${this.currentLong}&sensor=true&key=${environment.googleApiKey}`;

    return this.http.get(apiUrl);
  }
  private handleCurrentaddressName(): Promise<void> {
    const defaultaddressName = 'Budapest';

    return this.getAddressNameByLocation().toPromise().then((data) => {
      if (data && data.results && data.results.length > 0) {
        const currentaddressName = data.results[0].formatted_address;
        this.currentAddressNameSubject.next(currentaddressName);
      } else {
        this.currentAddressNameSubject.next(defaultaddressName);
      }
    }, () => {
      this.currentAddressNameSubject.next(defaultaddressName);
    });
  }
}
