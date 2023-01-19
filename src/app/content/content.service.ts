import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Content } from './content.model';
import { environment } from './../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ContentService {
  http: HttpClient;
  constructor() { }


  getContentByTitle(title:string) {
    return this.http.get<{message:string, contents:Content}>(environment.apiUrl +"/getContentByTitle/"+title);
  }

  getPosts() {
    console.log("###############")
    return this.http.get<{messege: string, contents:Content[]}>(environment.apiUrl +"/getPost/");
  }

  getContentPerTopic(topic) {
    this.http
    .get<{
      messege: string;
      contents: Content;
      allPost: Content[];
      subTopics: string[];
    }>(environment.apiUrl+'/getContent/' + topic)
  }
}
