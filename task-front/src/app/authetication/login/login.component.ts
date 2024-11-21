import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  login(): void{
    if (!this.email || !this.password) return;

    this.errorMessage = '';

    this.authService.login(this.email, this.password).subscribe({
      next: ()=> this.router.navigate(['/']),
      error: (err)=> {
        this.errorMessage = err.message || 'Error al intentar iniciar sesión';
      }
    })
  }

}
