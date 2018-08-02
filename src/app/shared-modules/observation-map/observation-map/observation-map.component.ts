import { Component, OnInit, Input } from '@angular/core';
import { ObservationService } from '../../../shared/service/observation.service';
import { WarehouseQueryList } from '../../../shared/model/Warehouse';
import { PagedResult } from '../../../shared/model/PagedResult';
import { Subscription } from 'rxjs/Subscription';
import { UserService, Role } from '../../../shared/service/user.service';

import * as $ from 'jquery';

var _municipalities = require('./municipalities.json');

var LajiMap = require("laji-map").default;

@Component({
  selector: 'vrs-observation-map',
  templateUrl: './observation-map.component.html',
  styleUrls: ['./observation-map.component.scss']
})

export class ObservationMapComponent implements OnInit{

  /* Used to populate the map with observations*/
  @Input() id: string;

  private idArray: Array<string>=[];
  private maxObservations: string = "200";
  private observations: Array<any> = [];
  private filteredObservations: Array<any> = [];

  /* LajiMap */
  private map;
  private mapData=[];

  /* Filters */
  private observationsInSelectedMun: Array<any> = [];
  private adminMode = false;
  municipalities = _municipalities;
  isAdmin = UserService.hasRole(Role.CMS_ADMIN);

  constructor(private observationService: ObservationService) { }

  ngOnInit() {
    this.idArray.push(this.id);
    if (this.id) {
      this.populateObservationsById(this.idArray, this.maxObservations,()=>{
        this.filteredObservations = this.observations;
        this.generateMapData();
        this.initializeMap();
      });
    } else if (true) {
      this.populateObservationsByAll(this.maxObservations, ()=>{
        this.filteredObservations = this.observations;
        this.generateMapData();
        this.initializeMap();
      });
    } /*else {
      this.setMapData();
      this.initializeMap();
    }*/
    $('#select-municipality').change(() => {
      this.observationsInSelectedMun=[];
      this.observations.forEach((observation)=>{
        if(observation.gathering.interpretations.municipalityDisplayname == $('#select-municipality').val() || $('#select-municipality').val()=="all"){
          this.observationsInSelectedMun.push(observation);
        };
      });
      // temporarily declare filtered observations as all the observations in the muncipality that was chosen
      // in the future this will change with additional filters
      this.filteredObservations = this.observationsInSelectedMun;
    });
    $('#genMap').click(()=>{
      $("#map").children().remove();
      this.generateMapData();
      this.initializeMap();
    });
  }

  populateObservationsByAll(max, callback) {
    this.observationService.getAllObservations(max, "1").subscribe(data => {
      this.observations= data.results;
      callback();
    });
  }

  populateObservationsById(idArray, max, callback) {
    this.observationService.getObservationsById(idArray, max, "1").subscribe(data => {
      this.observations= data.results;
      callback();
    });
  }

  generateMapData() {
    const _adminMode = this.adminMode;
    this.mapData=[];
    let coordinates = [];
    let municipality= "";
    let date= "";
    let isReliable: boolean = false;
    let notes="";

    this.filteredObservations
      .forEach((observation) => {
        if(observation.gathering.conversions) {
          if(_adminMode) {
            coordinates = [
              observation.gathering.conversions.wgs84CenterPoint.lon,
              observation.gathering.conversions.wgs84CenterPoint.lat
            ]
          } else {
            // client side randomization of coordinates for privacy reasons (not safe! Todo: client side randomization)
            let accuracy = 0.01;
            coordinates = [
              observation.gathering.conversions.wgs84CenterPoint.lon + (Math.random() * (accuracy - (-accuracy)) ) + (-accuracy),
              observation.gathering.conversions.wgs84CenterPoint.lat + (Math.random() * (accuracy - (-accuracy)) ) + (-accuracy)
            ]
          }
          municipality = observation.gathering.interpretations.municipalityDisplayname;
          date = observation.gathering.displayDateTime;
          notes = observation.unit.notes || "";
          isReliable = observation.unit.recordBasis !== "HUMAN_OBSERVATION_UNSPECIFIED";

          const dataObject= this.returnFeatureCollectionAndPopup(this.returnFeatures(coordinates), municipality, date, notes, isReliable);
          this.mapData.push(dataObject);
        }
      });
  }

  returnFeatures (coordinates:Array<any>){
    let features = [];
    let rad = 5000;
    if(this.adminMode) {
      rad = 10;
    }
    features.push(
      {
        'type': 'Feature',
        "properties": {},
        'geometry': {
          'type': 'Point',
          'coordinates': coordinates,
          "radius": rad
        }
    })
    return features;
  }

  returnFeatureCollectionAndPopup(features:Array<any>,municipality:string, date:string, notes:string, isReliable:boolean){
    const _adminMode = this.adminMode;
    const dataObject= {
      featureCollection: {
        'type': 'FeatureCollection',
        'features': features
      },

      getFeatureStyle() {
        let color = "#f89525";
        let opacity = 0.1 * (1 / ((new Date()).getFullYear() - parseInt(date.substring(0, 4)) + 1));
        let fillColor = "#f89525";
        let fillOpacity = opacity * 0.9;
        if(_adminMode) { opacity=1; fillOpacity=1; color="red"; fillColor="red"}

        if (isReliable) { color = "#41967b"; fillColor = "#41967b"; }

        return {
                opacity: opacity,
                fillOpacity: fillOpacity,
                color: color,
                fillColor: fillColor,
                weight: 3
        }
      },

      getPopup(){
        return date.substring(8, 10) + "." + date.substring(5, 7) + "." + date.substring(0, 4) + " " + municipality + "<br>" + notes;
      }
    }
    return dataObject;
  }

  initializeMap() {
    this.map = new LajiMap(this.mapOptions());
  }

  mapOptions(){
    const options = {
      rootElem: document.getElementById("map"),
      popupOnHover: false,
      center: {
        "lat": 65.2,
        "lng": 27
      },
      zoom: 1.4,
      zoomToData : true,
      tileLayerName: "openStreetMap",
      controls: {
      },
      data: this.mapData
    };
    return options;
  }

}