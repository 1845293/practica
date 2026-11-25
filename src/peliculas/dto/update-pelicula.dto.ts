import { OmitType, PartialType } from '@nestjs/swagger';
import { CreatePeliculaDto } from './create-pelicula.dto.js';

// Los géneros se manejan con sus propios endpoints, por eso se quita idGeneros
export class UpdatePeliculaDto extends PartialType(
  OmitType(CreatePeliculaDto, ['idGeneros'] as const),
) {}
