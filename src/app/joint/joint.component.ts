import { Component, OnInit } from '@angular/core';
declare var jQuery: any;
declare var $: any;
@Component({
  selector: 'app-joint',
  templateUrl: './joint.component.html',
  styleUrls: ['./joint.component.scss']
})
export class JointComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    $('.parallax').parallax();
    $('select').material_select();

    setTimeout(()=> {
      $('.valign').addClass('animated fadeIn');
    }, 500);

    setTimeout(()=> {
      $('.col-hide').addClass('animated bounceIn');
    }, 1000);


  }

}
