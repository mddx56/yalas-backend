import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { TeacherEntity } from '../teacher/teacher.entity';

@Entity('faculty')
export class FacultyEntity {
    @PrimaryGeneratedColumn('increment')
    uid: number;

    @Column()
    name: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @OneToMany(() => TeacherEntity, (teacher) => teacher.faculty)
    teachers: TeacherEntity[];
}
