import { ApiProperty } from "@nestjs/swagger";
import { IsString, isString } from "class-validator";

export class GroupDto {

    @ApiProperty({
        type: String,
        required: false,
        description:'name'
    })
    @IsString()
    name:string | null;

    @ApiProperty({
        type: String,
        required: true,
        description:'role_id'
    })
    @IsString()
    code: string;

}