import { ApiProperty } from "@nestjs/swagger";
import { IsString, isString } from "class-validator";

export class UserDto {

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
    role_id: string;

    @ApiProperty({
        type: String,
        required: false,
        description:'email'
    })
    @IsString()
    email:string | null;

    @ApiProperty({
        type: String,
        required: false,
        description:'password'
    })
    @IsString()
    password:string | null;

    @ApiProperty({
        type: String,
        required: false,
        description:'gender'
    })
    @IsString()
    gender:string| null;

    @ApiProperty({
        type: String,
        required: true,
        description:'mobile'
    })
    @IsString()
    mobile:string| null;

    @ApiProperty({
        type: String,
        required: false,
        description:'latitude'
    })
    @IsString()
    latitude:string;

    @ApiProperty({
        type: String,
        required: false,
        description:'longitude'
    })
    @IsString()
    longitude:string;
}