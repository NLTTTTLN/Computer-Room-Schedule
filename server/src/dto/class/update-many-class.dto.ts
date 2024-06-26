import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateManyClassDto {
    @IsNotEmpty()
    code: string;
    
    @IsOptional()
    name: string;
    
    @IsOptional()
    lecturer_code: string;

    @IsOptional()
    is_active: boolean;
}