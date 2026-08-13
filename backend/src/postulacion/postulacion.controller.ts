import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostulacionService } from './postulacion.service';
import { CreatePostulacionDto } from './dto/create-postulacion.dto';
import { UpdatePostulacionDto } from './dto/update-postulacion.dto';

@Controller('postulacion')
export class PostulacionController {
  constructor(private readonly postulacionService: PostulacionService) {}

  @Post()
  create(@Body() createPostulacionDto: CreatePostulacionDto) {
    return this.postulacionService.create(createPostulacionDto);
  }

  @Get()
  findAll() {
    return this.postulacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postulacionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostulacionDto: UpdatePostulacionDto) {
    return this.postulacionService.update(+id, updatePostulacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postulacionService.remove(+id);
  }
}
