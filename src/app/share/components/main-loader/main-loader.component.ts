import {Component} from '@angular/core';
import {LoadingService} from '../../services/loading/loading.service';
import {AsyncPipe, NgIf} from '@angular/common';

@Component({
  selector: 'app-main-loader',
  imports: [
    AsyncPipe,
    NgIf
  ],
  templateUrl: './main-loader.component.html',
  standalone: true,
  styleUrl: './main-loader.component.scss'
})
export class MainLoaderComponent {

  constructor(public loadingService: LoadingService) {
  }

  ngOnInit(): void {
  }
}
