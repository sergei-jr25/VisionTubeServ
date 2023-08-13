import {
	CanActivate,
	ExecutionContext,
	ForbiddenException
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { UserEntity } from 'src/users/entities/user.entity'

export class OnlyAdminGuard implements CanActivate {
	constructor(private reflect: Reflector) {}
	canActivate(context: ExecutionContext): boolean {
		const user = context.switchToHttp().getRequest<UserEntity>()

		if (!user.isVerified) throw new ForbiddenException('You have no rights')

		return user.isVerified
	}
}
