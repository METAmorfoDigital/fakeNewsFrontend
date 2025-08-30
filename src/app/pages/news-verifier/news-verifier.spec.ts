import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsVerifier } from './news-verifier';

describe('NewsVerifier', () => {
  let component: NewsVerifier;
  let fixture: ComponentFixture<NewsVerifier>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsVerifier]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsVerifier);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
