import {
	Controller,
	HttpCode,
	Post,
	Query,
	UploadedFile,
	UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { FileService } from './file.service'

@Controller('file')
export class FileController {
	constructor(private readonly fileService: FileService) {}

	// @Auth()
	@HttpCode(200)
	@Post()
	@UseInterceptors(FileInterceptor('file'))
	uploadMedia(
		@UploadedFile() mediaFile: Express.Multer.File,
		@Query('folder') folder?: string
	) {
		return this.fileService.saveMedia(mediaFile, folder)
	}
}
