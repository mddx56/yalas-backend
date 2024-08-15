import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { FacultyEntity } from '../faculty/faculty.entity';
import { SubjectEntity } from '../subject/subject.entity';

@Entity('teacher')
export class TeacherEntity {
    @PrimaryGeneratedColumn('increment')
    uid: number;

    @Column()
    name: string;

    @Column()
    summary: string;

    @Column()
    emoji: string;

    @Column()
    avg: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @OneToMany(() => SubjectEntity, (subject) => subject.teacher)
    subjects: SubjectEntity[];

    @ManyToOne(() => FacultyEntity, {
        eager: true,
    })

    @JoinColumn({ name: 'facultyId' })
    faculty: FacultyEntity;
} 