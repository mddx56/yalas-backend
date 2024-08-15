import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateFacultyDto {
    @IsNotEmpty({ message: 'Oops al parecer no has ingresado dato en este campo' })
    @IsString()
    @Length(5, 50, { message: 'El nombre debe contener entre 5 y 50 caracteres' })
    readonly name: string;
}
