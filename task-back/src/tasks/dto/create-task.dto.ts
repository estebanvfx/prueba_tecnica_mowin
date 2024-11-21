import { Transform } from "class-transformer";
import { IsDate, IsString } from "class-validator";

export class CreateTaskDto {
    @IsString()
    title: string;
    
    @IsString()
    description: string;

    @IsDate()
    @Transform(({ value }) => new Date(value))
    expiration_date: Date;
}
