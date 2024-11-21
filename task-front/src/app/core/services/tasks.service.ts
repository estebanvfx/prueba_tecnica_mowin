import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, tap } from 'rxjs';

interface taskData{
  title: string;
  description: string;
  expiration_date: string;
}

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private API_URL = 'http://localhost:3000/api/v1/';

  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  getTasks(): Observable<any[]>{
    return this.httpClient.get<any[]>(this.API_URL+"tasks");
  }

  deleteTask(id_task: string): Observable<any>{
    return this.httpClient.delete<any>(this.API_URL+"tasks/"+id_task).pipe(
      tap(response => {
        if(response.status === 200){
          console.log("tarea eliminada con exito")
        }
      })
    );
  }


  updateTask(id_task: string, title: string, description: string, expiration_date: string, state: string): Observable<any>{
    return this.httpClient.patch<any>(this.API_URL+"tasks/"+id_task, { title, description, expiration_date, state }).pipe(
      tap(response => {
        if(response.status === 200){
          console.log("tarea actualizada con exito")
        }
      })
    );
  }


  createTask(taskData: taskData): Observable<any>{
    return this.httpClient.post<any>(this.API_URL+"tasks", taskData).pipe(
      tap(response =>{
        if(response.status === 201){
          console.log("tarea creada con exito")
        }
      })
    )
  }
}
