import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTasksDto } from './dto/filter-tasks.dto';
import { TasksRepository } from './tasks.repository';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {

  constructor (
    @InjectRepository(TasksRepository)
    private taskRepository: TasksRepository
  ) {}
  
  // async getAllTasks(): Promise<Task> {
  //   return this.taskRepository.query('SELECT * FROM task');
  // }

  getTasks(filterDto: FilterTasksDto, user: User): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto, user);
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    // const found = await this.taskRepository.findOne(id);
    const found = await this.taskRepository.findOne({ where: { id, user }});

    if (!found) {
      throw new NotFoundException(`Task with "${id}" not found`);
    }

    return found;
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
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

	async updateTaskStatus(id: string, status: TaskStatus, user: User): Promise<Task> {
		const task = await this.getTaskById(id, user);
		task.status = status
    
    await this.taskRepository.save(task);
    
		return task;
	}

	// deleteAllTasks(): string {
	// 	this.tasks = [];
	// 	return 'All tasks successfully deleted';
	// }

	async deleteTaskById(id: string, user: User): Promise<void> {
    const result = await this.taskRepository.delete({ id, user });
    
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found!`);
    }
	}
}
