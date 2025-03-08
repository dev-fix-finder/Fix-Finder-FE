import {Component, OnInit} from '@angular/core';
import {MatIcon, MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-main-header-top-bar',
  imports: [
    MatIconModule
  ],
  templateUrl: './main-header-top-bar.component.html',
  standalone: true,
  styleUrl: './main-header-top-bar.component.scss'
})
export class MainHeaderTopBarComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
