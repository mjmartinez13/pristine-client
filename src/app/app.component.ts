import { Component, OnInit } from '@angular/core';
declare var jQuery: any;
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

    ngOnInit() {
      $(".button-collapse").sideNav();

      $('#login-modal').modal();
      $('#signup-modal').modal();

      $('.create-account').click(function() {
        $('#login-modal').modal('close');
      });
    }
}
