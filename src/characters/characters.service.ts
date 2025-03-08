import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { IResponse, ICharacterDetails, IQueryError } from 'src/types/interface';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CharactersService {
  constructor(private readonly httpService: HttpService) {}

  async getCharacters(page: number, status: string): Promise<IResponse | IQueryError> {
    try {
      const response = await lastValueFrom(
        this.httpService.get(`https://rickandmortyapi.com/api/character?page=${page}&status=${status}`)
      );
      return response.data;
    } catch (error) {
      return {
        status: error.response?.status || 500,
        data: { error: 'Failed to fetch data' },
      };
    }
  }

  async getCharacterById(id: number): Promise<ICharacterDetails | IQueryError> {
    try {
      const response = await lastValueFrom(
        this.httpService.get(`https://rickandmortyapi.com/api/character/${id}`)
      );
      return response.data;
    } catch (error) {
      return {
        status: error.response?.status || 500,
        data: { error: 'Failed to fetch data' },
      };
    }
  }
}