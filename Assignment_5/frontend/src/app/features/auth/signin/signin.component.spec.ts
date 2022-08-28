import { ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import {
  FormBuilder,
  FormsModule,
  FormGroup,
  ReactiveFormsModule,
  FormControl,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/auth/auth.service';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { SigninComponent } from './signin.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, ActivatedRoute } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, Observable, throwError } from 'rxjs';
import {Injector} from "@angular/core";

let translations: any = {"CARDS_TITLE": "This is a test"};

class FakeLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of(translations);
  }
}

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;
  let mockUserAuthService: jasmine.SpyObj<AuthenticationService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: jasmine.SpyObj<ActivatedRoute>;
  let mockFormBuilder: jasmine.SpyObj<FormBuilder>;
  let testFormGroup: FormGroup;
  let mockTranslateService: jasmine.SpyObj<TranslateService>;
  let translate: TranslateService;
  let injector: Injector;
  
  beforeEach(async () => {
    const user = { fullname: 'testing', isAdmin: false };
    mockUserAuthService = jasmine.createSpyObj('AuthenticationService', [
      'getCurrentUser', 'signIn'
    ]);
    mockUserAuthService.getCurrentUser = jasmine
      .createSpy()
      .and.returnValue(user);
    
    mockUserAuthService.signIn = jasmine
      .createSpy()
      .and.returnValue(of(user));
    
    mockRouter = jasmine.createSpyObj('Router', ['route']);
    mockActivatedRoute = jasmine.createSpyObj('ActivatedRoute', ['snapshot']);
    
    mockTranslateService = jasmine.createSpyObj('TranslateService', ['get', 'instant']);
    

    testFormGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      rememberMe: new FormControl(''),
    });

    mockFormBuilder = jasmine.createSpyObj('FormBuilder', [
      'group',
      'registerOnChange',
    ]);
    mockFormBuilder.group = jasmine.createSpy().and.returnValue(testFormGroup);

    await TestBed.configureTestingModule({
      declarations: [SigninComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: FakeLoader }
    })
      ],
      providers: [
        { provide: AuthenticationService, useValue: mockUserAuthService },
        { provide: FormBuilder, useValue: mockFormBuilder },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        //{ provide: TranslateService, useValue: translateServiceMock}
      ],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    component.signInForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
      rememberMe: new FormControl(''),
    });
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('it should update form changes', () => {
    const testUser = {
      email: 'test@test.com',
      password: '1234567'
    };
    component.signInForm.controls['email'].setValue(testUser.email);
    component.signInForm.controls['password'].setValue(testUser.password);
    component.signIn()
    expect(component).toBeTruthy();
  });
  it('component signin should be undefined', () => {
    const testUser = {
      email: 'test@test.com',
      password: '1234567'
    };
    mockUserAuthService.signIn = jasmine
      .createSpy()
      .and.returnValue(of('Error'));
    component.signInForm.controls['email'].setValue(testUser.email);
    component.signInForm.controls['password'].setValue(testUser.password);
    component.signIn()
    expect(component.signIn()).toBeUndefined();
  });
  it('invalid email id', () => {
    const testUser = {
      email: 'test',
      password: '12345'
    };
    component.signInForm.reset()
    component.signInForm.controls['email'].setValue(testUser.email);
    component.signInForm.controls['password'].setValue(testUser.password);
    fixture.detectChanges();
    expect(component.signInForm.controls['email'].hasError('email')).toBeTrue();
    expect(component.signInForm.controls['password'].hasError('password')).toBeFalse();
  });
});
