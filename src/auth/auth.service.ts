import { UserEntity } from './../users/user.entity';
import { UserPasswordService } from './../users/user-password.service';
import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { USER_SERVICE } from 'src/core/constants';
import { IUserService } from 'src/users/user-service.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_SERVICE)
    private readonly userService: IUserService,
    private readonly userPasswordService: UserPasswordService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    // find if user exist with this email
    const user = await this.userService.getByUsername({ username });
    if (!user) {
      return null;
    }

    // find if user password match
    const match = await this.userPasswordService.compare(pass, user.password);
    if (!match) {
      return null;
    }

    // tslint:disable-next-line: no-string-literal
    const { password, ...result } = user['_doc'];
    return result;
  }

  async login(user: UserEntity) {
    const payload = { _id: user._id, sub: user.username };
    return { access_token: this.jwtService.sign(payload) };
  }
}
