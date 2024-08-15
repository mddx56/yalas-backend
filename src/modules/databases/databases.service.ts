import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { FacultyEntity } from '../faculty/faculty.entity';
import { FeedbackEntity } from '../feedback/feedback.entity';
import { ReviewEntity } from '../review/review.entity';
import { SubjectEntity } from '../subject/subject.entity';
import { TeacherEntity } from '../teacher/teacher.entity';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: process.env.HOST_DATABASE,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.DATABASE,
      synchronize: true,
      entities: [UserEntity, SubjectEntity, FacultyEntity, ReviewEntity, TeacherEntity, FeedbackEntity],
      logging: ['error', 'warn', 'info', 'query'],
    };
  }
}
