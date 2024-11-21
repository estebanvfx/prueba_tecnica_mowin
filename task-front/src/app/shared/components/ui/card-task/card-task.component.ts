import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../../../../core/services/tasks.service';
import { Router, RouterModule } from '@angular/router';

interface Task {
  id_task: string;
  title: string;
  description: string;
  expiration_date: string;
  state: string;
}

@Component({
  selector: 'app-card-task',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './card-task.component.html',
})
export class CardTaskComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() expiration_date: string = '';
  @Input() state: string = '';
  @Input() id_task: string = '';
  @Output() onTaskDeleted = new EventEmitter<string>();
  @Output() onTaskUpdated = new EventEmitter<Task>();

  constructor(
    private readonly tasksService: TasksService
  ){}


  deletetTask(){
    this.onTaskDeleted.emit(this.id_task);
    console.log("eliminar tarea "+this.id_task);
  }



  updateTask() {
    const task: Task ={
      id_task: this.id_task,
      title: this.title,
      description: this.description,
      expiration_date: this.expiration_date,
      state: this.state,
    }
    this.onTaskUpdated.emit(task);
  }

  onStatusChange(newStatus: string){
    this.state = newStatus;
    this.tasksService.updateTask(this.id_task, this.title, this.description, this.expiration_date, this.state).subscribe({
      next:() =>{
        console.log("tarea actualizada con exito"+this.state, this.id_task)
      },
      error: (err) =>{
        console.log("error al actualizar la tarea"+err);
      }
    });
  }

  getSelectClasses(): string {
    const baseClasses = ' mt-1 text-center text-sm rounded-full block w-full px-3 font-semibold appearance-none focus:outline-none cursor-pointer';

    switch(this.state) {
      case 'pending':
        return `${baseClasses} bg-gray-300 text-black border border-gray-300`;
      case 'progress':
        return `${baseClasses} bg-[#E65F2B]/30 text-[#E65F2B] border border-transparent`;
      case 'done':
        return `${baseClasses} bg-[#1A932E]/20 text-[#1A932E] border border-transparent`;
      default:
        return baseClasses;
    }
  }
}
