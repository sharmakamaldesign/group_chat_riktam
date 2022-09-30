import { ApiProperty } from "@nestjs/swagger";
import { IsString, isString } from "class-validator";

export class RoleDto {

    @ApiProperty({
        type: String,
        required: true,
        description:'name'
    })
    @IsString()
    name:string;
}