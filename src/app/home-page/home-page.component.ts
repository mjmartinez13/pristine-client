import { Component, OnInit } from '@angular/core';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    $('.parallax').parallax();

    // $('.work-section').waypoint(function (direction) {
    //   if (direction == "down") {
    //     $('nav').addClass('navbar-fixed');
    //   }else {
    //     $('nav').removeClass('navbar-fixed');
    //   }
    // });

    $('hero-section').waypoint(function (direction) {
      if (direction == "up") {
        $('nav').removeClass('nav-fixed');
      }
      }, {
        offset: '13%'
    });

    // $('.review-1').css('opacity', '1');
    //  setInterval(rotateImages, 6000);
    //
    //
    // function rotateImages() {
    //   let firstRev = $('.review-1');
    //   let secondRev = $('.review-2');
    //   let thirdRev = $('.review-3');
    //
    //   if (firstRev.hasClass('current')) {
    //     firstRev.removeClass('current');
    //       firstRev.animate({
    //         opacity: 0
    //       }, 1000, function() {
    //         secondRev.addClass('current');
    //         secondRev.animate({
    //           opacity: 1
    //         });
    //       });
    //   }
    //   else if (secondRev.hasClass('current')) {
    //     secondRev.removeClass('current');
    //     secondRev.animate({
    //       opacity: 0
    //     }, 1000, function() {
    //       thirdRev.addClass('current');
    //       thirdRev.animate({
    //         opacity: 1
    //       });
    //     });
    //
    //   }
    //   else if (thirdRev.hasClass('current')){
    //     thirdRev.removeClass('current');
    //     thirdRev.animate({
    //       opacity: 0
    //     }, 1000, function() {
    //       firstRev.addClass('current');
    //       firstRev.animate({
    //         opacity: 1
    //       });
    //     });
    //   }
    // }
    $('.carousel.carousel-slider').carousel({fullWidth: true});
  }
}
