import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherPreloaderComponent } from './weather-preloader.component';

describe('WeatherPreloaderComponent', () => {
  let component: WeatherPreloaderComponent;
  let fixture: ComponentFixture<WeatherPreloaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherPreloaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherPreloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
