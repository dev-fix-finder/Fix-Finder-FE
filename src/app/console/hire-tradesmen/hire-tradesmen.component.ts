import {Component} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-hire-tradesmen',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './hire-tradesmen.component.html',
  standalone: true,
  styleUrl: './hire-tradesmen.component.scss'
})
export class HireTradesmenComponent {
  titleText: string = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias cum dicta ea expedita id ipsa iusto laboriosam natus';
  filterForm = new FormGroup({
    category: new FormControl(''),
    minHourRate: new FormControl(''),
    maxHourRate: new FormControl(''),
  });

  tradespeople = [
    {
      name: 'Alex Mason',
      profileImage: 'https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg',
      coverImage: 'https://www.sage.com/en-gb/blog/wp-content/uploads/sites/10/2021/03/jeriden-villegas-VLPUm5wP5Z0-unsplash.jpg',
      ongoingProjects: 4,
      title: 'Licensed Electrician available for home rewiring, lighting, safety checks and more.',
      rating: 4.9
    },
    {
      name: 'Jamie Lee',
      profileImage: 'https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.jpg?s=612x612&w=0&k=20&c=9zbG2-9fl741fbTWw5fNgcEEe4ll-JegrGlQQ6m54rg=',
      coverImage: 'https://skilled.peopleready.com/wp-content/uploads/sites/2/2021/02/683433PeopleReady-Skilled-Trades-Blog-Image-02-1-1-1-1000x460.jpg',
      ongoingProjects: 2,
      title: 'Experienced plumber for leak repairs, pipe installation, and water heater servicing.',
      rating: 4.8
    },
    {
      name: 'Carlos Rivera',
      profileImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRQA0nWZwLx6fwhMKI_N1nzGOrRU_78S6l326esG8hCEi0M4sjI326cLvw70P659InGq4&usqp=CAU',
      coverImage: 'https://collabconstruction.com/wp-content/uploads/2022/11/hiring-trades-in-saskatchewan-regina.jpg',
      ongoingProjects: 5,
      title: 'Skilled carpenter for cabinets, custom woodwork, repairs & home improvements.',
      rating: 5.0
    }
  ];
}
