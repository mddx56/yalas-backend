import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';
import { NodemailerModule } from '../nodemailer/nodemailer.module';
import { NodemailerService } from '../nodemailer/nodemailer.service';
import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), NodemailerModule],
  controllers: [UserController],
  providers: [UserService, AuthService, NodemailerService],
})
export class UserModule { }
