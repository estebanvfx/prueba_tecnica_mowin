import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ){}


    async login(loginDto: LoginDto){
        const userExists = await this.usersService.findOneByEmail(loginDto.email)
        if(!userExists){
            throw new UnauthorizedException('Invalid email')
        }

        const isPasswordValid = await bcryptjs.compare(loginDto.password, userExists.password)

        if(!isPasswordValid){
            throw new UnauthorizedException('Invalid email or password')
        }

        const payload = { email: userExists.email, id: userExists.id }
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }

    async register(registerDto: RegisterDto){
        const user = await this.usersService.findOneByEmail(registerDto.email)

        if(user){
            throw new BadRequestException('Email already exists')
        }

        registerDto.password = await bcryptjs.hash(registerDto.password, 10);
        return await this.usersService.create(registerDto)
    }

}
