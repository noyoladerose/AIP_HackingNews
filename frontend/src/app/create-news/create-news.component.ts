import { Component, OnInit } from '@angular/core';
import { News } from '../models/News';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.css']
})
export class CreateNewsComponent implements OnInit {
  gift: string;
  isEmptyList: boolean;
  showEditButton: boolean;
  length = 0;
  email: string;
  msgResult: string;
    constructor(
                private newsService: NewsService,
                ) {
    }
    ngOnInit() {
      this.isEmptyList = false;
      this.showEditButton = false;
    }

    addNews(newsData) {
      const title = newsData.value.title;
      const desc = newsData.value.desc;
      const source = newsData.value.source;
      const url = newsData.value.url;

      const news: News = {
          title: title,
          desc: desc,
          source: source,
          url: url
      };
// call service
 this.newsService.addNews(news).subscribe(results => {
      this.msgResult = results.message;
 }, err => {
   this.msgResult = err;
 }
);

    }
}
