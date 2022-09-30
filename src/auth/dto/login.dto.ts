import { ApiProperty } from "@nestjs/swagger";
import { IsString, isString } from "class-validator";

export class LoginDto {

    @ApiProperty({
        type: String,
        required: true,
        description:'mobile'
    })
    @IsString()
    mobile:string;

    @ApiProperty({
        type: String,
        required: true,
        description:'password'
    })
    @IsString()
    password:string ;

}


export class LoginByPhoneDto {
    @ApiProperty({
        type: String,
        required: true,
        description:'mobile'
    })
    @IsString()
    mobile:string;
}