import { IsOptional, IsNotEmpty, IsString, IsIn } from "class-validator";

export class UpdateTicketDto {

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    subject?:string;
    @IsOptional()
    @IsIn(['low', 'medium', 'high'])
    priority?:'low'|'medium'|'high';
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    description?:string;


}
