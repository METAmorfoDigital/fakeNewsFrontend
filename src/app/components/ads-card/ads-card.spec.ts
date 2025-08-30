import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsCard } from './ads-card';

describe('AdsCard', () => {
  let component: AdsCard;
  let fixture: ComponentFixture<AdsCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdsCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdsCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
