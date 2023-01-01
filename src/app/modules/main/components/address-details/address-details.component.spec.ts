import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AddressDetailsComponent } from './address-details.component';

describe('AddressDetailsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AddressDetailsComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AddressDetailsComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
