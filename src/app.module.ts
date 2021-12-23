import { Module } from '@nestjs/common';
<<<<<<< HEAD
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
=======
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [TasksModule],
>>>>>>> 6274d7e0a8ef5906982d64ffa1fe1a53af64db9c
})
export class AppModule {}
