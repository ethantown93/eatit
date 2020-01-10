import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-reviews',
  templateUrl: './customer-reviews.component.html',
  styleUrls: ['./customer-reviews.component.css']
})
export class CustomerReviewsComponent implements OnInit {

  customerReviews = [
    {
      firstName: 'Jimmy',
      lastName: 'Johnson',
      review: 'Amazing service, would highly recommend to anyone looking for a great meal prep service.',
      profilePic: './assets/images/rock-hard.jpg'
    },
    {
      firstName: 'Jane',
      lastName: 'Goodall',
      review: 'I\'m super impressed with this service! My food got here so fast, and it is delicious!' ,
      profilePic: './assets/images/jane.jpg'
    },
    {
      firstName: 'Billy',
      lastName: 'Chung',
      review: 'Excellent product. I love that there are different plans to fit my needs.',
      profilePic: './assets/images/oof.jpg'
    },
    {
      firstName: 'Joe',
      lastName: 'Licker',
      review: 'I\'ve been using this service for some time now, and I have no complaints!',
      profilePic: './assets/images/buttlicker.jpg'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
