import { UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

export const Auth = () => UseGuards(AuthGuard('jwt'))

// export const AuthHard = (role: 'admin' | 'user' | undefined = 'user') =>
// 	applyDecorators(
// 		role === 'admin' ? UseGuards(JwtGuard, OnlyAdminGuard) : UseGuards(JwtGuard)
// 	)
