import { NgClass } from '@angular/common';
import { Component, EventEmitter, input, Input, Output, SimpleChanges } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

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
  selector: 'app-modal',
  standalone: true,
  imports: [NgClass, FormsModule],
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  @Input() isModalOpen: boolean = false;
  @Output() isModalOpenChange = new EventEmitter<boolean>();
  @Output() saveTask = new EventEmitter<taskData>();
  @Input() task!: Task;
  @Input() isEditing: boolean = false;

  taskData: taskData = {
    title: '',
    description: '',
    expiration_date: '',
  }


  ngOnChanges(changes: SimpleChanges){
    if(changes['task'] && this.task && this.isModalOpen && this.isEditing){
      console.log("cambios en modal para mirar el date" + this.task.expiration_date);
      this.taskData = {
        title: this.task.title,
        description: this.task.description,
        expiration_date: this.task.expiration_date,
      }
      console.log("cambios en modal ");
    }
  }

  toggleModal(){
    this.isModalOpen = !this.isModalOpen;
    if(!this.isModalOpen){
      this.taskData = {
        title: '',
        description: '',
        expiration_date: '',
      }
    }
    this.isModalOpenChange.emit(this.isModalOpen);
  }


  onSubmit(form: NgForm){
    this.saveTask.emit(this.taskData);
    this.toggleModal();
    form.reset();
  }

}
