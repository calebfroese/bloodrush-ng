import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [AppComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    de = fixture.debugElement;
  }));

  it('creates', async(() => {
    const app = de.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should render a router outlet', async(() => {
    const outlet = de.query(By.css('router-outlet'));
    expect(outlet).toBeTruthy();
  }));
});
