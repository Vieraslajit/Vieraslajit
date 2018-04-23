import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StaticModule } from '../../static/static.module';
import { FilistobligationsComponent } from './filistobligations.component';
import { TranslateModule } from '@ngx-translate/core';
import { InformationService } from '../../shared/service/information.service';
import { ApiService } from '../../shared/api/api.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('FilistobligationsComponent', () => {
  let component: FilistobligationsComponent;
  let fixture: ComponentFixture<FilistobligationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilistobligationsComponent ],
      imports: [TranslateModule.forRoot(),StaticModule,HttpClientModule,RouterTestingModule],
      providers:[InformationService,ApiService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilistobligationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
