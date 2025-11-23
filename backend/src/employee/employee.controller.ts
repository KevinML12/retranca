import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './employee.entity';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    return this.employeeService.create(createEmployeeDto);
  }

  @Get()
  async findAll(): Promise<Employee[]> {
    return this.employeeService.findAll();
  }
}
