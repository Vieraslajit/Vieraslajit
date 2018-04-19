import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ObservationlistComponent } from './observationlist.component';
import { UserService } from '../../shared/service/user.service';
import { ObservationService } from '../../shared/service/observation.service';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { ApiService } from '../../shared/api/api.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterTestingModule } from '@angular/router/testing';
import { DatePipe } from '@angular/common';

describe('ObservationlistComponent', () => {
  let component: ObservationlistComponent;
  let fixture: ComponentFixture<ObservationlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ObservationlistComponent],
      imports: [HttpClientModule, SharedModule, TranslateModule.forRoot(), NgxDatatableModule, RouterTestingModule],
      providers: [UserService, ObservationService, ApiService, DatePipe]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservationlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
