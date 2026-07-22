import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards, UseInterceptors, UploadedFile, HttpCode, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { TeamService } from './team.service';
import { CreateTeamMemberDto, UpdateTeamMemberDto, TeamMemberQueryDto } from './team.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Public } from '../../common/decorators/public.decorator';
import { multerConfig } from '../upload/multer.config';

@ApiTags('Team')
@Controller('team')
export class TeamController {
  constructor(private teamService: TeamService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all team members with pagination' })
  async findAll(@Query() query: TeamMemberQueryDto) {
    return this.teamService.findAll(query);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get team member by ID' })
  async findById(@Param('id') id: number) {
    return this.teamService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('photo', multerConfig))
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create team member' })
  async create(@Body() dto: CreateTeamMemberDto, @UploadedFile() file?: Express.Multer.File) {
    const photo = file ? `/uploads/${file.filename}` : undefined;
    return this.teamService.create(dto, photo);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('photo', multerConfig))
  @ApiBearerAuth('JWT-auth')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Update team member' })
  async update(@Param('id') id: number, @Body() dto: UpdateTeamMemberDto, @UploadedFile() file?: Express.Multer.File) {
    const photo = file ? `/uploads/${file.filename}` : undefined;
    return this.teamService.update(id, dto, photo);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete team member' })
  async delete(@Param('id') id: number) {
    return this.teamService.delete(id);
  }
}
