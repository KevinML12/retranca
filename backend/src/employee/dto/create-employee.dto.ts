import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  role: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
