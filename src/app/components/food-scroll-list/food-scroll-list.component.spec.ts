import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodScrollListComponent } from './food-scroll-list.component';

describe('FoodScrollListComponent', () => {
  let component: FoodScrollListComponent;
  let fixture: ComponentFixture<FoodScrollListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FoodScrollListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FoodScrollListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
