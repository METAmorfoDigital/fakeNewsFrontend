import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardInstructions } from './card-instructions';

describe('CardInstructions', () => {
  let component: CardInstructions;
  let fixture: ComponentFixture<CardInstructions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardInstructions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardInstructions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
