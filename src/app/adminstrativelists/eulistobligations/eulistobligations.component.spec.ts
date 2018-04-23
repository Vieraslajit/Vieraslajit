import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { EulistobligationsComponent } from './eulistobligations.component';
import { StaticModule } from '../../static/static.module';
import { InformationService } from '../../shared/service/information.service';
import { ApiService } from '../../shared/api/api.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('EulistobligationsComponent', () => {
  let component: EulistobligationsComponent;
  let fixture: ComponentFixture<EulistobligationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EulistobligationsComponent ],
      imports: [TranslateModule.forRoot(),StaticModule,HttpClientModule,RouterTestingModule],
      providers:[InformationService,ApiService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EulistobligationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
