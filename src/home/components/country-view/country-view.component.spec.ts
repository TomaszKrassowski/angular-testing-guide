import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryViewComponent } from './country-view.component';

describe('CountryViewComponent', () => {
  let component: CountryViewComponent;
  let fixture: ComponentFixture<CountryViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display div with loader message when service has not yet emitted value', () => {
    expect(component).toBeTruthy();
  });

   it('should display div with emitted IP and country name when service has emitted value', () => {
    expect(component).toBeTruthy();
  });
});
