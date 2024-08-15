import { Column, ManyToOne, JoinColumn, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { TeacherEntity } from '../teacher/teacher.entity';

@Entity('subject')
export class SubjectEntity {
    @PrimaryGeneratedColumn('increment')
    uid: number;

    @Column()
    name: string;

    @Column()
    level: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @ManyToOne(() => TeacherEntity, {
        eager: true,
    })

    @JoinColumn({ name: 'teacherId' })
    teacher: TeacherEntity;
}
