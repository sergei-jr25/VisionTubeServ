import {
	Body,
	Controller,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorators'
import { CurrentUser } from 'src/users/user.decorators'
import { CommentService } from './comment.service'
import { CreateCommentDto } from './dto/create-comment.dto'

@Controller('comment')
export class CommentController {
	constructor(private readonly commentService: CommentService) {}
	@UsePipes(new ValidationPipe())
	@Post()
	@Auth()
	create(@CurrentUser('id') id: number, @Body() dto: CreateCommentDto) {
		return this.commentService.create(id, dto)
	}
}
