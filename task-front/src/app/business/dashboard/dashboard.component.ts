import { Component } from '@angular/core';
import { CardTaskComponent } from '../../shared/components/ui/card-task/card-task.component';
import { TasksService } from '../../core/services/tasks.service';
import { ModalComponent } from '../../shared/components/ui/modal/modal.component';

interface Task {
  id_task: string;
  title: string;
  description: string;
  expiration_date: string;
  state: string;
}

interface taskData{
  title: string;
  description: string;
  expiration_date: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardTaskComponent, ModalComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  tasks: Task[] = [];
  isModalOpen: boolean = false;
  selectedTask?: Task;
  isEditing: boolean = false;

  constructor(
    private readonly tasksService: TasksService
  ){}

  ngOnInit(): void{
    this.tasksService.getTasks().subscribe(tasks => {
      this.tasks = tasks.map(tasks => ({
        ...tasks,
        expiration_date: this.formatDate(tasks.expiration_date),
      }));
    });
  }

  hasTasks():boolean{
    return this.tasks.length > 0;
  }

  deleteTask(taskId: string): void{
    this.tasksService.deleteTask(taskId).subscribe({
      next:() =>{
        this.tasks = this.tasks.filter(task => task.id_task !== taskId);
      },
      error: (err) =>{
        console.log("error al eliminar la tarea"+err);
      }
    })
  }

  toggleModal(){
    this.isModalOpen = !this.isModalOpen;
    if(!this.isModalOpen){
      this.isEditing = false;
      this.selectedTask = undefined;
      console.log("modal cerrado");
    }
  }

  onSaveTask(taskData: taskData){
    if(this.isEditing && this.selectedTask){
      console.log("editando tarea "+this.selectedTask.id_task);
      this.tasksService.updateTask(this.selectedTask.id_task, taskData.title, taskData.description, this.selectedTask.expiration_date, this.selectedTask.state).subscribe({
        next:() =>{
          this.ngOnInit();
          this.isEditing = false;
          this.selectedTask = undefined;
        },
        error: (err) =>{
          console.log("error al actualizar la tarea"+err.message);
        }
      })
    }else{
      this.tasksService.createTask(taskData).subscribe({
        next:() =>{
          this.ngOnInit();
        },
        error: (err) =>{
          console.log("error al crear la tarea"+err);
        }
      })
    }


    console.log("Ta guardada con exito "+taskData.expiration_date);
  }

  editTask(task: Task){
    console.log("editar tarea "+task.id_task+ "titulo de la tarea "+task.title);
    this.selectedTask = {...task};
    this.isEditing = true;
    this.isModalOpen = true;
  }


  private formatDate(date: string): string{
    const dateObj = new Date(date);
    const utcDate = new Date(dateObj.getTime() - (dateObj.getTimezoneOffset() * 60000));
    return utcDate.toISOString().split('T')[0];
  }
}
