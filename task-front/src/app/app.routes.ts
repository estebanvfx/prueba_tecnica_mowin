import { Routes } from '@angular/router';
import { LoginComponent } from './authetication/login/login.component';
import { RegisterComponent } from './authetication/register/register.component';
import { AppComponent } from './app.component';
import { authGuard } from './core/guards/auth.guard';
import { authenticatedGuard } from './core/guards/authenticated.guard';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { DashboardComponent } from './business/dashboard/dashboard.component';
import { TasksComponent } from './business/tasks/tasks.component';

export const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [authenticatedGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [authenticatedGuard]},


  {path: '', component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'tasks', component: TasksComponent},
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    ],
  },

  {path: '**', redirectTo: 'login', pathMatch: 'full'},
];
