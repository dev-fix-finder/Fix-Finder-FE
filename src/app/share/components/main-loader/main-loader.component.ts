import {AfterViewInit, ChangeDetectorRef, Component} from '@angular/core';
import {LoadingService} from '../../services/loading/loading.service';
import {AsyncPipe, NgIf} from '@angular/common';
import {BehaviorSubject} from 'rxjs';

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
export class MainLoaderComponent implements AfterViewInit {
  // Create a local BehaviorSubject to avoid direct binding to the service
  public loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    public loadingService: LoadingService,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // Use setTimeout to defer the subscription until after the change detection cycle
    setTimeout(() => {
      // Subscribe to the service's mainLoader and update our local BehaviorSubject
      this.loadingService.mainLoader.subscribe(isLoading => {
        this.loading.next(isLoading);
        // Manually trigger change detection
        this.cdr.detectChanges();
      });
    });
  }
}
