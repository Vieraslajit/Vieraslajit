import { Injectable, EventEmitter } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TaxonBrowserApiSettingsService, TaxonBrowserApiSettings } from "./taxon-browser-api-settings.service";

export interface TaxonBrowserQuery extends TaxonBrowserApiSettings {
    tab?: "grid" | "list";
}

@Injectable()
export class TaxonBrowserParameterService {

    private query: TaxonBrowserQuery = {};
    queryEventEmitter: EventEmitter<any> = new EventEmitter<any>();

    constructor(private route: ActivatedRoute,
                private router: Router,
                private settings: TaxonBrowserApiSettingsService) {}
    
    init() {
        this.route.queryParams.subscribe((params) => {
            // Translate strings to booleans (queryparams are always string)
            const mutated = {...params};
            Object.keys(mutated).forEach((key) => {
                if(mutated[key] === "true") {
                    mutated[key] = true;
                }
                if(mutated[key] === "false") {
                    mutated[key] = false;
                }
            })
            this.settings.apiSettings = mutated;
            this.queryEventEmitter.emit(mutated);
       })
    }

    updateQuery(s: TaxonBrowserApiSettings) {
        Object.keys(s).forEach((key)=>{
            this.query[key] = s[key];
        });
        this.router.navigate([], { queryParams: this.query });
    }

    clearQuery() {
        this.query = {};
        this.settings.clear();
        this.queryEventEmitter.emit({});
        this.router.navigate([], { queryParams: this.query });
    }
}