import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, ReplaySubject, tap } from 'rxjs';
import { User } from 'src/app/core/user/user.types';
import { UserService } from './user.service';


describe('UserService', () => {
  let _user: ReplaySubject<User>;
  let _httpClient: HttpClient;
  
  beforeEach(() => {
    _user = jasmine.createSpyObj(['next']);
  });

  it('expect user service to be truthy', () => {
    const _userService = new UserService(_httpClient);
    expect(_userService).toBeTruthy();
  });
})

