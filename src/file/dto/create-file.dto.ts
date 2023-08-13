import { IsString } from 'class-validator'

export class CreateFileDto {
	@IsString()
	url: string

	@IsString()
	name: string
}
