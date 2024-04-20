import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignatureDishComponent } from './signature-dish.component';

describe('SignatureDishComponent', () => {
  let component: SignatureDishComponent;
  let fixture: ComponentFixture<SignatureDishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignatureDishComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignatureDishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
