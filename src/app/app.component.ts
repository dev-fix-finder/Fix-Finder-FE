import {Component, OnDestroy, OnInit} from '@angular/core';
import {RecurrenceEditorModule, ScheduleModule} from '@syncfusion/ej2-angular-schedule';

import {RouterOutlet} from '@angular/router';
import {MainLoaderComponent} from './share/components/main-loader/main-loader.component';

@Component({
  selector: 'app-root',
  imports: [ScheduleModule, RecurrenceEditorModule,
    RouterOutlet,
    MainLoaderComponent,
  ],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Fix-Finder';

  constructor() {
  }

  ngOnInit() {

  }

  ngOnDestroy() {

  }
}
