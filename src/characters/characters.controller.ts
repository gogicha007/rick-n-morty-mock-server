import { Controller, Get, Req, Query } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { Request } from 'express';
import { IResponse, IQueryError, ICharacterDetails } from 'src/types/interface';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Get()
  async getCharacters(
    @Query('page') page: number,
    @Query('status') status: string,
  ): Promise<IResponse | IQueryError> {
    return this.charactersService.getCharacters(page, status);
  }

  @Get(':id')
  async getCharacterById(@Req() request: Request): Promise<ICharacterDetails | IQueryError> {
    return await this.charactersService.getCharacterById(Number(request.params.id));
  }
}
