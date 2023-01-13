import {
  ArgumentMetadata,
  PipeTransform,
  Injectable,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ParseStringPipe implements PipeTransform {
  transform(value, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    console.log(metatype);
    if (this.toValidate(metatype)) {
      throw new BadRequestException('user id must be a string');
    }
    return value;
  }
  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String];
    return !types.includes(metatype);
  }
}
