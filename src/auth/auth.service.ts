import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UserDTO } from '../user/dto/user.sto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    const isValidatePassword = await this.userService.heckPassword(
      password,
      user.password,
    );
    if (user && isValidatePassword) return user;
    return null;
  }
  async signIn(user: any) {
    const payload = {
      username: user.username,
      sub: user._id,
    };
    return { access_token: this.jwtService.sign(payload) };
  }
  async signUp(userDto: UserDTO) {
    return this.userService.create(userDto);
  }
}
