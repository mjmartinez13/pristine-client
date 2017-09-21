import { Component, OnInit } from '@angular/core';
// import { SessionService } from './services/session-service/session.service';
declare var jQuery: any;
declare var $: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {

  newTechInfo = {};
  loginInfo ={};

  user: any;
  error: string;
  myData: any;

  constructor() { }


  ngOnInit() {
    // $(".button-collapse").sideNav();

    $(".button-collapse").sideNav({
        menuWidth: 300, // Default is 300
        edge: 'left', // Choose the horizontal origin
        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: true, // Choose whether you can drag to open on touch screens,
      }
    );


    $('#login-modal').modal();
    $('#signup-modal').modal();

    $('.create-account').click(function() {
      $('#login-modal').modal('close');
    });

    // this.mySessionService.isLoggedIn()
    // .then(userInfo => this.user = userInfo);
  }

  // createTechLogin(){
  //   this.mySessionService.createTechLogin(this.newTechInfo)
  //   .then((techInfo)=>{
  //     this.user = techInfo;
  //     this.error = null;
  //   })
  //   .catch((err)=>{
  //     this.user = null;
  //     this.error = err;
  //   });
  // }
  //
  // login(){
  //   this.mySessionService.login(this.loginInfo)
  //   .then((userInfo)=>{
  //     this.user = userInfo;
  //     this.error = null;
  //   })
  //   .catch((err)=>{
  //     this.user = null;
  //     this.error = err;
  //   });
  // }
  //
  // logout(){
  //   this.mySessionService.logout()
  //   .then(()=>{
  //     this.user = null;
  //     this.error = null;
  //   })
  //   .catch(err => this.error = err);
  // }

}
