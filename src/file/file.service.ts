import { Injectable } from '@nestjs/common'
import { path } from 'app-root-path'
import { ensureDir, writeFile } from 'fs-extra'

@Injectable()
export class FileService {
	async saveMedia(
		mediaFile: Express.Multer.File,
		folder = 'default'
	): Promise<any> {
		const uploadFile = `${path}/public/${folder}`
		await ensureDir(uploadFile)

		await writeFile(`${uploadFile}/${mediaFile.originalname}`, mediaFile.buffer)

		return {
			url: `/public/${folder}/${mediaFile.originalname}`,
			name: mediaFile.originalname
		}
	}
}
