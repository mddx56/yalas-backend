import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './modules/databases/databases.module';
import { DatabaseService } from './modules/databases/databases.service';
import { FacultyModule } from './modules/faculty/faculty.module';
import { FeedbackModule } from './modules/feedback/feedback.module';
import { AppLoggerModule } from './modules/logger/logger.module';
import { ReviewModule } from './modules/review/review.module';
import { SubjectModule } from './modules/subject/subject.module';
import { TeacherModule } from './modules/teacher/teacher.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: DatabaseService }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 30,
      },
    ]),
    UserModule,
    AppLoggerModule,
    DatabaseModule,
    AuthModule,
    MailerModule,
    LoggerModule,
    TeacherModule,
    SubjectModule,
    ReviewModule,
    FacultyModule,
    FeedbackModule,
  ],
  providers: [DatabaseService, { provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule { }
