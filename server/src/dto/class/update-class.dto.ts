import { IsOptional } from "class-validator";

export class UpdateClassDto {
    @IsOptional()
    name: string;

    @IsOptional()
    lecturer_code: string;

    @IsOptional()
    is_active: boolean;

}