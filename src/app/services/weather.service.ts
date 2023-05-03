import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { City } from '../model/city';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  countries = [
    { country: 'Singapore', city: 'Singapore' },
    { country: 'Malaysia', city: 'Kuala Lumpur' },
    { country: 'Indonesia', city: 'Jakatar' },
    { country: 'India', city: 'New Delhi' },
    { country: 'Thailand', city: 'Bangkok' },
    { country: 'United Kingdom', city: 'London' },
    { country: 'China', city: 'Beijing' },
  ]

  imageUrlCities = [
    { city: 'Singapore', imageUrl: 'https://tinyurl.com/386tnbbr' },
    { city: 'Malaysia', imageUrl: 'https://tinyurl.com/386tnbbr' },
    { city: 'Indonesia', imageUrl: 'https://tinyurl.com/386tnbbr' },
    { city: 'India', imageUrl: 'https://tinyurl.com/386tnbbr' },
    { city: 'Thailand', imageUrl: 'https://tinyurl.com/386tnbbr' },
    { city: 'United Kingdom', imageUrl: 'https://tinyurl.com/386tnbbr' },
    { city: 'China', imageUrl: 'https://tinyurl.com/386tnbbr' },
  ]
  constructor(private httpClient: HttpClient) { }

  getWeather(city: string, apiKey: string): Promise<any> {
    const params = new HttpParams()
      .set("q", city)
      .set("appid", apiKey)
      .set("units", "metric")

    return lastValueFrom(
      this.httpClient.get(environment.openWeatherUrl, {params: params}))
  }

  getCityUrl(city:string){
    const w = this.imageUrlCities.find(v=>v.city == city)
    console.log(w)

    return w
  }

  addCity(city:City){
    this.countries.push({city: city.city, country:city.country})
    this.sortCities()
    this.imageUrlCities.push({city: city.city, imageUrl: city.imageUrl})
  }
  
  sortCities() {
    this.countries.sort((a,b) =>b.city > a.city ? -1:1) //tenary sorting
    
  }
}

