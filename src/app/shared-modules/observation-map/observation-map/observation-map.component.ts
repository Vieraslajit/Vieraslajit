import { Component, Input, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import * as $ from 'jquery';

import { UserService, Role } from '../../../shared/service/user.service';
import { ObsMapOptions, ObsMapOption } from './structures/data/ObsMapOptions';
import { MapApiController } from './structures/controllers/MapApiController';
import { MapController } from './structures/controllers/MapController';
import { ObsMapListComponent } from './obs-map-list/obs-map-list';
import { TaxonSearchComponent } from './taxon-search/taxon-search.component';

@Component({
  selector: 'vrs-observation-map',
  templateUrl: './observation-map.component.html',
  styleUrls: ['./observation-map.component.scss']
})

export class ObservationMapComponent implements AfterViewInit, OnInit{
  @Input() id?: string;
  @Input() listEnabled?: boolean = false;
  @Input() mapHeight?: number = 400;
  @Input() taxonSearchEnabled?: boolean = false;
  @Input() municipalitySelectEnabled?: boolean = false;
  @Input() adminModeSelectorEnabled?: boolean = false;
  @Input() ownModeSelectorEnabled?: boolean = false;
  @Input() ownModeEnabled?: boolean = false;

  @ViewChild(ObsMapListComponent)
  mapTaxonList : ObsMapListComponent;

  @ViewChild(TaxonSearchComponent)
  taxonSearch : TaxonSearchComponent

  selectedInfo;

  private municipalities:Array<any> = [];

  /* Filters */
  private adminMode = false;
  isAdmin = UserService.hasRole(Role.CMS_ADMIN);
  isLoggedIn = UserService.loggedIn();

  constructor(private obsMapOptions:ObsMapOptions, private mapApiController:MapApiController, private mapController:MapController) {}

  ngOnInit() {
    this.mapApiController.initialize();
    this.mapApiController.getAreas().subscribe((r)=>{
      r.results.forEach(element => {
        this.municipalities.push(element);
      });
      this.municipalities.sort((a, b)=>{
        // Sort in alphabetical order
        let nameA = a.name;
        let nameB = b.name;
        if(nameA > nameB) return 1;
        if(nameA < nameB) return -1;
        return 0;
      });
    });
  }

  ngAfterViewInit() {
    this.mapController.initializeMap(document.getElementById("map"));
    // Initialize mapOptions
    let options: Array<[ObsMapOption, any]> = [
      ["id", this.id],
      ["list", this.listEnabled],
      ["taxonSearch", this.taxonSearchEnabled]
    ]
    if(this.ownModeEnabled) options.push(["personToken", UserService.getToken()])
    this.obsMapOptions.setOptions(options);

    this.mapTaxonList.eventEmitter.addListener("change", (e)=>{
      this.onTableActivate(e);
    });

    // taxon search
    this.taxonSearch.eventEmitter.addListener("change", (id)=>{
      this.obsMapOptions.setOption("id", id);
    })

    // select municipality
    $('#select-municipality').change(() => {
      this.obsMapOptions.setOption("municipality", $('#select-municipality').val());
    });
  }

  adminModeChange() {
    this.obsMapOptions.setOption("adminMode", this.adminMode);
  }

  ownModeChange() {
    this.ownModeEnabled ? this.obsMapOptions.setOption("personToken", UserService.getToken()) : this.obsMapOptions.setOption("personToken", null);
  }

  onTableActivate(e) {
    if(e.type == "click"){
      this.selectedInfo = {
        "taxonVerbatim": e.row.unit.taxonVerbatim,
        "team": e.row.gathering.team,
        "scientificName": e.row.unit.linkings.taxon.scientificName,
        "municipalityDisplayname": e.row.gathering.interpretations ? e.row.gathering.interpretations.municipalityDisplayname : "N/A",
        "displayDateTime": e.row.gathering.displayDateTime,
        "id": e.row.unit.linkings.taxon.qname.substring(14,e.row.unit.linkings.taxon.qname.length)
      }
      this.mapController.zoomAt(
        [e.row.gathering.conversions.wgs84CenterPoint.lat, e.row.gathering.conversions.wgs84CenterPoint.lon],
        this.obsMapOptions.getOption("municipality") ? 7 : 5);
    }
  }
}
