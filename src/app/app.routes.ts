import { Routes } from '@angular/router';
import { register } from 'module';
import { HeaderComponent } from './layouts/header/header.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { LandingComponent } from './pages/landing/landing.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: '',
        component: HeaderComponent,
        children: [
          { path: 'login', component: LoginComponent},
          { path: 'register', component: RegisterComponent},
          {path: '', component: LandingComponent},
          {path: 'dashboard', component: DashboardComponent},
          {path: '', redirectTo: 'login', pathMatch: 'full'}
        ]
    },
];
