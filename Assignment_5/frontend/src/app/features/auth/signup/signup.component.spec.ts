import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SignupComponent } from './signup.component';
import { AuthenticationService } from 'src/app/core/services/auth/auth.service';
import { AuthGuard } from 'src/app/core/guards/auth/auth.guard';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  let mockUserAuthService: jasmine.SpyObj<AuthenticationService>;
  let mockFormBuilder: jasmine.SpyObj<FormBuilder>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockFormGroup: jasmine.SpyObj<FormGroup>;

  beforeEach(async () => {
    const user = { fullname: 'testing', isAdmin: false };
    mockUserAuthService = jasmine.createSpyObj('AuthenticationService', [
      'getCurrentUser',
    ]);
    mockUserAuthService.getCurrentUser = jasmine
      .createSpy()
      .and.returnValue(user);

    mockFormGroup = jasmine.createSpyObj('FormGroup', ['get']);
    mockFormBuilder = jasmine.createSpyObj('FormBuilder', ['group']);
    mockFormBuilder.group = jasmine.createSpy().and.returnValue(mockFormGroup);

    mockRouter = jasmine.createSpyObj('Router', ['route']);

    await TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: AuthenticationService, useValue: mockUserAuthService },
        { provide: FormBuilder, useValue: mockFormBuilder },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
