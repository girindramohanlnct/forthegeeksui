import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Request, Response } from 'express';
import { join } from 'path';
import { ContentService } from '../content/content.service';
import { Content } from '../content/content.model';
import { createGzip } from 'zlib';

import { environment } from '../../environments/environment';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(
    private http: HttpClient,
    private contentService: ContentService
  ) {}

  sitemap(req: Request, res: Response) {
    res.header('Content-Type', 'application/xml');
    res.header('Content-Encoding', 'gzip');

    // Fetch blog posts from Contentful

    let posts: Content[];
    this.contentService.getPosts().subscribe((res) => {
      console.log(res);
      posts = [...res.contents];
    });
  }
}
