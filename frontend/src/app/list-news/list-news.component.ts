import { Component, OnInit } from '@angular/core';
import { News } from '../models/News';
import { NewsService } from '../services/news.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-news',
  templateUrl: './list-news.component.html',
  styleUrls: ['./list-news.component.css']
})
export class ListNewsComponent {
  newsList: News[];
  name: string;
  email: String;
  constructor(private newsService: NewsService, private router: Router) {
    this.newsService.getAllNews().subscribe(news => {
      // get current user email
      this.email = localStorage.getItem('email');
      this.name = localStorage.getItem('name');
       this.newsList = news;
    },
    err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.router.navigate(['/login']);
          localStorage.removeItem('token');
        }
      }
    }
   );
  }

}
