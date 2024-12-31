import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { NavbarComponent } from './auth/navbar/navbar.component';
import { SignupComponent } from './auth/signup/signup.component';
import { NotFoundComponent } from './auth/not-found/not-found.component';
// import { AuthGuard } from './guard/auth.guard';
const routes: Routes = [
  {
    path: 'navbar',
    component: NavbarComponent,
    data: {
      title: 'navbar'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'login'
    }
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: {
      title: 'signup'
    }
  },
  {
    path: 'admin',
    // canActivate: [AuthGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    data: { roles: ['ADMIN'] }
    
  },
  {
    path: 'user',
    // canActivate: [AuthGuard],
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    data: { roles: ['USER'] }
    
  },

  {
    path: '', 
    redirectTo: '/navbar', 
    pathMatch: 'full'
  },
  // {
  //   path: '**',
  //   component: NotFoundComponent,
  //   data: {
  //     title: 'page not found'
  //   }
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
