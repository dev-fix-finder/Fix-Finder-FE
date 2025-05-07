import {Component} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-logout',
  imports: [
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './logout.component.html',
  standalone: true,
  styleUrl: './logout.component.scss'
})
export class LogoutComponent {
  constructor(private router: Router) {

  }

  logout() {
    sessionStorage.clear();
    this.router.navigateByUrl('/').then()
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }
}
