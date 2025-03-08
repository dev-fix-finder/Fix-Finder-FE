import {Component} from '@angular/core';
import {CarouselModule, OwlOptions} from 'ngx-owl-carousel-o';
import {NgForOf, NgStyle} from '@angular/common';

@Component({
  selector: 'app-landing-page-main-slider',
  imports: [
    CarouselModule,
    NgForOf,
    NgStyle
  ],
  templateUrl: './landing-page-main-slider.component.html',
  standalone: true,
  styleUrl: './landing-page-main-slider.component.scss'
})
export class LandingPageMainSliderComponent {

  advertisements: any = [
    "https://hvaccareermap.org/assets/image-uploads/Tradesperson_resized.jpg",
    "https://essentialsiteskills.co.uk/storage/app/media/Rebrand/Careers%20in%20Construction/Senior%20Tradesperson/Senior%20Tradesperson.jpg",
    "https://www.bizinsure.com/wp-content/uploads/2022/05/types-of-carpentry-role-scaled.jpg",
    "https://tradesmanskills.com/wp-content/uploads/how-to-become-a-gardener-1024x576-1200x628.jpg  ",
    ];
  caption_main_slider: any = [
    // 'Sri Lankan Spice Elegance, Delivered to Your Door',
    // 'Leading Cinnamon Producer & Exporter in Sri Lanka',
    // 'Discover the Authentic Flavours and Tantalizing Aromas of Sri Lankan Spices!'

    'Heading Here',
    'Heading Here',
    'Heading Here',
  ];

  // caption_main_slider1: any = [
  //   'Premium Quality',
  //   'Cinnamon, Black Pepper, Cloves, Turmeric, and More',
  //   'From Our Farm to Your Table'
  // ];
  //
  // caption_main_slider2: any = [
  //   'Discover',
  //   'Healthy, Qualitative, and Nutritious',
  //   'Sri Lankan Indigenous Flavors'
  // ];
  //
  // caption_main_slider3: any = [
  //   'Capturing the',
  //   'Natural Essence of Sri Lankan Spices',
  //   'Your Global Source for Rich and Authentic Flavors'
  // ];
  customOptions: OwlOptions = {
    animateOut: 'fadeOut',
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    autoplay: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      500: {
        items: 1,
        nav: false
      },
      576: {
        items: 1,
        nav: true
      },
      780: {
        items: 1,
        nav: true
      },
      1018: {
        items: 1,
        nav: true
      },
      1326: {
        items: 1,
        nav: true
      },
      1636: {
        items: 1,
        nav: true
      },
      2560: {
        items: 1,
        nav: true
      }
    },
    nav: false
  };

  constructor() {
  }

  ngOnInit(): void {
  }

}
