import { ApiProperty } from '@nestjs/swagger';

export class ChatRequestDto {
  @ApiProperty({
    description: 'User message to the HRMS assistant',
    example: 'How do I apply for leave?',
  })
  message: string;
}
