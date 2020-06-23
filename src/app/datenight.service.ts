import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Checklist } from './interfaces/checklist';

@Injectable({
  providedIn: 'root',
})
export class DatenightService {
  apiURL: string = 'http://localhost:3000';
  headerApiKey: string = '';
  //move into headerApiKey when needed for testing, to keep it in use longer
  // headerApiKey :  "735e70a38dmsh51d35733da346c0p1ede8bjsn2a8b56b052da"
  headerHost: string = 'tripadvisor1.p.rapidapi.com';
  movieAPI: string = '9de00a3aded0074e4a583ad4a86ef37b';
  activitiesURL: string =
    'http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates';
  constructor(private http: HttpClient) { }
  getActivities(keywords: string): any {
    return this.http.get(this.activitiesURL, {
      params: {
        singleLine: keywords,
        outFields: 'PlaceName, Place_Addr, City, Region',
        category: 'POI',
        forStorage: 'false',
        f: 'json',
        maxLocations: '15',
        sourceCountry: 'USA'
      },
    });
  }

  //backend to get the jokes from pgAdmin
  getAllJokes(): any {
    return this.http.get(`${this.apiURL}/jokes`);
  }

  getAllIntimate(): any {
    return this.http.get(`${this.apiURL}/intimate`);
  }

  getAllTrivia(): any {
    return this.http.get(`${this.apiURL}/trivia`);
  }

  getFood(locationID: string): any {
    return this.http.get(
      'https://tripadvisor1.p.rapidapi.com/restaurants/list',
      {
        params: {
          lang: 'en_US',
          // location_id: "42139"
          location_id: locationID,
          limit: '15'
        },
        headers: {
          'x-rapidapi-key': this.headerApiKey,
          'x-rapidapi-host': this.headerHost,
        },
      }
    );
  }

  getLocation(locationString): any {
    return this.http.get(
      'https://tripadvisor1.p.rapidapi.com/locations/search',
      {
        params: {
          // query: "lansing michigan"
          query: locationString,
        },
        headers: {
          'x-rapidapi-key': this.headerApiKey,
          'x-rapidapi-host': this.headerHost,
        },
      }
    );
  }

  getCurrentMovies(): any {
    return this.http.get('https://api.themoviedb.org/3/movie/now_playing', {
      params: {
        api_key: this.movieAPI,
        language: 'en-US',
      },
    });
  }

  getBeer(): any {
    return this.http.get(`${this.apiURL}/beer`);
  }
}
