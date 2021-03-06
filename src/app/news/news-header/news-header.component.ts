import {Component, Input} from '@angular/core';
import { NewsElement } from '../../shared/model';
@Component({
    selector: 'vrs-news-header',
    template: `
    <!-- Feature image header -->
    <div *ngIf='newsElement.featuredImage' class="row news-header">
        <img class="news-thumbnail rounded" src="{{newsElement.featuredImage}}">
        <div>
            <h2 class="news-title py-2 py-sm-0">{{newsElement.title}}</h2>
            <div class="news-posted p-0 p-sm-2">{{newsElement.posted | date: 'dd.MM.yyyy HH:MM' }}</div>
        </div>
        <div>
            <span class="news-tag float-right">{{newsElement.tag | translate}}</span>
            <vrs-editcms class="float-right" id="{{newsElement.id}}"></vrs-editcms>
        </div>
    </div>
    <!-- / header -->

    <!-- No feature image header -->
    <div *ngIf='!newsElement.featuredImage' class="news-header justify-content-between">
        <div>
            <h2 class="news-title">{{newsElement.title}}</h2>
            <div class="news-posted">{{newsElement.posted | date: 'dd.MM.yyyy HH:MM' }}</div>
        </div>
        <div>
            <span class="news-tag float-right">{{newsElement.tag | translate}}</span>
            <vrs-editcms class="float-right" id="{{newsElement.id}}"></vrs-editcms>
        </div>
    </div>
    <!-- / header -->
    `,
    styleUrls:['news-header.component.scss']
})
export class NewsHeaderComponent {
    @Input() newsElement: NewsElement;
    constructor() {}
}
