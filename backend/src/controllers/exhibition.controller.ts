import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { ExhibitionService } from '../services/exhibition.service';
import { ExhibitionStatus } from '../types/enums';
import { ok } from '../utils/response';

@Controller('api/exhibitions')
export class ExhibitionController {
  constructor(private readonly exhibitionService: ExhibitionService) {}

  @Get()
  async list(@Query('status') status?: ExhibitionStatus) {
    return this.exhibitionService.listByStatus(status);
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return ok(await this.exhibitionService.find(id));
  }

  @Post()
  async create(@Body() body: Record<string, unknown>) {
    return ok(await this.exhibitionService.create(body));
  }

  @Patch(':id/artworks')
  async addArtwork(@Param('id') id: string, @Body('artworkId') artworkId: string) {
    return ok(await this.exhibitionService.addArtwork(id, artworkId));
  }

  @Patch(':id/publish')
  async publish(@Param('id') id: string) {
    return ok(await this.exhibitionService.publish(id));
  }

  @Patch(':id/end')
  async end(@Param('id') id: string) {
    return ok(await this.exhibitionService.end(id));
  }

  @Patch(':id/archive')
  async archive(@Param('id') id: string) {
    return ok(await this.exhibitionService.archive(id));
  }
}
