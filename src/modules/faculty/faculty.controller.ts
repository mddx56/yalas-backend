import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateFacultyDto } from './dto/create-faculty.dto';
import { UpdateFacultyDto } from './dto/update-faculty.dto';
import { FacultyService } from './faculty.service';

@Controller('faculty')
export class FacultyController {
  constructor(private readonly facultyService: FacultyService) { }

  @Post()
  async create(@Body() createFacultyDto: CreateFacultyDto) {
    try {
      await this.facultyService.create(
        createFacultyDto,
      );

      return {
        success: true,
        message: 'Faculty Created Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Get()
  async findAll() {
    try {
      const data =
        await this.facultyService.findAll();
      return {
        success: true,
        data,
        message: 'Faculty Fetched Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const data = await this.facultyService.findOne(
        +id,
      );
      return {
        success: true,
        data,
        message: 'Faculty Fetched Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateFacultyDto: UpdateFacultyDto) {
    try {
      await this.facultyService.update(
        +id,
        updateFacultyDto,
      );
      return {
        success: true,
        message: 'Faculty Updated Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.facultyService.remove(+id);
      return {
        success: true,
        message: 'Faculty Deleted Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
