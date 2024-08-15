import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFacultyDto } from './dto/create-faculty.dto';
import { UpdateFacultyDto } from './dto/update-faculty.dto';
import { FacultyEntity } from './faculty.entity';

@Injectable()
export class FacultyService {

  constructor(
    @InjectRepository(FacultyEntity)
    private readonly facultyRepository: Repository<FacultyEntity>,
  ) { }

  async create(createFacultyDto: CreateFacultyDto) {
    const facultyData = await this.facultyRepository.create(createFacultyDto);
    return this.facultyRepository.save(facultyData);
  }

  async findAll() {
    return await this.facultyRepository.find();
  }

  async findOne(uid: number): Promise<FacultyEntity> {
    const facultyData =
      await this.facultyRepository.findOneBy({ uid });
    if (!facultyData) {
      throw new HttpException(
        'Faculty Not Found',
        404,
      );
    }
    return facultyData;
  }

  async update(id: number, updateFacultyDto: UpdateFacultyDto) {
    const existingFaculty = await this.findOne(id);
    const facultyData = this.facultyRepository.merge(
      existingFaculty,
      updateFacultyDto,
    );
    return await this.facultyRepository.save(
      facultyData,
    );
  }

  async remove(id: number) {
    const existingFaculty = await this.findOne(id);
    return await this.facultyRepository.remove(
      existingFaculty,
    );
  }
}
