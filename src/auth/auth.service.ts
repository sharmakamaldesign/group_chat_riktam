import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { UserDto } from './dto/user.dto';
@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        ) { }
    private async isUserExist(mobile:string)
    {
        const user = await this.userService.findOneByMobile(mobile);
        if (!user) {
            return false;
        }
        return true;
    }

    async validateUser(mobile: string, pass: string) {
        // find if user exist with this phone
        const user = await this.userService.findOneByMobile(mobile);
        console.log("user",user);
        if (!user) {
            return null;
        }
        // find if user password match
        const match = await this.comparePassword(pass, user.password);
        console.log(pass, user.password)
        console.log('match',match);
        if (!match) {
            return null;
        }

        // tslint:disable-next-line: no-string-literal
        const { password, ...result } = user['dataValues'];
        return result;
    }
     async generateToken(user) {
        let currentUser = await this.validateUser(user.mobile,user.password);// await this.userService.findOneByMobile(user.username);
        // let currentUser = await this.userService.findOneByMobile(user.mobile);
        console.log("currentUser",currentUser)
        if(!currentUser)
        {
            throw new HttpException("User not found",401);
        }
        const token = await this.jwtService.signAsync(currentUser);
        
        return {token, currentUser};
    }

    private async comparePassword(enteredPassword, dbPassword) {
        const match = await bcrypt.compare(enteredPassword, dbPassword);
        return match;
    }
    public async login(user) {
        const userAuthDetails = await this.generateToken(user);
        return {"user_id":userAuthDetails.currentUser.id, "mobile":user.mobile, token:userAuthDetails.token };
    }
    // public async create(user:UserDto) {
    //     const existingUser = await this.userService.findOneByMobile(user.mobile);
    //     if(existingUser)
    //     {
    //         throw new HttpException("Mobile number already registered",409);
    //     }
    //     // hash the password
    //     const pass = await this.hashPassword(user.password);
    //     // create the user
    //     const newUser = await this.userService.create({ ...user, password: pass });
    //     // tslint:disable-next-line: no-string-literal
    //     const {...result } = newUser['dataValues'];
    //     result['password'] = user.password
        
    //     // generate token
    //     const userAuthDetails = await this.generateToken(result);
    //     // return the user and the token
    //     return {"user_id":userAuthDetails.currentUser.id, "mobile":user.mobile, token:userAuthDetails.token };
    // }
     async hashPassword(password) {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    }
}
