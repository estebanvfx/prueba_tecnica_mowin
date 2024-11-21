import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id_task: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    expiration_date: Date;

    @Column({type: 'enum', enum: ['pending', 'done', 'progress'], default: 'pending'})
    state: 'pending' | 'done' | 'progress';

    @ManyToOne(()=> User, user => user.tasks)
    user: User;
    
    @Column()
    userId: number;

    @CreateDateColumn()
    created_at: Date;
    
    @DeleteDateColumn()
    deleted_at: Date;
}
