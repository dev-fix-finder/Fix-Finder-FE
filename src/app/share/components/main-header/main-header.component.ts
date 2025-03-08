import {Component, OnInit} from '@angular/core';
import {MainHeaderTopBarComponent} from './main-header-top-bar/main-header-top-bar.component';
import {MainHeaderNavBarComponent} from './main-header-nav-bar/main-header-nav-bar.component';

@Component({
  selector: 'app-main-header',
  imports: [
    MainHeaderTopBarComponent,
    MainHeaderNavBarComponent
  ],
  templateUrl: './main-header.component.html',
  standalone: true,
  styleUrl: './main-header.component.scss'
})
export class MainHeaderComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
