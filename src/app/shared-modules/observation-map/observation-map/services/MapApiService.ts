import { ObsMapObservations } from "./data/ObsMapObservations";
import { ObsMapOptions, ObsMapOption } from "./data/ObsMapOptions";
import { ObservationService } from "../../../../shared/service/observation.service";
import { Injectable } from "@angular/core";
import { AreaService } from "../../../../shared/service/area.service";

/* Listens to updates in obsMapOptions
    and updates obsMapObservations accordingly */

@Injectable()

export class MapApiService {

    constructor(private obsMapOptions:ObsMapOptions, private obsMapObservations:ObsMapObservations, private observationService: ObservationService, private areaService: AreaService) {}

    initialize() {
        /* Update observation list whenever there's a change in options */
        this.obsMapOptions.eventEmitter.addListener("change", ()=>{
            this.updateObservationList();
        });
    }

    getAreas() {
        return this.areaService.getMunicipalities("municipality");
    }

    private updateObservationList() {
        this.getObservations().subscribe((r)=>{
            console.log(r);
            this.obsMapObservations.removeAll();
            let observations = [];
            r.results.forEach(element => {
                observations.push(element);
            });
            this.obsMapObservations.addObservations(observations);
            this.obsMapOptions.loadState=false;
        });
    }

    private getObservations() {
        let query = {
            invasive: true,
            page: 1,
            pageSize: 200,
            selected: [
                "unit.taxonVerbatim", "unit.linkings.taxon.scientificName",
                "unit.linkings.taxon.qname", "gathering.conversions.wgs84CenterPoint.lat",
                "gathering.conversions.wgs84CenterPoint.lon", "gathering.displayDateTime",
                "gathering.interpretations.municipalityDisplayname", "gathering.team",
                "unit.quality"
            ]
        };
        if(this.obsMapOptions.getOption("id")) query["taxonId"] = this.obsMapOptions.getOption("id")
        if(this.obsMapOptions.getOption("personToken")) query["observerPersonToken"] = this.obsMapOptions.getOption("personToken");
        if(this.obsMapOptions.getOption("municipality")) query["finnishMunicipalityId"] = this.obsMapOptions.getOption("municipality");

        this.obsMapOptions.loadState = true;
        this.obsMapObservations.removeAll();
        return this.observationService.getObservations(query);
    }
}