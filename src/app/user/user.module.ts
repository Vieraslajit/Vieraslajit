import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { UserRoutingModule } from './user-routing.module';
import { UserService } from '../shared/service/user.service';
import { SpinnerModule } from './../shared-modules/spinner/spinner.module';

/**
 * Handles components related to user related operations. Sessions are
 * managed by shared/services/UserService, not the UserModule.
 */

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    SpinnerModule
  ],
  declarations: [LoginComponent],
  providers: []
})
export class UserModule { }
