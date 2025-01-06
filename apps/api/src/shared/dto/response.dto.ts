import { JsonObject, JsonType } from "@softbar/api-interfaces";
import { ApiProperty } from "@nestjs/swagger";

type ResponseDtoType<T = any, D = JsonType> = {
  message: string
  response: T & D
  status: number
} & JsonObject

export class ResponseDto<T = any, D = JsonType>  {
  @ApiProperty()
  corellationId?: string;
  @ApiProperty()
  message: string
  @ApiProperty()
  response: ResponseDtoType<T, D>['response'] & D
  @ApiProperty()
  status?: number = 500;//string = "200";
}