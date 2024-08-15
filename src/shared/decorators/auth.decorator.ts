import { UseGuards, applyDecorators } from '@nestjs/common';
import { RoleEnum } from '../../shared/interfaces/user.interface';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from './roles.decorator';

export function Auth(...role: RoleEnum[]) {
  return applyDecorators(Roles(...role), UseGuards(AuthGuard, RolesGuard));
}
