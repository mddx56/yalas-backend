import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { SubjectEntity } from './subject.entity';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(SubjectEntity)
    private readonly subjectRepository: Repository<SubjectEntity>,
  ) { }

  async create(createSubjectDto: CreateSubjectDto) {
    const facultyData = await this.subjectRepository.create(createSubjectDto);
    return this.subjectRepository.save(facultyData);
  }

  async findAll() {
    return await this.subjectRepository.find();
  }

  async findOne(uid: number) {
    const facultyData = await this.subjectRepository.findOneBy({ uid });
    if (!facultyData) {
      throw new HttpException('Faculty Not Found', 404);
    }
    return facultyData;
  }

  async update(id: number, updateSubjectDto: UpdateSubjectDto) {
    const existingFaculty = await this.findOne(+id);
    const facultyData = this.subjectRepository.merge(
      existingFaculty,
      updateSubjectDto,
    );
    return await this.subjectRepository.save(facultyData);
  }

  async remove(id: number) {
    const existingFaculty = await this.findOne(+id);
    return await this.subjectRepository.remove(existingFaculty);
  }
}
