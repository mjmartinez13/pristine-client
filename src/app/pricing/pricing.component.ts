import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../services/device-service/device.service';
import { Router } from '@angular/router';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {

  modelId: String = '';

  devices: Array<Object> = [];
  repairTypes: Array<Object> = [];
  repairCosts: Array<Number> = [];
  errorMessage: String;

  device: String = '';
  repairType: String = '';
  repairCost: Number;

  constructor(private myDeviceService: DeviceService ) { }

  ngOnInit() {
    $('#device-modal').modal();
    $('#issue-modal').modal();
    $('select').material_select();


    //Loads screen with all initial phone models
    this.myDeviceService.getDevices()
    .then((devicesList)=>{
      this.devices = devicesList;
      this.device = devicesList[0].model;
      this.modelId = devicesList[0]._id;
      this.repairType = devicesList[0].repairType[0];
      this.repairCost = devicesList[0].repairCost[0];
      this.repairTypes = devicesList[0].repairType;
      // console.log(devicesList[0]);
    })
    .catch((err)=>{
      this.errorMessage = 'There was an error. Try again later.'
    });

  }


  selectDevice(id, device){
    this.modelId = id;
    this.device = device;

    //Gets repair types
    this.myDeviceService.getRepairType(this.modelId)
    .then((theRepairTypes)=>{
      this.repairTypes = theRepairTypes.repairType;
      // console.log(this.repairTypes);
    })
    .catch((err)=>{
      this.errorMessage = "Could not retrieve  details. Try again later."
    });

    //Gets repair type costs;
    this.myDeviceService.getRepairCost(this.modelId)
    .then((theRepairCosts)=>{
      this.repairCosts = theRepairCosts.repairCost;
      // console.log(this.repairCosts);

      if (this.repairType === "Screen"){
        this.repairCost = this.repairCosts[0];
      }else if (this.repairType === "Battery"){
        this.repairCost = this.repairCosts[1];
      }else if (this.repairType === "Won't Turn On"){
        this.repairCost = this.repairCosts[2];
      }else if (this.repairType === "Diognostic"){
        this.repairCost = this.repairCosts[3];
      }else if (this.repairType === "Other"){
        this.repairCost = this.repairCosts[4];
      }
    })
    .catch((err)=>{
      this.errorMessage = "Could not retrieve details. Try again later."
    });

    // console.log(this.repairType);


    // console.log(this.repairCosts);

    $('#device-modal').modal('close');
  }

  selectIssue(selectedRepairType, selectedRepairIndex){
    this.repairType = selectedRepairType;

    //Gets repair type costs;
    this.myDeviceService.getRepairCost(this.modelId)
    .then((theRepairCosts)=>{
      this.repairCosts = theRepairCosts.repairCost;
      // console.log(this.repairCosts);

      if (this.repairType === "Screen"){
        this.repairCost = this.repairCosts[0];
      }else if (this.repairType === "Battery"){
        this.repairCost = this.repairCosts[1];
      }else if (this.repairType === "Won't Turn On"){
        this.repairCost = this.repairCosts[2];
      }else if (this.repairType === "Diognostic"){
        this.repairCost = this.repairCosts[3];
      }else if (this.repairType === "Other"){
        this.repairCost = this.repairCosts[4];
      }
    })
    .catch((err)=>{
      this.errorMessage = "Could not retrieve details. Try again later."
    });

    // console.log(this.repairCosts);
    // console.log(selectedRepairIndex);
    // this.repairCost = this.repairCosts[selectedRepairIndex];

    $('#issue-modal').modal('close');

  }



}
