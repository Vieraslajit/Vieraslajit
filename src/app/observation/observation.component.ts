import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ObservationService } from '../shared/service/observation.service';
import { WarehouseQueryList } from '../shared/model/Warehouse';
import { PagedResult } from '../shared/model/PagedResult';
import { Subscription } from 'rxjs/Subscription';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'vrs-observation',
  templateUrl: './observation.component.html',
  styleUrls: ['./observation.component.scss']
})

export class ObservationComponent implements OnInit, OnDestroy {
  @Input() id: string;
  private subTrans: Subscription;
  private idArray: Array<string>=[];
  private pageSize: string = "200";
  private observations: Array<any> = [];
  private mapData=[];


  constructor(private observationService: ObservationService,private translate: TranslateService) { }

  ngOnInit() {
    this.idArray.push(this.id);
    this.subTrans = this.translate.onLangChange.subscribe(this.update.bind(this));
    this.update();
  }

  update() {
    this.observationService.getObservationsById(this.translate.currentLang,this.idArray, this.pageSize, "1").subscribe(data => {
      this.observations= data.results;
      this.setMapData();
      this.initializeMap();
    });
  }  

  setMapData() {

    let coordinates = [];
    let municipality= "";
    let date= "";

    this.observations
      .forEach((observationObject) => {
        coordinates = [
          observationObject.gathering.conversions.wgs84CenterPoint.lon,
          observationObject.gathering.conversions.wgs84CenterPoint.lat
        ]
        municipality = observationObject.gathering.interpretations.municipalityDisplayname;
        date = observationObject.gathering.displayDateTime;

        const dataObject= this.returnFeatureCollectionAndPopup(this.returnFeatures(coordinates),municipality,date);
        this.mapData.push(dataObject);
      });
  }

  returnFeatures (coordinates:Array<any>){
    let features = [];
    features.push(
      {
        'type': 'Feature',
        "properties": {},
        'geometry': {
          'type': 'Point',
          'coordinates': coordinates,
          "radius": 5000
        }
    })
    return features;
  }
  
  returnFeatureCollectionAndPopup(features:Array<any>,municipality:string, date:string){
    const dataObject= {
      featureCollection: {
        'type': 'FeatureCollection',
        'features': features
      },
      getPopup(){
        /*return this.translate.instant('mapOfObservations.municipality'+municipality +"\n  mapOfObservations.reported: "+date);
        Cannot read property 'instant' of undefined?*/
        return municipality+ ", "+date;
      }
    }
    return dataObject;
  }

  initializeMap() {       
    var LajiMap = require("laji-map").default;
    var map = new LajiMap(this.mapOptions());
  }

  mapOptions(){
    const options = {
      rootElem: document.getElementById("map"),
      lang: this.translate.currentLang,
      popupOnHover: false,
      center: {
        "lat": 65.5,
        "lng": 27
      },
      zoom: 1,
      tileLayerName: "openStreetMap", 
      controls: {  
      },
      data: this.mapData
    };
    return options;
  }

  ngOnDestroy() {
    this.subTrans.unsubscribe();
  }  
  
}
 