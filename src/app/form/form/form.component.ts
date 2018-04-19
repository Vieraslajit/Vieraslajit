import {
  Component, OnDestroy, ElementRef, Inject, ViewEncapsulation,
  ViewChild, AfterViewInit, Output, NgZone, EventEmitter,
  ChangeDetectorRef, ChangeDetectionStrategy, SimpleChanges
} from '@angular/core';
import { FormService } from '../../shared/service/form.service';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import LajiForm from 'laji-form/lib/laji-form';
import { FormApiClient } from '../../shared/api/FormApiClient';
import { TranslateService } from '@ngx-translate/core';
import { UserService, Role } from '../../shared/service/user.service';
import { DocumentService } from '../../shared/service/document.service';
import { ObservationService } from '../../shared/service/observation.service';

@Component({
  selector: 'vrs-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements AfterViewInit, OnDestroy {
  @ViewChild('lajiform') formElem: ElementRef;

  private sub: Subscription;
  private subTrans: Subscription;
  private id: string;
  private documentId: string;
  private personToken: string;
  private edit = false;

  formData: any;
  documentData: any;
  lajiFormWrapper: any;
  lang: string;
  loggedIn = false;

  constructor(@Inject(ElementRef) elementRef: ElementRef,
    private formService: FormService, private apiClient: FormApiClient, private docService: DocumentService,
    private route: ActivatedRoute, private router: Router, private translate: TranslateService,
    private userService: UserService, private ngZone: NgZone, private cd: ChangeDetectorRef,
    private el: ElementRef) {
    this.loggedIn = UserService.loggedIn();
  }

  ngAfterViewInit() {
    this.subTrans = this.translate.onLangChange.subscribe(() => this.onLangChange());
    if (this.loggedIn) {
      this.personToken = UserService.getToken();
      this.sub = this.route.params.subscribe(params => {
        this.id = params['formId'];
        this.documentId = params['documentId'];
        if (this.documentId) {
          this.initFormWithDocument();
        } else {
          this.initForm();
        }
      });
    }
  }

  initForm() {
    this.formService.getFormById(this.id, this.translate.currentLang).subscribe(data => {
      this.formData = data;
      console.log(data);
      this.setFormDescription();
      this.ngZone.runOutsideAngular(() => {
        this.apiClient.lang = this.translate.currentLang;
        this.initFormData();
        this.initSchemaContext();
        this.apiClient.personToken = this.personToken;
        this.lajiFormWrapper = new LajiForm({
          staticImgPath: '/static/lajiForm/',
          rootElem: this.formElem.nativeElement,
          schema: this.formData.schema,
          uiSchema: this.formData.uiSchema,
          uiSchemaContext: this.formData.uiSchemaContext,
          formData: this.formData.formData,
          validators: this.formData.validators,
          warnings: this.formData.warnings,
          onSubmit: this._onSubmit.bind(this),
          onChange: this._onChange.bind(this),
          onSettingsChange: this._onSettingsChange.bind(this),
          settings: undefined,
          apiClient: this.apiClient,
          lang: this.translate.currentLang,
          renderSubmit: false,
          topOffset: 50,
          bottomOffset: 50
        });
      });
    });
  }

  initFormWithDocument() {
    this.formService.loadFormWithDocument(this.id, this.translate.currentLang, this.documentId, this.personToken).subscribe(() => {
      this.edit = true;
      this.initForm();
    });
  }

  onLangChange() {
    this.lajiFormWrapper.setState({ lang: this.translate.currentLang });
    this.formService
      .getFormById(this.id, this.translate.currentLang)
      .subscribe(form => {
        form['formData'] = this.formData.formData;
        this.lang = this.translate.currentLang;
        this.formData = form;
        this.setFormDescription();
        this.lajiFormWrapper.setState({
          schema: this.formData.schema,
          uiSchema: this.formData.uiSchema,
          formData: this.formData.formData,
          validators: this.formData.validators,
          warnings: this.formData.warnings
        });
      });
  }
  private initSchemaContext() {
    this.formData.uiSchemaContext = {};
    this.formData.uiSchemaContext.formID = this.id;
    this.formData.uiSchemaContext['creator'] = UserService.getUserId();
    this.formData.uiSchemaContext.isAdmin = UserService.hasRole(Role.CMS_ADMIN);
  }

  private initFormData() {
    if (!this.formData.formData) {
      this.formData.formData = { gatheringEvent: { leg: [UserService.getUserId()] } };
    }
  }

  private setFormDescription() {
    document.getElementById('formName').textContent = this.formData.title;
    document.getElementById('formDesc').innerHTML = this.formData.description;
  }

  _onSettingsChange(settings: object) {
    console.log(settings);
  }

  _onChange(formData) {
    this.formData.formData = formData;
  }

  submit() {
    if (this.lajiFormWrapper) {
      this.formData.formData['formID'] = this.id;
      this.ngZone.runOutsideAngular(() => {
        this.lajiFormWrapper.submit();
      });
    }
  }

  _onSubmit(data) {
    this.ngZone.run(() => {
      const doc$ = this.edit ?
        this.docService.updateDocument(this.documentId, this.formData.formData, this.personToken) :
        this.docService.createDocument(this.personToken, this.formData.formData);
      doc$.subscribe(
        (result) => {
          console.log('Result');
          console.log(result);
          /* Onnistuneen lähetyksen jälkeen ohjaa käyttäjä havainnot sivulle
          ja näytä onnistumisviesti (alert tms.).*/
          this.router.navigate(['observations']);
        },
        (error) => {
          console.log('Error');
          console.log(error);
        }
      );
    });
  }

  ngOnDestroy() {
    this.subTrans.unsubscribe();
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
