import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    default: 'bussr',
  })
  username: string;

  @ApiProperty({
    default: 'bussr',
  })
  password: string;
}
