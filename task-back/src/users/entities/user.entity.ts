import { Task } from "src/tasks/entities/task.entity";
import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @DeleteDateColumn()
    deleted_at: Date;

    @OneToMany(()=> Task, task => task.user)
    tasks: Task[];
}
