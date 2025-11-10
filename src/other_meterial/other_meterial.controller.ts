import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { OtherMeterialService } from './other_meterial.service';
import { CreateOtherMeterialDto } from './dto/create-other_meterial.dto';
import { UpdateOtherMeterialDto } from './dto/update-other_meterial.dto';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { role } from 'src/auth/enums/roles.enum';
import { JwtAuthGuard } from 'src/auth/gards/jwt.auth.gard';
import { RolesGuard } from 'src/auth/gards/roles/roles.guard';

@Controller('other-meterial')
export class OtherMeterialController {
  constructor(private readonly otherMeterialService: OtherMeterialService) {}

  @Roles(role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Request() req, @Body() createOtherMeterialDto: CreateOtherMeterialDto) {
    return this.otherMeterialService.create(createOtherMeterialDto, req.user);
  }

  @Get()
  findAll() {
    return this.otherMeterialService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.otherMeterialService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOtherMeterialDto: UpdateOtherMeterialDto) {
    return this.otherMeterialService.update(+id, updateOtherMeterialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.otherMeterialService.remove(+id);
  }
}
