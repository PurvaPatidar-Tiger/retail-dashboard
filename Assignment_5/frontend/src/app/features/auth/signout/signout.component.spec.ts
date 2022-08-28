import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SignoutComponent } from './signout.component';
import { AuthenticationService } from 'src/app/core/services/auth/auth.service';
import { AuthGuard } from 'src/app/core/guards/auth/auth.guard';
import { Router } from '@angular/router';

describe('SignoutComponent', () => {
  let component: SignoutComponent;
  let fixture: ComponentFixture<SignoutComponent>;

  let mockUserAuthService: jasmine.SpyObj<AuthenticationService>;
  let mockAuthGuard: jasmine.SpyObj<AuthGuard>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const user = { fullname: 'testing', isAdmin: false };
    mockUserAuthService = jasmine.createSpyObj('AuthenticationService', [
      'getCurrentUser',
    ]);
    mockUserAuthService.getCurrentUser = jasmine
      .createSpy()
      .and.returnValue(user);

    mockAuthGuard = jasmine.createSpyObj('AuthGuard', ['canActivate']);
    mockAuthGuard.canActivate = jasmine.createSpy().and.returnValue(true);

    mockRouter = jasmine.createSpyObj('Router', ['route']);

    await TestBed.configureTestingModule({
      declarations: [SignoutComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: AuthenticationService, useValue: mockUserAuthService },
        { provide: AuthGuard, useValue: mockAuthGuard },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
