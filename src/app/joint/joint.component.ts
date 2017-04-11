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

    $('.datepicker').pickadate({
    selectMonths: true,
    selectYears: 15
  });

    setTimeout(()=> {
      $('.valign').addClass('animated fadeIn');
    }, 500);

    setTimeout(()=> {
      $('.col-hide').addClass('animated bounceIn');
    }, 1000);


    $(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});
  }

  apply() {
    $('#apply-section').show(100);
  }

}
