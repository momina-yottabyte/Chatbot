import { ApiProperty } from '@nestjs/swagger';

export class ChatResponseDto {
  @ApiProperty({
    description: 'Assistant reply (grounded on dataset/ when available)',
  })
  response: string;
}
