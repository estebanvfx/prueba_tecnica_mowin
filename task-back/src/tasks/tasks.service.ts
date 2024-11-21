import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
  ) {}

  //logica de crear una tarea
  async create(createTaskDto: CreateTaskDto, id: number) {
    return await this.tasksRepository.save({
      ...createTaskDto,
      userId: id
    });
  }

  //logica de busqueda de tareas de un usuario
  async findAllUserTasks(id: number) {
    const tasks = await this.tasksRepository.findBy({userId: id});
    return tasks.length ? tasks : "No tasks to display"
  }


  //logica para la busqueda de una tarea
  async findOne(id_task: number, id_user: number) {
    const task = await this.tasksRepository.findOneBy({id_task, userId: id_user});
    if(!task){
      throw new NotFoundException('Task not found')
    }
    return task;
  }

  //logica para actualizar una tarea
  async update(id_task: number, updateTaskDto: UpdateTaskDto, id_user: number) {
    const existTask = await this.findOne(id_task, id_user);
    if(!existTask){
      throw new NotFoundException('Task not found')
    }
    return await this.tasksRepository.update({id_task, userId: id_user}, updateTaskDto);
  }

  //logica para eliminar una tarea
  async remove(id_task: number, id_user: number) {
    const existTask = await this.findOne(id_task, id_user);
    if(!existTask){
      throw new NotFoundException('Task not found cannot be deleted')
    }
    return await this.tasksRepository.softDelete({id_task, userId: id_user});
  }
}
