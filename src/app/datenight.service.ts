import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Checklist } from './interfaces/checklist';
import { environment } from 'src/environments/environment';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class DatenightService {
  apiURL: string = environment.apiBaseUrl;
  headerApiKey: string = '16a1528493msh29675e9b1228681p1ce0e8jsnb867c2c91495';
  // headerApiKey :  "16a1528493msh29675e9b1228681p1ce0e8jsnb867c2c91495"
  //old api key: 735e70a38dmsh51d35733da346c0p1ede8bjsn2a8b56b052da
  headerHost: string = 'tripadvisor1.p.rapidapi.com';
  movieAPI: string = '9de00a3aded0074e4a583ad4a86ef37b';
  activitiesURL: string =
    'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates';
  todos: Checklist[] = [];
  constructor(private http: HttpClient) {}
  getActivities(keywords: string): any {
    return this.http.get(this.activitiesURL, {
      params: {
        singleLine: keywords,
        outFields: 'PlaceName, Place_Addr, City, Region',
        category: 'POI',
        forStorage: 'false',
        f: 'json',
        maxLocations: '15',
        sourceCountry: 'USA',
      },
    });
  }

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
          location_id: locationID,
          limit: '15',
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

  getTasks() {
    return this.todos;
  }

  addTask(form: NgForm) {
    let newTask: Checklist = { task: form.value.task, completed: false };
    this.todos.push(newTask);
    form.reset();
  }

  deleteTask(index: number) {
    this.todos.splice(index, 1);
  }

  updateTask(index: number) {
    this.todos[index].completed = true;
  }
}
