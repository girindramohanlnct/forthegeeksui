import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  email:string;

  constructor() { }

  ngOnInit(): void {
  }

  subscribe() {

    if(this.email && this.email.match('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')) {
      alert("Email successfully "+this.email);
      this.email = undefined;
    }
  }

}
