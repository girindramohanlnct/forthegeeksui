import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
})
export class BlogsComponent implements OnInit {
  blogs = [];

  constructor(private http: HttpClient) {
    this.http
      .get<{ message: string; posts: [] }>(
        environment.apiUrl+
        "/getPost"
      )
      .subscribe((res) => {
        console.log(res.posts);
        this.blogs = [...res.posts];
      });
  }

  ngOnInit(): void {}
}
