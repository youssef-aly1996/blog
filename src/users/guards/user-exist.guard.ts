import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { USER_SERVICE } from 'src/core/constants';
import { IUserService } from '../user-service.interface';

@Injectable()
export class UserExistGuard implements CanActivate {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: IUserService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }
  async validateRequest(request) {
    const userExist = await this.userService.getByEmail(request.body.email);
    if (userExist) {
      throw new ForbiddenException('This email already exist');
    }
    return true;
  }
}
