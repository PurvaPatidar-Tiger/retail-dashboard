import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BasicComponent } from './basic.component';
import { AuthenticationService } from 'src/app/core/services/auth/auth.service';
import { AuthGuard } from 'src/app/core/guards/auth/auth.guard';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatMenuModule } from '@angular/material/menu';

describe('BasicComponent', () => {
  let component: BasicComponent;
  let fixture: ComponentFixture<BasicComponent>;
  let mockUserAuthService: jasmine.SpyObj<AuthenticationService>;
  let mockAuthGuard: jasmine.SpyObj<AuthGuard>;

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

    await TestBed.configureTestingModule({
      declarations: [BasicComponent],
      imports: [HttpClientTestingModule, MatMenuModule],
      providers: [
        { provide: AuthenticationService, useValue: mockUserAuthService },
        { provide: AuthGuard, useValue: mockAuthGuard },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });
});
