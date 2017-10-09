import { Component, OnInit } from '@angular/core';
import { ApplicantService } from '../services/applicant-service/applicant.service';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-joint',
  templateUrl: './joint.component.html',
  styleUrls: ['./joint.component.scss']
})
export class JointComponent implements OnInit {

  errorMessage: String;

  appSubmitted: Boolean = false;

  applicationInfo: Object = {};

  constructor(private myApplicantService: ApplicantService) { }

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

  submitApplication(){


    console.log(this.applicationInfo);

    this.myApplicantService.sendApplication(this.applicationInfo)
    .then((applicationCreated)=>{
      this.appSubmitted = true;
      console.log(applicationCreated);
    })
    .catch((err)=>{
      this.errorMessage = "Could not submit application. Try again later."
    });
  }


}
