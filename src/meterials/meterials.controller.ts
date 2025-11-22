import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { MeterialsService } from './meterials.service';
import { CreateMeterialDto } from './dto/create-meterial.dto';
import { UpdateMeterialDto } from './dto/update-meterial.dto';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { role } from 'src/auth/enums/roles.enum';
import { JwtAuthGuard } from 'src/auth/gards/jwt.auth.gard';
import { RolesGuard } from 'src/auth/gards/roles/roles.guard';

@Controller('meterials')
export class MeterialsController {
  constructor(private readonly meterialsService: MeterialsService) { }

  @Roles(role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('create')
  create(@Req() req, @Body() createMeterialDto: CreateMeterialDto) {
    return this.meterialsService.create(createMeterialDto, req.user);
    console.log(req.user);

  }

  @Roles(role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll(@Query('sort') sort: 'asc' | 'desc' = 'asc') {
    return this.meterialsService.findAll(sort);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.meterialsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMeterialDto: UpdateMeterialDto,
  ) {
    return this.meterialsService.update(+id, updateMeterialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.meterialsService.remove(+id);
  }
}
