import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // get roles metadata from handler or class
    const requiredRoles =
      this.reflector.getAllAndOverride<string[]>('roles', [
        context.getHandler(),
        context.getClass(),
      ]);

    // if no roles required allow
    if (!requiredRoles || requiredRoles.length === 0) return true;

    const req = context.switchToHttp().getRequest();
    const user = req?.user;

    // defensive: if user or user.role missing, deny
    if (!user || typeof user.role === 'undefined' || user.role === null) {
      return false;
    }

    // compare as strings to avoid enum mismatch
    return requiredRoles.some((r) => String(r) === String(user.role));
  }
}
