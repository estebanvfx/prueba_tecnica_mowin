import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ToastComponent } from '../../shared/components/ui/toast/toast.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, ToastComponent],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  showToast: boolean = false;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ){}

  register(): void{
    this.authService.register(this.name, this.email, this.password).subscribe({
      next: ()=>{
        this.showToast = true,
        setTimeout(()=>{
          this.router.navigate(['/']);
        }, 4000);
      },
      error: (error)=>{
        this.errorMessage = error.error.message;
        console.log(this.errorMessage);
      }
    });
  }
}
