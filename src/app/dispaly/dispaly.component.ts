import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dispaly',
  templateUrl: './dispaly.component.html',
  styleUrls: ['./dispaly.component.css']
})
export class DispalyComponent implements OnInit {
  data;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

    this.http.get<{ message: string, data: [] }>("https://opinionbackend.herokuapp.com/getData").subscribe(res => {
      console.log(res.data);
      this.data = [...res.data];
    })
  }

}
