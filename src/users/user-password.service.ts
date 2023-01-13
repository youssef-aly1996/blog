import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserPasswordService {
  async hash(password: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  async compare(password: string, hash) {
    return await bcrypt.compare(password, hash);
  }
}
