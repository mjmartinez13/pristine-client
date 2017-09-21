import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../services/device-service/device.service';
import { RepairDetailService } from '../services/repair-detail-service/repair-detail.service';
import { Router } from '@angular/router';
import { MomentModule } from 'angular2-moment';
import * as moment from 'moment';
import { FormControl, FormGroup } from '@angular/forms';

declare var jQuery: any;
declare var $: any;



@Component({
  selector: 'app-repair',
  templateUrl: './repair.component.html',
  styleUrls: ['./repair.component.scss']
})
export class RepairComponent implements OnInit {

  //Used to store the ID of the device chosen. (for further query purposes)
  modelId: String;

  //For Error message reporting
  errorMessage: String = '';

  //Booleans

  requestBarBoolean: boolean = true;
  enterNameBoolean: boolean = false;
  selectModelBoolean: boolean = false;
  selectColorBoolean: boolean = false;
  selectRepairBoolean: boolean = false;
  selectDateBoolean: boolean = false;
  selectTimeBoolean: boolean = false;
  locationAndContactBoolean: boolean = false;
  // browardCountyBoolean: boolean = true;
  miamiCountyBoolean: boolean = true;
  verificationBoolean: boolean = false;

  currentDate: Date = moment().toDate();

  day1: Date = this.currentDate;
  day2: Date = moment().add(1,'days').toDate();
  day3: Date = moment().add(2,'days').toDate();
  day4: Date = moment().add(3,'days').toDate();
  day5: Date = moment().add(4,'days').toDate();
  day6: Date = moment().add(5,'days').toDate();
  day7: Date = moment().add(6,'days').toDate();

  availableDays: Array<Date> = [
    this.day1,
    this.day2,
    this.day3,
    this.day4,
    this.day5,
    // this.day6,
    // this.day7
  ];

  availableTimes : Array<String> = [
    "8-9 am",
    "9-10 am",
    "10-11 am",
    "11-12 pm",
    "12-1 pm",
    "1-2 pm",
    "2-3 pm",
    "3-4 pm",
    "4-5 pm",
    "5-6 pm",
    "6-7 pm",
    "7-8 pm"
  ];

  //Variables to hold repair query results.
  devices: Array<Object> = [];
  models: Array<Object> = [];
  colors: Array<Object> = [];
  repairTypes: Array<String> = [];
  repairCosts: Array<Number> = [];

  //Variables to hold repair information
  // customer: String;
  // location: String;
  deviceName: String = 'iPhone';
  model: String;
  color: String;
  repairType: String;
  repairCost: Number;
  requestedDate: Date;
  requestedTime: String;

  firstName: String;
  email: String;
  phone: String;
  county: String;
  counties: any;
  browardAreas: Array<String> = ["Cooper City", "Davie", "Pembroke Pines", "Miramar", "Weston"];
  miamiAreas: Array<String> = ["Aventura", "Brickell", "Coral Gables", "Doral", "FIU"];
  area: String;

  //Object variable that will hold all request details to send to api.
  requestInfo: Object;

  constructor(
    private myDeviceService: DeviceService,
    private myRepairDetailService: RepairDetailService
) { }

  ngOnInit() {

    this.counties = [{name: "Broward"}, {name: "Miami-Dade"}];

    this.selectModelBoolean = true;

    //Loads screen with all initial phone models
    this.myDeviceService.getDevices()
    .then((devicesList)=>{
      this.devices = devicesList;
    })
    .catch((err)=>{
      this.errorMessage = 'There was an error. Try again later.'
    });

    $('select').material_select();
  }

  //Gets the details for one single phone model by id.
  getModel(id, model){

    this.modelId = id;

    this.model = model;

    this.myDeviceService.getModel(id)
    .then((theModels)=>{
      this.models = theModels;
    })
    .catch((err)=>{
      this.errorMessage = "Could not retrieve model details. Try again later."
    });
  }

  getColors(id, selectedModel){

    $(".determinate").css("width", "32%");

    this.selectModelBoolean = false;

    this.selectColorBoolean = true;

    this.modelId = id;

    this.model = selectedModel;

    this.myDeviceService.getColors(id)
    .then((theColors)=>{
      this.colors = theColors.colors;
    })
    .catch((err)=>{
      this.errorMessage = "Could not retrieve color details. Try again later."
    });

    this.getRepairCost();

  }

  getRepairType(selectedColor, selectedRepairCost){

    $(".determinate").css("width", "50%");
    $("#step-2").toggleClass("active");

    this.selectColorBoolean = false;
    this.selectRepairBoolean = true;

    this.color = selectedColor
    // this.repairCost = selectedRepairCost;

    this.myDeviceService.getRepairType(this.modelId)
    .then((theRepairTypes)=>{
      this.repairTypes = theRepairTypes.repairType;
      console.log(this.repairTypes);
    })
    .catch((err)=>{
      this.errorMessage = "Could not retrieve  details. Try again later."
    });
  }

  getRepairCost(){

    this.myDeviceService.getRepairCost(this.modelId)
    .then((theRepairCosts)=>{
      this.repairCosts = theRepairCosts.repairCost;
      console.log(this.repairCosts);
    })
    .catch((err)=>{
      this.errorMessage = "Could not retrieve details. Try again later."
    });
  }

  selectDate(selectedRepairType, selectedRepairIndex){
    $(".determinate").css("width", "66%");
    $("#step-3").toggleClass("active");

    this.selectRepairBoolean = false;
    this.selectDateBoolean = true;

    this.repairType = selectedRepairType;

    console.log(this.repairCosts);
    this.repairCost = this.repairCosts[selectedRepairIndex];

  }

  selectTime(selectedDate){

    $(".determinate").css("width", "75%");

    this.selectDateBoolean = false;
    this.selectTimeBoolean = true;

    this.requestedDate = selectedDate;
    console.log("Requested date:", this.requestedDate);
  }

  provideLocAndCon(selectedTime){

    $(".determinate").css("width", "90%");

    this.selectTimeBoolean = false;
    this.locationAndContactBoolean = true;

    this.requestedTime = selectedTime;
  }

  generateRequestInfo(){
    this.requestInfo = {
      firstName: this.firstName,
      email: this.email,
      phone: this.phone,
      county: this.county,
      area: this.area,
      device: this.deviceName,
      model: this.model,
      color: this.color,
      repairType: this.repairType,
      repairCost: this.repairCost,
      requestedDate: this.requestedDate,
      requestedTime: this.requestedTime
    };

    console.log(this.requestInfo);
  }

  submitRequest(selectedCounty, selectedArea, enteredFirstName, enteredEmail, enteredPhone){
    $(".determinate").css("width", "100%");

    this.locationAndContactBoolean = false;
    this.requestBarBoolean = false;
    this.verificationBoolean = true;

    this.firstName = enteredFirstName;
    this.email = enteredEmail;
    this.phone = enteredPhone;

    this.county = selectedCounty;
    this.area = selectedArea;

    this.generateRequestInfo();

    this.myRepairDetailService.sendDetails(this.requestInfo)
    .then((repairCreated)=>{
      console.log(repairCreated);
    })
    .catch((err)=>{
      this.errorMessage = "Could not create request. Try again later."
    });

    console.log ("A pristine specialist will reach out to you shortly!")
  }

  // function County($scope){
  //   $scope.counties=[{name: "Broward"}, {name: "Miami-Dade"}];
  // }

}
