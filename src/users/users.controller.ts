import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	Patch,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorators'
import { CreateUserDto } from './dto/create-user.dto'
import { CurrentUser } from './user.decorators'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	getUsers() {
		return this.usersService.getAll()
	}

	@Get('profile')
	@Auth()
	profile(@CurrentUser('id') id: number) {
		console.log('id', id)

		return this.usersService.getOneById(id)
	}

	@Get('by-id/:id')
	getUser(@Param('id') id: string) {
		return this.usersService.getOneById(+id)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	// @Auth()
	updateUser(@Param('id') id: string, @Body() dto: CreateUserDto) {
		return this.usersService.updateProfile(+id, dto)
	}

	@HttpCode(200)
	@Patch('subscribe/:channelId')
	@Auth()
	subscribeToChannel(
		@Param('channelId') channelId: string,
		@CurrentUser('id') id: number
	) {
		console.log('id', id, 'channelId', +channelId)

		return this.usersService.subscribe(id, +channelId)
	}
}
