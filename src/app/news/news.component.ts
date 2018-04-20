import { Component, OnInit, OnDestroy } from '@angular/core';
import { NewsService } from '../shared/service/news.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/Subscription';
import { NewsElement } from '../shared/model/NewsElement';
import { PagedResult } from '../shared/model/PagedResult';


@Component({
  selector: 'vrs-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit, OnDestroy {
  
  private subTrans: Subscription;
  private data: PagedResult<NewsElement>;
  news: Array<NewsElement> = [];
  pages: Array<number> = [];
  private pageSize: number = 5;
  private currentTags: string;
  private imageToDisplay: string;

  constructor(private newsService: NewsService, private translate: TranslateService) { }

  ngOnInit() {
    this.subTrans= this.translate.onLangChange.subscribe((event) =>{
      this.getNews("1",this.currentTags);
  });
    this.getNews("1","vieraslajit.fi");
  }

  getNews(page:string, tags:string) {
    this.currentTags=tags;
    this.newsService.getPage(page,this.pageSize.toString(), this.translate.currentLang, tags)
    .subscribe((data) => {
      this.news = data.results;
      this.data = data;
      this.pages = [];
      for(let i = 0; i < data.lastPage; i++) {
        this.pages.push(i+1);
      }
    });
  }

  getImageToDisplay(newsElement: NewsElement){
    if(newsElement.hasOwnProperty("featuredImage")){
      this.imageToDisplay=newsElement.featuredImage;
    } else {
      this.imageToDisplay= "https://media.istockphoto.com/photos/sunrise-on-yosemite-valley-picture-id505872990?k=6&m=505872990&s=612x612&w=0&h=XcdHhkC9PF9-saYT6n_GQD-0Hf8dbI_Q4wfYlZZGpNk=";
    } 
    return this.imageToDisplay;
  }

  ngOnDestroy(){
    this.subTrans.unsubscribe();
  }

}