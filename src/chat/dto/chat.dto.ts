import { ApiProperty } from "@nestjs/swagger";
import { IsString, isString } from "class-validator";

export class ChatDto {

    @ApiProperty({
        type: String,
        required: true,
        description:'message'
    })
    @IsString()
    message:string | null;

    @ApiProperty({
        type: String,
        required: true,
        description:'group_id'
    })
    @IsString()
    group_id: string;



}