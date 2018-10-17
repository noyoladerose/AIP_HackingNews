import { Component, OnInit, Input } from '@angular/core';
import { AuthenticateService } from '../services/authenticate.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  name: String;
  @Input() envName: string;
  constructor(public auth: AuthenticateService) {
    this.name = localStorage.getItem('name');
  }
  ngOnInit() {
  }
}
