import { IsString } from 'class-validator'

export class CreateVideoDto {
	@IsString()
	name: string

	isPublic?: boolean

	@IsString()
	description: string

	@IsString()
	videoPath: string

	@IsString()
	thumbnailPath: string

	user?: { id: number }
}
