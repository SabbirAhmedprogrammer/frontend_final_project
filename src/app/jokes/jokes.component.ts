import { Component, OnInit } from '@angular/core';
import { DatenightService } from '../datenight.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-jokes',
  templateUrl: './jokes.component.html',
  styleUrls: ['./jokes.component.css']
})
export class JokesComponent implements OnInit {

  allJokes: any = [];
  restaurants: any = [];


  constructor(private service: DatenightService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllItems();
    // this.getFood();
    // this.getLocation();
    //looks at url (the city defined from search)
    this.route.queryParams.subscribe(response => {
      let location = response.city
      this.service.getLocation(location).subscribe((response) => {
        console.log(response);
        let locationID = response.data[0].result_object.location_id;
        console.log(locationID);
        this.service.getFood(locationID).subscribe((response) => {
          // this.allFood = response.data;
          console.log(response);
          this.restaurants = response.data;
        })

      })

    })
  }

  getAllItems() {
    this.service.getAllItems().subscribe((response) => {
      this.allJokes = response;
      console.log(this.allJokes)
    })
  }

  // getLocation(locationString: string) {
  //   this.service.getLocation(locationString).subscribe((response) => {
  //     //this gives me the exact location id, which is then used to find the restaurants in that area. Need to tie location id 
  //     //to be a result of user input in a form. User types location, other parameters are filled, and this function
  //     //must then use that to return the id using the dot notation below
  //     this.allLocation = response.data[0].result_object.location_id;
  //     console.log(this.allLocation)
  //   })
  // }

  // getFood(locationID: string) {
  //   this.service.getFood(locationID).subscribe((response) => {
  //     this.allFood = response.data;
  //     console.log(this.allFood)
  //   })
  // }



  search(form: NgForm) {
    this.router.navigate(["search"], {
      queryParams: { city: form.value.locationText }
    });
    form.reset();
  }


}
