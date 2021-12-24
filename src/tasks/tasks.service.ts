import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTasksDto } from './dto/filter-tasks.dto';
import { TasksRepository } from './tasks.repository';
import { Task } from './task.entity';

@Injectable()
export class TasksService {

  constructor (
    @InjectRepository(TasksRepository)
    private taskRepository: TasksRepository
  ) {}
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  // getTasksWithFilters(filterDto: FilterTasksDto): Task[] {
  //   const { status, search } = filterDto;

  //   let tasks = this.getAllTasks();

  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }

  //   if (search) {
  //     tasks = tasks.filter((task) => {
  //       if (task.title.includes(search) || task.description.includes(search)) {
  //         return true;
  //       }

  //       return false;
  //     });
  //   }

  //   return tasks;
  // }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.taskRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Task with "${id}" not found`);
    }

    return found;
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;

  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };

  //   this.tasks.push(task);
  //   return task;
  // }

	// updateTaskStatus(id: string, status: TaskStatus): Task {
	// 	const task = this.getTaskById(id);
	// 	task.status = status;
	// 	return task;
	// }

	// deleteAllTasks(): string {
	// 	this.tasks = [];
	// 	return 'All tasks successfully deleted';
	// }

	// deleteTaskById(id: string): string {
  //   const found = this.getTaskById(id);
	// 	this.tasks = this.tasks.filter((task) => task.id !== found.id);

	// 	return 'Task successfully deleted';
	// }
}
