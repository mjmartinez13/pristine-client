import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../services/device-service/device.service';
import { RepairDetailService } from '../services/repair-detail-service/repair-detail.service';


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
  enterNameBoolean: boolean = false;
  selectModelBoolean: boolean = false;
  selectColorBoolean: boolean = false;
  selectRepairBoolean: boolean = false;
  selectDateBoolean: boolean = false;
  selectTimeBoolean: boolean = false;
  locationAndContactBoolean: boolean = false;
  verificationBoolean: boolean = false;

  currentDate: Date = new Date();

  day1: Date = this.currentDate;
  day2: Date = this.currentDate;
  day3: Date = this.currentDate;
  day4: Date = this.currentDate;
  day5: Date = this.currentDate;
  day6: Date = this.currentDate;
  day7: Date = this.currentDate;

  availableDays: Array<Date> = [
    this.day1,
    this.day2,
    this.day3,
    this.day4,
    this.day5,
    this.day6,
    this.day7
  ];

  availableTimes : Array<String> = [
    "8-9am",
    "9-10am",
    "10-11am",
    "11-12pm",
    "12-1pm",
    "1-2pm",
    "2-3pm",
    "3-4pm",
    "4-5pm",
    "5-6pm",
    "6-7pm",
    "7-8pm"
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
  area: String;

  //Object variable that will hold all request details to send to api.
  requestInfo: Object;

  constructor(
    private myDeviceService: DeviceService,
    private myRepairDetailService: RepairDetailService
) { }

  ngOnInit() {

    this.selectModelBoolean = true;

    //Loads screen with all initial phone models
    this.myDeviceService.getDevices()
    .then((devicesList)=>{
      this.devices = devicesList;
    })
    .catch((err)=>{
      this.errorMessage = 'There was an error. Try again later.'
    });
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

}
