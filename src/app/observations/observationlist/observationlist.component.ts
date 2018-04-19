import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { UserService } from '../../shared/service/user.service';
import { Subscription } from 'rxjs/Subscription';
import { Document } from '../../shared/model/Document';
import { ObservationService } from '../../shared/service/observation.service';
import { element } from 'protractor';
import { DatePipe } from '@angular/common';
import localeFi from '@angular/common/locales/fi';


@Component({
  selector: 'vrs-observationlist',
  templateUrl: './observationlist.component.html',
  styleUrls: ['./observationlist.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class ObservationlistComponent implements OnInit {
  @Input() id: string;
  public loading = true;
  private subTrans: Subscription;
  private pageSize: string;
  observations: Array<any> = [];
  columns = [];
  personToken: string;
  loggedIn = false;


  constructor(private translate: TranslateService, private router: Router, private observationService: ObservationService, private userService: UserService,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.loggedIn = UserService.loggedIn();
    this.subTrans = this.translate.onLangChange.subscribe(this.update.bind(this));
    this.pageSize = "20";
    if (this.loggedIn) {
      this.loading = true;
      this.personToken = UserService.getToken();
      this.update();
    } else {
      this.loader();
    }
  }

  update() {
    this.observationService.getObservationsbyPersonToken(this.personToken, this.pageSize).subscribe(data => {
      this.observations = data.results;
      console.log(this.observations);
      this.observations.forEach(observationObject => {
        observationObject.dateCreated = this.datePipe.transform(observationObject.dateCreated, 'dd.MM.yyyy HH:mm');
        observationObject.dateEdited = this.datePipe.transform(observationObject.dateEdited, 'dd.MM.yyyy HH:mm');
        observationObject.municipality = observationObject.gatherings[0].municipality;
      });
      this.columns = [
        { prop: 'dateCreated', name: this.translate.instant('document.dayOfYearBegin'), draggable: false },
        { prop: 'dateEdited', name: this.translate.instant('document.dayOfYearEdited'), draggable: false },
        { prop: 'municipality', name: this.translate.instant('document.location') }
      ];
      this.loader();
    });


  }

  onSelect(event) {
    let data = event.selected.shift();
    this.router.navigate(['form', data.formID, data.id]);
  }

  loader() {
    if (this.loading) {
      this.loading = false;
    }
  }



}
