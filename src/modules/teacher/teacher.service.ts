import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { TeacherEntity } from './teacher.entity';

@Injectable()
export class TeacherService {

  constructor(
    @InjectRepository(TeacherEntity)
    private readonly teacherRepository: Repository<TeacherEntity>,
  ) { }

  async create(createTeacherDto: CreateTeacherDto) {
    const teacherData = await this.teacherRepository.create(createTeacherDto);
    return this.teacherRepository.save(teacherData);
  }

  async findAll() {
    return await this.teacherRepository.find();
  }

  async findOne(uid: number): Promise<TeacherEntity> {
    const teacherData =
      await this.teacherRepository.findOneBy({ uid });
    if (!teacherData) {
      throw new HttpException(
        'Teacher Not Found',
        404,
      );
    }
    return teacherData;
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto) {
    const existingTeacher = await this.findOne(id);
    const teacherData = this.teacherRepository.merge(
      existingTeacher,
      updateTeacherDto,
    );
    return await this.teacherRepository.save(
      teacherData,
    );
  }

  async remove(id: number) {
    const existingTeacher = await this.findOne(id);
    return await this.teacherRepository.remove(
      existingTeacher,
    );
  }
}
