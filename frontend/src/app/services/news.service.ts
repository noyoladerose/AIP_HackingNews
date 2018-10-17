import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {News} from '../models/News';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class NewsService {
  domain: string;
  subParam: string;
  constructor(private http: HttpClient) {
    this.domain = `${environment.domainURL}` + '/news';
    this.subParam = '';

    console.log(this.domain);

  }

/* Get all News */

getAllNews() {
  this.subParam = '/news';

  return this.http.get<News[]>(`${this.domain}${this.subParam}`);
}

/* Add a News */

addNews(newsData) {
  console.log('news service - ', newsData);
  return this.http.post<any>(`${this.domain}`, newsData);

}
}
