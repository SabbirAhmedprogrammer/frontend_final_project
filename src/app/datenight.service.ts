import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DatenightService {
  apiURL: string = 'http://localhost:3000';
  headerApiKey: string = '';
  //move into headerApiKey when needed for testing, to keep it in use longer
  // headerApiKey :  "a2361124f3msh8ee84513c3ca707p134e89jsna550c9f52d93"
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
