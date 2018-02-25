import { Component, OnInit } from '@angular/core';
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
export class NewsComponent implements OnInit {

  //private data: PagedResult<NewsElement>;
  private news: Array<NewsElement> = [];
  private newsView: Array<NewsElement>= [];
  private subTrans: Subscription;
  private pages: Array<number> = [1,2,3]
  private pageSizeFetch = 50;
  private pageSizeView=5;
  private fetchedTimes: number=0;
  /* MI: Koska API:sta ei voi hakea uutisia tagilla, on haettava yli halutun uutismäärän/sivu,
  jotta saadaan uutissivulle haluttu määrä vieraslajiuutisia ilman toistuvia API-hakuja, kun osa haetuista
  uutisista suodatetaan pois ja "sivu jää vajaaksi".
  Tämä tarkoittaa käytännössä, että menetetään API:n ominaisuus tuoda uutiset valmiiksi sivutettuna eli 
  voisi myös kysyä asiakkaalta, saisiko API:in suodatuksen tagilla (ja päivämäärällä)!
  Mietin myös uutisdatan hakua kaikki kerralla, jolloin olisi voinut pitää ui:ssa tiedon sivujen määrästä.
  Tällä hetkellä suomeksi "vain" n.220 uutisobjetkia, muttei ehkä se skaalautuvin ratkaisu
  */

  constructor(private newsService: NewsService, private translate: TranslateService) { }

  ngOnInit() {
    this.subTrans = this.translate.onLangChange.subscribe(this.getNews.bind(this));
    this.getNews(1);
  }

  getNews(pageAPI) {
    this.newsService.getPage(pageAPI, this.pageSizeFetch.toString(), this.translate.currentLang).subscribe((data) => {

     /* 
      laji.fi API:ista ei vielä tule "vieraslajit.fi" tagilla uutisia joissa contentia (vain externalUrl) 
      tarviiko välttämättä näyttää vanhoja teknisiä tiedotteita mutta nyt vielä tässä jotta on testattavana
      newsElementtejä joissa on contentia.
      */
      this.news= data.results
        .filter(newsElement => newsElement.tag.includes(("technical")) || newsElement.tag.includes(("vieraslajit.fi")));
      
      this.fetchedTimes++;
      
      if (this.fetchedTimes==1){
      this.populateView(pageAPI);
      }
      /* 
      this.data = data;
      for(let i = 0; i < data.lastPage; i++) {
        this.pages.push(i+1); 
    }*/ 

    });
  }

  previous(){
    let current = this.pages.length;
    this.pages.pop();
    this.populateView(current-1);
  }

  next(){
    let nextPage= this.pages.length+1;
    this.pages.push(nextPage);
    this.populateView(nextPage);
  }

  populateView(pageView){
    let newsNeeded= this.pageSizeView * pageView;

    if (this.news.length < newsNeeded){
      this.getNews(this.fetchedTimes+1);
    }
    this.newsView= this.news.slice(newsNeeded-this.pageSizeView,newsNeeded);  
  }

}
