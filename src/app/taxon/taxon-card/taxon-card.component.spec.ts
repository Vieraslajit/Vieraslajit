import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { TaxonCardComponent } from './taxon-card.component';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

describe('TaxonCardComponent', () => {
  let component: TaxonCardComponent;
  let fixture: ComponentFixture<TaxonCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxonCardComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: Observable.of({id: 123})
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxonCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});