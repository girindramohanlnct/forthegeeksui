import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Content } from './content.model';
import { ContentService } from './content.service';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { Console } from 'console';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent implements OnInit, OnChanges {
  post: Content;
  content;
  topic;
  title;
  paramTitle;
  id;
  menu = [];
  isLoading = false;
  pressed = '';
  notFoud = false;
  role;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private contentService: ContentService,
    private meta: Meta,
    private headTitle: Title,
    private authService: AuthService
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {

    if(this.authService.getIsAuth()) {
      this.role = this.authService.getRole();
    }

    console.log(".......................", this.role)
    this.route.params.subscribe((res) => {
      console.log("ressssssssss", res);
      this.topic = res['topic'];
      this.paramTitle = res['title'];
    });

    console.log('param title ', this.paramTitle, ' ', this.topic);
    if (this.paramTitle) {
      console.log('param title ', this.paramTitle);
      this.isLoading = true;
      this.contentService
        .getContentByTitle(this.paramTitle)
        .subscribe((res) => {
          this.post = res.contents;
          this.title = res.contents.title;
          this.id = res.contents._id;
          console.log(
            'updating ',
            res.contents.title,
            ' ',
            res.contents.keyword
          );
          this.headTitle.setTitle(res.contents.title);
          this.meta.addTags([
            { name: 'keywords', content: res.contents.keyword },
            { name: 'description', content: res.contents.description },
          ]);
          this.content = res.contents.content;
          this.isLoading = false;
          console.log('titlr content', res);
        });
        this.http
        .get<{
          messege: string;
          contents: Content;
          allPost: Content[];
          subTopics: string[];
        }>(environment.apiUrl+'/getContent/' + this.topic)
        .subscribe(
          (res) => {
            //this.content = res.contents.content;
            console.log('Mohan ', this.topic);
            for (let i = 0; i < res.subTopics.length; i++) {
              let menu1: { topic: string; belowTopic: string[] } = {
                topic: '',
                belowTopic: [],
              };
              console.log(res.subTopics[i]);
              menu1['topic'] = res.subTopics[i];
              console.log('menu1 ', menu1.topic);
              for (let j = 0; j < res.allPost.length; j++) {
                if (menu1['topic'] === res.allPost[j].subTopic) {
                  menu1.belowTopic.push(res.allPost[j].title);
                }
              }
              this.menu.push(menu1);
            }

          },
          (err) => {
            console.log('Error');
            this.notFoud = true;
          }
        );
    } else {
      this.http
        .get<{
          messege: string;
          contents: Content;
          allPost: Content[];
          subTopics: string[];
        }>(environment.apiUrl+'/getContent/' + this.topic)
        .subscribe(
          (res) => {
            // console.log("srtttt", res.contents.keyword , " ", res.contents.description)
            console.log("Samjhe ", res)
            this.headTitle.setTitle(res.contents.title);
            this.title = res.contents.title;
            this.meta.addTags([
              { name: 'keywords', content: res.contents.keyword },
              { name: 'description', content: res.contents.description },
            ]);
            //this.content = res.contents.content;
            console.log('Mohan ', this.topic);
            for (let i = 0; i < res.subTopics.length; i++) {
              let menu1: { topic: string; belowTopic: string[] } = {
                topic: '',
                belowTopic: [],
              };
              console.log(res.subTopics[i]);
              menu1['topic'] = res.subTopics[i];
              console.log('menu1 ', menu1.topic);
              for (let j = 0; j < res.allPost.length; j++) {
                if (menu1['topic'] === res.allPost[j].subTopic) {
                  menu1.belowTopic.push(res.allPost[j].title);
                }
              }
              this.menu.push(menu1);
            }
            
            console.log('menu   ', this.menu);
            console.log(res.contents._id);
            this.id = res.contents._id;
            this.content = res.contents.content;
            console.log(this.title, this.content);
          },
          (err) => {
            console.log('Error');
            this.notFoud = true;
          }
        );
    }
  }

  getContentByTitle(title: string) {
    console.log("LOADING...........", title);
    this.router.navigate(['content', this.topic, title]);
    console.log('param title ', this.paramTitle);
    this.isLoading = true;
    this.contentService
      .getContentByTitle(title)
      .subscribe((res) => {
        this.post = res.contents;
        console.log(
          'updating ',
          res.contents.title,
          ' ',
          res.contents.keyword
        );
        this.headTitle.setTitle(res.contents.title);
        this.meta.addTags([
          { name: 'keywords', content: res.contents.keyword },
          { name: 'description', content: res.contents.description },
        ]);
        this.id= res.contents._id;
        this.title = res.contents.title;
        this.content = res.contents.content;
        this.isLoading = false;
        console.log('title content', res);
      });


  }
}
