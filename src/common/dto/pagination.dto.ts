import { ApiProperty } from "@nestjs/swagger";


export class PaginationFilter{
    @ApiProperty({type:Number, required:false,})
    page:number;

    @ApiProperty({ type:Number, required:false})
    count: number;
}

