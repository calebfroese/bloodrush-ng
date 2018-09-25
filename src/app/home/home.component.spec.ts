import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Store, StoreModule } from '@ngrx/store';

import { MaterialModule } from '../material.module';
import { Logout } from '../user/actions/user.actions';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let store: Store<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), MaterialModule],
      declarations: [HomeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('has a toolbar that contains the app logo', () => {
    const toolbar = fixture.debugElement.query(By.css('mat-toolbar'));
    const logo = toolbar.query(By.css('img'));
    expect(logo).toBeTruthy();
    expect(toolbar.nativeElement.textContent).toContain('Beta');
  });

  it('logout button dispatches log out event', () => {
    const logoutButton = fixture.debugElement
      .queryAll(By.css('button'))
      .find(btn => btn.nativeElement.textContent === 'Logout');
    expect(logoutButton).toBeTruthy();
    logoutButton.nativeElement.click();
    expect(store.dispatch).toHaveBeenCalledWith(new Logout());
  });
});
