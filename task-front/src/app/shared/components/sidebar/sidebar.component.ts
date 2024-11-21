import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ){}

  singOut(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
