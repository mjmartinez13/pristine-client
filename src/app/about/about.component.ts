import { Component, OnInit } from '@angular/core';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    $('#about-header').addClass('animated bounceInLeft');


    setTimeout( ()=> {
      $('#about-content').addClass('animated bounceInRight');
      $('#about-content').css('opacity', '1');

    }, 1000);
  }

}
