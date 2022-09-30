import { ApiProperty } from "@nestjs/swagger";
import { IsString, isString } from "class-validator";

export class AddGroupUserDto {

    @ApiProperty({
        type: String,
        required: true,
        description:'user_id'
    })
    @IsString()
    user_id:string | null;

    @ApiProperty({
        type: String,
        required: true,
        description:'group_id'
    })
    @IsString()
    group_id: string;

}