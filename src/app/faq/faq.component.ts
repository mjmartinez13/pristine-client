import { Component, OnInit } from '@angular/core';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {
    $('.collapsible').collapsible();

    $(".collapsible-header").click(toggleIcon);

    function toggleIcon(){
      if ($(this).hasClass("active") === false){
        $(this).children("i").text("remove");
      }else {
        $(this).children("i").text("add");
      }
      return;
    }

    $(".site-top").click(()=>{
      var target = $("#site-top");
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    });
  }

}
