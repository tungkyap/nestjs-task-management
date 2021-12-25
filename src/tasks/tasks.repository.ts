import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTasksDto } from './dto/filter-tasks.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {

    async getTasks(filterDto: FilterTasksDto): Promise<Task[]> {

        const { status, search } = filterDto
        const query = this.createQueryBuilder('task');

        if (status) {
            query.andWhere('task.status = :status', { status });
        }

        if (search) {
            query.andWhere(
                'task.title LIKE :search or task.description LIKE :search',
                { search: `%${search}%`}
            );
        }

        const tasks = await query.getMany();
        return tasks;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description } = createTaskDto;
    
        const task = this.create({
        title,
        description,
        status: TaskStatus.OPEN
        });

        await this.save(task);
        return task;
    }
}