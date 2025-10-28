import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Patch,
  Delete,
  UseGuards,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // ✅ Always place static route before dynamic ones
  @Get('total')
  async getTotalCustomers() {
    const total = await this.usersService.getTotalCustomers();
    return { total };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new Error('Invalid user ID');
    }
    return this.usersService.findOne(numericId);
  }

  // ✅ Secure update route
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
    @Request() req,
  ) {
    if (req.user.id !== +id) {
      throw new UnauthorizedException('You can only update your own profile');
    }
    return this.usersService.update(+id, dto);
  }

  // ✅ Secure delete route
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    if (req.user.id !== +id) {
      throw new UnauthorizedException('You can only delete your own account');
    }
    return this.usersService.remove(+id);
  }

  // ✅ Secure password change route
  @UseGuards(AuthGuard('jwt'))
  @Put(':id/change-password')
  async changePassword(
    @Param('id') id: string,
    @Body('newPassword') newPassword: string,
    @Request() req,
  ) {
    if (req.user.id !== +id) {
      throw new UnauthorizedException('You can only change your own password');
    }
    return this.usersService.changePassword(+id, newPassword);
  }
}
