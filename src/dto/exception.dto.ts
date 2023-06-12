import { CommonExceptionResponse } from '@dollarsign/nestjs-exceptions';
import { ApiResponseProperty } from '@nestjs/swagger';

export class ExceptionResponseDto implements CommonExceptionResponse {
  @ApiResponseProperty({ example: 'SOMETHING_WENT_WRONG' })
  errorCode: string;

  @ApiResponseProperty({
    example: 'something went wrong please contact administrator',
  })
  errorMessage: string;

  @ApiResponseProperty({ example: 404 })
  statusCode: number;

  @ApiResponseProperty({ example: '/example/path' })
  path: string;
}
