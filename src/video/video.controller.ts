import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	Query,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorators'
import { CurrentUser } from 'src/users/user.decorators'
import { CreateVideoDto } from './dto/create-video.dto'
import { VideoService } from './video.service'

@Controller('video')
export class VideoController {
	constructor(private readonly videoService: VideoService) {}
	@Get('get-private/:id')
	// @Auth()
	videoPrivate(@Param('id') id: string) {
		return this.videoService.getOneById(+id)
	}
	@Get()
	getAll(@Query('searchTerm') searchTerm?: string) {
		console.log(searchTerm)

		return this.videoService.getAll(searchTerm)
	}
	@Get('most-popular')
	getMostPopularViews() {
		return this.videoService.getMostPopularByViews()
	}
	@Get(':id')
	getById(@Param('id') id: string) {
		return this.videoService.getOneById(+id)
	}
	@HttpCode(200)
	@Post()
	@Auth()
	createVideo(@CurrentUser('id') id: number) {
		return this.videoService.create(id)
	}
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	updateUser(@Param('id') id: string, @Body() dto: CreateVideoDto) {
		return this.videoService.updateProfile(+id, dto)
	}
	@HttpCode(200)
	@Delete(':id')
	deleteVideo(@Param('id') id: string) {
		return this.videoService.delete(+id)
	}
	@HttpCode(200)
	@Put('update-views/:videoId')
	updateCountViews(@Param('videoId') videoId: string) {
		return this.videoService.updateCountViews(+videoId)
	}
	@HttpCode(200)
	@Put('update-likes/:videoId')
	updateCountLikes(@Param('videoId') videoId: string) {
		return this.videoService.updateReaction(+videoId)
	}
}
