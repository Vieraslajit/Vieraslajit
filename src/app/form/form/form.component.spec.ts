import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormComponent } from './form.component';
import { FormService } from '../../shared/service/form.service';
import { ApiService } from '../../shared/api/api.service';
import { HttpClientModule } from '@angular/common/http';
import { FormApiClient } from '../../shared/api/FormApiClient';
import { HttpModule } from '@angular/http';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { UserService, userProperty } from '../../shared/service/user.service';
import { DocumentService } from '../../shared/service/document.service';
import { Observable } from 'rxjs/Observable';
import { Inject, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormServiceMock } from '../../../testing/form/FormServiceMock';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/observable/of';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteStub } from '../../../testing/activated-route-stub';
import { AlertService } from '../../shared/service/alert.service';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let activatedRoute: ActivatedRouteStub;

  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpModule, RouterTestingModule, TranslateModule.forRoot()],
      declarations: [FormComponent],
      providers: [{ provide: FormService, useClass: FormServiceMock }, {
        provide: ActivatedRoute, useValue: activatedRoute
      }, ApiService, FormApiClient, TranslateService, UserService, DocumentService, AlertService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should tell user to login if not already logged in', () => {
    fixture.detectChanges();
    const p = fixture.nativeElement.querySelector('p');
    expect(p.textContent).toContain('form.login');
  });

  it('should show the form if logged in', () => {
    component.loggedIn = true;
    window.sessionStorage.setItem(userProperty.PERSON, JSON.stringify({ 'id': 'MA.000' }));
    fixture.detectChanges();
    activatedRoute.setParams({ formId: 999 });
    const title = fixture.nativeElement.querySelector('#formName').textContent;
    const description = fixture.nativeElement.querySelector('#formDesc').textContent;
    expect(title).toContain('Visake testi');
    expect(description).toContain('Tämä lomake on tarkoitettu testaamiseen');
  });
});
