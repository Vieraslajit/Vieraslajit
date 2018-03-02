import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import{SharedModule} from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NewsService } from '../shared/service/news.service';
import { ApiService } from '../shared/api/api.service';
import { TaxonService } from '../shared/service/taxon.service';
import { HttpClientModule } from '@angular/common/http';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports:[SharedModule, HttpClientModule, TranslateModule.forRoot(),FormsModule, RouterTestingModule],
      providers:[NewsService, ApiService, TranslateService,TaxonService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
