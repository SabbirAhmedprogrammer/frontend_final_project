import { Component, OnInit } from '@angular/core';
import { DatenightService } from '../datenight.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-jokes',
  templateUrl: './jokes.component.html',
  styleUrls: ['./jokes.component.css'],
})
export class JokesComponent implements OnInit {
  showIceBreakersList: boolean = false;
  dirtyVariable: any;
  allJokes: any;
  randomJoke: any;
  showJokeForm: boolean = false;
  showJokeText: boolean = false;

  allIntimate: any;
  filteredIntimate: any;
  randomIntimate: any;
  showIntimateForm: boolean = false;
  showIntimateText: boolean = false;

  allTrivia: any;
  filteredTrivia: any;
  randomTrivia: any;
  showTriviaForm: boolean = false;
  showTriviaText: boolean = false;

  restaurants: any;
  showRestaurantList: boolean = false;
  restaurantsFiltered: any;

  moviesList: any;
  showMovieList: boolean = false;

  beer: any;
  show: boolean = false;

  activities: any;
  showActivityForm: boolean = false;

  location: any;
  constructor(
    private service: DatenightService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getBeer();
    this.getCurrentMovies();
    this.route.queryParams.subscribe((response) => {
      let location = response.city;
      this.service.getLocation(location).subscribe((response) => {
        let locationID = response.data[0].result_object.location_id;
        this.service.getFood(locationID).subscribe((response) => {
          this.restaurants = response.data;
          this.restaurantsFiltered = this.restaurants.filter((restaurant) => {
            return restaurant.hasOwnProperty('name');
          });
          console.log(this.restaurantsFiltered);
        });
      });
    });
  }

  showIceBreakers() {
    this.showIceBreakersList = !this.showIceBreakersList;
    this.showMovieList = false;
    this.showRestaurantList = false;
    this.show = false;
    this.showActivityForm = false;
  }

  showJokes() {
    this.showJokeForm = !this.showJokeForm;
    this.showIntimateForm = false;
    this.showTriviaForm = false;
  }

  getAllJokes(form: NgForm) {
    this.service.getAllJokes().subscribe((response) => {
      this.allJokes = response;
      if (form.value.jokes === 'true') {
        this.dirtyVariable = this.allJokes.filter((joke) => {
          return joke.adult === true;
        });
      } else {
        this.dirtyVariable = this.allJokes.filter((joke) => {
          return joke.adult === false;
        });
      }
      this.randomJoke = this.dirtyVariable[
        Math.floor(Math.random() * this.dirtyVariable.length)
      ];
    });
    this.showJokeText = true;
  }
  showPersonal() {
    this.showIntimateForm = !this.showIntimateForm;
    this.showJokeForm = false;
    this.showTriviaForm = false;
  }
  getAllIntimate(form: NgForm) {
    this.service.getAllIntimate().subscribe((response) => {
      this.allIntimate = response;
      // console.log(this.allIntimate);
      if (form.value.intimate === 'level1') {
        this.filteredIntimate = this.allIntimate.filter((level) => {
          return level.intimacy_level === 1;
        });
      } else if (form.value.intimate === 'level2') {
        this.filteredIntimate = this.allIntimate.filter((level) => {
          return level.intimacy_level === 2;
        });
      } else if (form.value.intimate === 'level3') {
        this.filteredIntimate = this.allIntimate.filter((level) => {
          return level.intimacy_level === 3;
        });
      }
      this.randomIntimate = this.filteredIntimate[
        Math.floor(Math.random() * this.filteredIntimate.length)
      ];
    });
    this.showIntimateText = true;
  }

  showTrivia() {
    this.showTriviaForm = !this.showTriviaForm;
    this.showJokeForm = false;
    this.showIntimateForm = false;
  }

  getAllTrivia(form: NgForm) {
    this.service.getAllTrivia().subscribe((response) => {
      this.allTrivia = response;
      if (form.value.trivia === 'miscellaneous') {
        this.filteredTrivia = this.allTrivia.filter((trivia) => {
          return trivia.category === 'Miscellaneous';
        });
      } else if (form.value.trivia === 'history') {
        this.filteredTrivia = this.allTrivia.filter((trivia) => {
          return trivia.category === 'History';
        });
      } else if (form.value.trivia === 'geography') {
        this.filteredTrivia = this.allTrivia.filter((trivia) => {
          return trivia.category === 'Geography';
        });
      } else if (form.value.trivia === 'science') {
        this.filteredTrivia = this.allTrivia.filter((trivia) => {
          return trivia.category === 'Science Facts';
        });
      }
      this.randomTrivia = this.filteredTrivia[
        Math.floor(Math.random() * this.filteredTrivia.length)
      ];
    });
    this.showTriviaText = true;
  }

  getCurrentMovies() {
    this.service.getCurrentMovies().subscribe((response) => {
      this.moviesList = response.results;
    });
  }

  showMovies() {
    this.showMovieList = !this.showMovieList;
    this.showIceBreakersList = false;
    this.showRestaurantList = false;
    this.show = false;
    this.showActivityForm = false;
  }

  search(form: NgForm) {
    this.router.navigate(['search'], {
      queryParams: { city: form.value.locationText },
    });
    this.location = form.value.locationText;
    form.reset();
  }

  showRestaurants() {
    this.showRestaurantList = !this.showRestaurantList;
    this.showMovieList = false;
    this.showIceBreakersList = false;
    this.show = false;
    this.showActivityForm = false;
  }

  getBeer(): any {
    this.service.getBeer().subscribe((response) => {
      this.beer = response;
      console.log(response);
    });
    // this.show = true;
  }
  hideBeer(): any {
    this.show = !this.show;
    this.showMovieList = false;
    this.showRestaurantList = false;
    this.showIceBreakersList = false;
    this.showActivityForm = false;
  }

  showActivities() {
    this.showActivityForm = !this.showActivityForm;
    this.showMovieList = false;
    this.showRestaurantList = false;
    this.show = false;
    this.showIceBreakersList = false;
  }

  getActivities(form: NgForm) {
    this.service
      .getActivities(`${form.value.activities} ${this.location}`)
      .subscribe((activityResponse) => {
        console.log(activityResponse);
        this.activities = activityResponse.candidates;
      });
  }
}
