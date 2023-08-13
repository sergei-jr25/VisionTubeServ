import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateAuthDto } from './dto/create-auth.dto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}
	// @UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login')
	login(@Body() dto: CreateAuthDto) {
		console.log('dto', dto)

		return this.authService.login(dto)
	}

	// @UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('register')
	register(@Body() dto: CreateAuthDto) {
		return this.authService.register(dto)
	}
}
