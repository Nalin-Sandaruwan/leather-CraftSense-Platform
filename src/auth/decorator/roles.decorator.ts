import { SetMetadata } from "@nestjs/common";
import { role } from "../enums/roles.enum";

export const ROLES_KEY = 'roles';
export const Roles = (...roles: [role, ...role[]]) => SetMetadata(ROLES_KEY, roles);