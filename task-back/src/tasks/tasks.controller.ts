import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, NotFoundException } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createTaskDto: CreateTaskDto, @Request() req) {
    return this.tasksService.create(createTaskDto, req.user.id);
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAllUserTasks(@Request() req) {
    return await this.tasksService.findAllUserTasks(req.user.id);
  }

  @Get(':id')
  @UseGuards(AuthGuard)	
  async findOne(@Param('id') id: number, @Request() req) {    
    return await this.tasksService.findOne(id, req.user.id);
  }


  
  @Patch(':id')
  @UseGuards(AuthGuard)
  async update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto, @Request() req) {
    return await this.tasksService.update(id, updateTaskDto, req.user.id);
  }

 
  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: number, @Request() req) {
    return this.tasksService.remove(id, req.user.id);
  }
}
