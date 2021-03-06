import { Component, Input } from "@angular/core";

@Component({
    selector: `vrs-topical-species`,
    template: `
<div id="important">
<h2>Ajankohtaiset lajit</h2>
<p>Seuraavien Suomessa tavattujen vieraslajien havainnoista olisi erityisen tärkeää ilmoittaa:</p>
<div class="list-container">
    <span class="oi oi-chevron-left" [ngClass]="{'disabled': this.currentPage <= 0}" (click)="backward()"></span>
    <ul>
        <li *ngFor="let taxon of taxa" [routerLink]="'/taxon/' + taxon.id">
            <img [src]="taxon.multimedia[0].fullURL" alt="">
            <div>{{taxon.vernacularName | capitalize}}</div>
        </li>
    </ul>
    <span class="oi oi-chevron-right" [ngClass]="{'disabled': isLastPage()}" (click)="forward()"></span>
</div>
<div class="pagination-dots">
    <span *ngFor="let page of pagedTaxa; let i = index" class="oi oi-media-record" [ngClass]="{'active': this.currentPage === i}" (click)="gotoPage(i)"></span>
</div>
</div>
    `,
    styleUrls: [`./topical-species.component.scss`]
})
export class TopicalSpeciesComponent {
    @Input()
    set taxa(taxa: any[]) {
        this.pagedTaxa = [[]];
        const pageSize = 4;
        let pageIndex = 0;
        taxa.forEach((taxa, index) => {
            if (index + 1 > (pageIndex + 1) * pageSize) {
                this.pagedTaxa.push([]);
                pageIndex++;
            }
            this.pagedTaxa[pageIndex].push(taxa);
        });
    }
    get taxa() {
        return this.pagedTaxa[this.currentPage];
    }
    pagedTaxa: any[][] = [[]];

    currentPage: number = 0;

    forward() {
        if(!this.isLastPage()) {
            this.currentPage++;
        }
    }

    backward() {
        if (this.currentPage > 0) {
            this.currentPage--;
        }
    }

    gotoPage(p: number) {
        this.currentPage = p;
    }

    isLastPage() {
        return this.currentPage >= this.pagedTaxa.length - 1;
    }
}