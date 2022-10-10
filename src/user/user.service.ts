import { HttpException, Inject, Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UserDto } from '../auth/dto/user.dto';
import { ROLE_REPOSITORY, USER_REPOSITORY, USER_ROLE_MAPPING_REPOSITORY } from '../common/constants';
import { Role } from '../master/entity/role.entity';
import { UserRoleMapping } from './entity/user-role-mapping.entity';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(
        private readonly jwtService: JwtService,
        @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
        @Inject(ROLE_REPOSITORY) private readonly roleRepository: typeof Role,
        @Inject(USER_ROLE_MAPPING_REPOSITORY) private readonly userRoleMappingRepository: typeof UserRoleMapping


    ) { }


    async findOneByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne<User>({ where: { email } });
       
    }
    async findOneByMobile(mobile: string): Promise<User> {
        return await this.userRepository.findOne<User>({ where: { mobile } });
       
    }
    async create(user, userCreatePayload: UserDto) {
    console.log("user dto",user);
    // return;
    let userRole = await this.userRoleMappingRepository.findAll({where:{user_id:user.id},include:[{model:Role}]});
    console.log("all roles")
    console.log(userRole[0].role);
    let isAdmin =false;
     userRole.forEach((e)=>{
        if(e.role.name == 'ADMIN')
        {
            isAdmin = true;
        }
    })
    console.log("is admin",isAdmin);
    // console.log('userCreatePayload'+userCreatePayload);

    if(!isAdmin)
    {
        throw new HttpException("Only Admin can create users",400);
    }
    
    try {
        const existingUser = await this.findOneByMobile(userCreatePayload.mobile);
        if(existingUser)
        {
            throw new HttpException("Mobile number already registered",409);
        }
        // hash the password
        const pass = await this.hashPassword(userCreatePayload.password);
        // create the user
        // const newUser = await this.userService.create({ ...user, password: pass });
        let newUser = await this.userRepository.create({ ...userCreatePayload, password: pass });
        let roleMappingObject = {
            user_id : newUser.id,
            role_id: userCreatePayload.role_id
        };
        let roleMapping  = await this.userRoleMappingRepository.create({...roleMappingObject})
        // tslint:disable-next-line: no-string-literal
        return newUser;
        // const {...result } = newUser['dataValues'];
        // result['password'] = user.password
        
        // // generate token
        // const userAuthDetails = await this.generateToken(result);
        // // return the user and the token
        // return {"user_id":userAuthDetails.currentUser.id, "mobile":user.mobile, token:userAuthDetails.token };

        
    } catch (error) {
        throw error;
        // console.log(error);
    }
    

}
async findOneById(id: string) {
    return await this.userRepository.findOne<User>({ where: { id } });
}



async hashPassword(password) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
}

async validateUser(mobile: string, pass: string) {
    // find if user exist with this phone
    const user = await this.findOneByMobile(mobile);
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


async getUsers()
{
    let res = await this.userRepository.findAll();
    return res;
}
}
