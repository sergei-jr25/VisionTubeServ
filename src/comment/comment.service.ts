import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateCommentDto } from './dto/create-comment.dto'
import { CommentEntity } from './entities/comment.entity'

@Injectable()
export class CommentService {
	constructor(
		@InjectRepository(CommentEntity)
		private readonly commentRepository: Repository<CommentEntity>
	) {}

	async create(userId: number, dto: CreateCommentDto) {
		const newComment = this.commentRepository.create({
			message: dto.message,
			video: { id: dto.videoId },
			user: { id: userId }
		})

		if (!newComment) throw new NotFoundException('Данные не определены')

		return await this.commentRepository.save(newComment)
	}
}
