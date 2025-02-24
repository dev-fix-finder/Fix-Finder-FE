import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatRadioButton} from '@angular/material/radio';
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-user-type-selection',
  imports: [
    FormsModule,
    MatRadioButton,
    ReactiveFormsModule,
    MatButton,
    RouterLink
  ],
  templateUrl: './user-type-selection.component.html',
  standalone: true,
  styleUrl: './user-type-selection.component.scss'
})
export class UserTypeSelectionComponent implements OnInit {
  userType: string = '';
  userTypeForm = new FormGroup({
    isClient: new FormControl(null),
    isTradesperson: new FormControl(null),
  })

  ngOnInit(): void {
    this.userTypeForm.valueChanges.subscribe(data => {
      console.log(data);
    })
  }
}
