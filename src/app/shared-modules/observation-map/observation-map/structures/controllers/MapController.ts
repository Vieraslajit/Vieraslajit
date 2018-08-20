import * as LM from 'laji-map';
import LajiMap, { TileLayerName, Data, DataOptions } from '../../../../../../../node_modules/laji-map/lib/map.d';

import { ObsMapObservations } from "../data/ObsMapObservations";
import { ObsMapOptions } from '../data/ObsMapOptions';
import { PathOptions } from '../../../../../../../node_modules/@types/leaflet';
import { Injectable } from '../../../../../../../node_modules/@angular/core';
import { ObservationMapModule } from '../../../observation-map.module';
import { EventEmitter } from 'events';
/* Listens to updates in obsMapObservations
    and updates the map accordingly */

@Injectable()

export class MapController {

    private map:LajiMap;

    eventEmitter:EventEmitter = new EventEmitter();

    constructor(private obsMapOptions:ObsMapOptions, private obsMapObservations:ObsMapObservations) {}

    initializeMap(e:HTMLElement) {
        this.map = new LM.default({
            rootElem: e,
            popupOnHover: false,
            center: [65.2, 27],
            zoom: 2,
            zoomToData: false,
            tileLayerName: <TileLayerName>"openStreetMap"
        });
        this.obsMapObservations.eventEmitter.addListener('change', ()=>{
          this.map.setData(this.getMapData());
        });
    }

    zoomAt(center:[number, number], zoomLevel:number) {
      this.map.setCenter(center);
      this.map.setNormalizedZoom(zoomLevel, {animate: false});
    }

    private getMapData():Data[] {
      let mapData=[];
        
      let obs = this.obsMapObservations.getObservations();
      let features = [];
      obs.forEach((o)=>{
        if(o.gathering.conversions) {  
          let f = {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates:
              [o.gathering.conversions.wgs84CenterPoint.lon,
                o.gathering.conversions.wgs84CenterPoint.lat]
            },
            properties: {}
          };
          features.push(f);
        }
      });

      let dataOptions: DataOptions = {
        featureCollection: {
          type: "FeatureCollection",
          features: features
        },
        cluster: {
          spiderfyOnMaxZoom: true,
          showCoverageOnHover: true,
          singleMarkerMode: true,
          maxClusterRadius: 20
        },
        getFeatureStyle: ():PathOptions=>{
          let p:PathOptions = {
            color: this.obsMapOptions.getOption("adminMode")?"#ff0000":"#f89525",
            fillColor: this.obsMapOptions.getOption("adminMode")?"#ff0000":"#f89525",
          }
          return p;
        },
        getPopup: (data):string=>{
          let name = obs[data].unit.taxonVerbatim;
          let municipality = obs[data].gathering.interpretations.municipalityDisplayname || "N/A";
          let date = obs[data].gathering.displayDateTime;
          let notes = obs[data].unit.notes || "";

          this.eventEmitter.emit('onPopup', obs[data]);

          return name.charAt(0).toUpperCase()
          + name.substr(1)+ " | "
          + date.substring(8, 10) + "."
          + date.substring(5, 7) + "."
          + date.substring(0, 4) + " | "
          + municipality + " <br> "
          + notes;
        }
      }

      mapData.push(dataOptions);
      return mapData;
    }
}