import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfluencersDetailComponent } from './influencers-detail.component';

describe('InfluencersDetailComponent', () => {
  let component: InfluencersDetailComponent;
  let fixture: ComponentFixture<InfluencersDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfluencersDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfluencersDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
