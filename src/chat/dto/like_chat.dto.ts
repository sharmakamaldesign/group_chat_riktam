import { ApiProperty } from "@nestjs/swagger";
import { IsString, isString } from "class-validator";

export class LikeChatDto {

    @ApiProperty({
        type: String,
        required: true,
        description:'chat_id'
    })
    @IsString()
    chat_id:string | null;



}