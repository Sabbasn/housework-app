import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekdaySelectorComponent } from './weekday-selector.component';

describe('WeekdaySelectorComponent', () => {
  let component: WeekdaySelectorComponent;
  let fixture: ComponentFixture<WeekdaySelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeekdaySelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeekdaySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
