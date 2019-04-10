import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyaltyCockpitWidgetComponent } from './loyalty-cockpit-widget.component';

describe('LoyaltyCockpitWidgetComponent', () => {
  let component: LoyaltyCockpitWidgetComponent;
  let fixture: ComponentFixture<LoyaltyCockpitWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoyaltyCockpitWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyaltyCockpitWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
