import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfluencersComponent } from './influencers.component';

describe('InfluencersComponent', () => {
  let component: InfluencersComponent;
  let fixture: ComponentFixture<InfluencersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfluencersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfluencersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
