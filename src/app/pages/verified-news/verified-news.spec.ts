import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifiedNews } from './verified-news';

describe('VerifiedNews', () => {
  let component: VerifiedNews;
  let fixture: ComponentFixture<VerifiedNews>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifiedNews]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifiedNews);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
