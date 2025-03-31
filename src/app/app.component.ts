import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MainLoaderComponent} from './share/components/main-loader/main-loader.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MainLoaderComponent,
  ],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Fix-Finder';
}
