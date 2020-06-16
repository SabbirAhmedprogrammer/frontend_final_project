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
  dirtyVariable: any;
  allJokes: any;
  randomJoke: any;
  allIntimate: any;
  allTrivia: any;
  filteredTrivia: any;
  randomTrivia: any;
  restaurants: any;
  moviesList: any;
  beer: any;
  activities: any;
  location: any;
  constructor(
    private service: DatenightService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getCurrentMovies();
    // this.getRandomJoke();
    this.getBeer();
    this.getAllIntimate();
    // this.getAllTrivia();
    // this.getAllJokes();
    // this.getActivities();

    //looks at url (the city defined from search)

    this.route.queryParams.subscribe((response) => {
      let location = response.city;
      this.service.getLocation(location).subscribe((response) => {
        console.log(response);
        let locationID = response.data[0].result_object.location_id;
        console.log(locationID);
        this.service.getFood(locationID).subscribe((response) => {
          console.log(response);
          this.restaurants = response.data;
        });
      });
    });
  }

  getAllJokes(form: NgForm) {
    this.service.getAllJokes().subscribe((response) => {
      this.allJokes = response;
      if (form.value.jokes === "true") {
        this.dirtyVariable = this.allJokes.filter(joke => {
          return (joke.adult === true);
        });
      } else {
        this.dirtyVariable = this.allJokes.filter(joke => {
          return (joke.adult === false)
        })
      }
      this.randomJoke = this.dirtyVariable[Math.floor(Math.random() * this.dirtyVariable.length)]
    })
  }



  getAllIntimate() {
    this.service.getAllIntimate().subscribe((response) => {
      this.allIntimate = response;

      console.log(this.allIntimate);
    });
  }

  getAllTrivia(form: NgForm) {
    this.service.getAllTrivia().subscribe((response) => {
      this.allTrivia = response;
      if (form.value.trivia === "miscellaneous") {
        this.filteredTrivia = this.allTrivia.filter(trivia => {
          return (trivia.category === "Miscellaneous");
        });
      } else if (form.value.trivia === "history") {
        this.filteredTrivia = this.allTrivia.filter(trivia => {
          return (trivia.category === "History")
        })
      } else if (form.value.trivia === "geography") {
        this.filteredTrivia = this.allTrivia.filter(trivia => {
          return (trivia.category === "Geography")
        })
      } else if (form.value.trivia === "science") {
        this.filteredTrivia = this.allTrivia.filter(trivia => {
          return (trivia.category === "Science Facts")
        })
      }
      this.randomTrivia = this.filteredTrivia[Math.floor(Math.random() * this.filteredTrivia.length)]

    });
  }

  getCurrentMovies() {
    this.service.getCurrentMovies().subscribe((response) => {
      console.log('sandwich top');
      console.log(response);
      console.log('sandwich bottom');
      this.moviesList = response.results;
    });
  }

  search(form: NgForm) {
    this.router.navigate(['search'], {
      queryParams: { city: form.value.locationText },
    });
    this.location = form.value.locationText;
    form.reset();
  }
  getBeer(): any {
    this.service.getBeer().subscribe((response) => {
      this.beer = response;
      console.log(response);
    });
  }

  getActivities(form: NgForm) {
    // this.route.queryParams.subscribe(response => {
    //   console.log(response);
    this.service
      .getActivities(`${form.value.activities} ${this.location}`)
      .subscribe((activityResponse) => {
        console.log(activityResponse);
        this.activities = activityResponse.candidates;
      });
    // });
  }
}
