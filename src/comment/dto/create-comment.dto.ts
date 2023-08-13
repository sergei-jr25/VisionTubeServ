import { IsNumber, IsString } from 'class-validator'

export class CreateCommentDto {
	@IsString()
	message: string

	@IsNumber()
	videoId: number
}
