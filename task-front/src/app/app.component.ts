import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from './authetication/login/login.component';
import { RegisterComponent } from './authetication/register/register.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { ModalComponent } from './shared/components/ui/modal/modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Mi primera app';
}
