import { Transform } from "class-transformer";
import { IsDate, IsEnum, IsOptional, IsString } from "class-validator";


export class UpdateTaskDto { 
    @IsString()
    @IsOptional()
    title?: string;
    
    @IsString()
    @IsOptional()
    description?: string;

    @IsDate()
    @IsOptional()
    @Transform(({ value }) => new Date(value))
    expiration_date?: Date;

    @IsOptional()
    @IsEnum(['pending', 'done', 'progress'])
    state?: 'pending' | 'done' | 'progress';
}
