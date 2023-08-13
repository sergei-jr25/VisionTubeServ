import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as appRoot from 'app-root-path'
import * as ffprobePath from 'ffprobe-static'
import * as ffmpeg from 'fluent-ffmpeg'
import * as path from 'path'
import { SubscriptionEntity } from 'src/users/entities/subscription'
import { UserEntity } from 'src/users/entities/user.entity'
import { FindOptionsWhereProperty, ILike, MoreThan, Repository } from 'typeorm'
import { CreateVideoDto } from './dto/create-video.dto'
import { VideoEntity } from './entities/video.entity'

@Injectable()
export class VideoService {
	constructor(
		@InjectRepository(VideoEntity)
		private readonly videoRepository: Repository<VideoEntity>,
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
		@InjectRepository(SubscriptionEntity)
		private readonly subscriptionRepository: Repository<SubscriptionEntity>
	) {}

	async subscribe(id: number, channelId: number) {
		const data = {
			toChannel: { id: channelId },
			fromUser: { id }
		}

		const isSubscribe = await this.subscriptionRepository.findOneBy(data)

		if (!isSubscribe) {
			const newSubscription = await this.subscriptionRepository.create(data)
			await this.subscriptionRepository.save(newSubscription)

			return true
		}

		await this.subscriptionRepository.delete(data)
		return false
	}

	// async getVideoDuration(videoPath: string): Promise<number> {
	// 	return new Promise<number>((resolve, reject) => {
	// 		ffmpeg.ffprobe(videoPath, (err, metadata) => {
	// 			if (err) {
	// 				reject(err)
	// 			} else {
	// 				const duration = metadata.format?.duration || 0
	// 				resolve(parseFloat(duration))
	// 			}
	// 		})
	// 	})
	// }

	async getOneById(id: number, isPublic = false) {
		const video = await this.videoRepository.findOne({
			where: isPublic
				? { id, isPublic: true }
				: {
						id
				  },
			relations: {
				user: true,
				comments: {
					user: true
				}
			},
			select: {
				user: {
					id: true,
					name: true,
					avatarPath: true,
					isVerified: true,
					subscriberCount: true,
					subscriptions: true
				},
				comments: {
					id: true,
					message: true,
					user: {
						id: true,
						name: true,
						avatarPath: true,
						isVerified: true,
						subscriberCount: true
					}
				}
			}
		})

		if (!video) throw new NotFoundException('Video не найден')

		return video
	}

	async updateProfile(id: number, dto: CreateVideoDto) {
		const video = await this.getOneById(id)

		const videoPath = dto.videoPath
		const absoluteVideoPath = path.join(appRoot.path, videoPath)
		console.log('absoluteVideoPath', absoluteVideoPath)

		// Указываем путь к ffprobe
		ffmpeg.setFfprobePath(ffprobePath.path)

		const getVideoDuration = () => {
			return new Promise<number>((resolve, reject) => {
				ffmpeg.ffprobe(absoluteVideoPath, (err, info) => {
					if (err) {
						reject(err)
						return
					}

					resolve(info.format.duration)
				})
			})
		}

		try {
			const duration = await getVideoDuration()
			const minutes = Math.floor(duration / 60)
			video.duration = minutes
			console.log('Метаданные видео:', duration)

			return this.videoRepository.save({
				...video,
				...dto
			})
		} catch (error) {
			console.error('Ошибка:', error)
		}
	}

	async getAll(searchTerm?: string) {
		let options: FindOptionsWhereProperty<VideoEntity> = {}

		if (searchTerm) {
			options = {
				name: ILike(`%${searchTerm}%`)
			}
		}

		return await this.videoRepository.find({
			where: {
				...options
			},
			order: {
				createdAt: 'DESC'
			},
			relations: {
				user: true,
				comments: {
					user: true
				}
			},
			select: {
				user: {
					id: true,
					name: true,
					avatarPath: true,
					isVerified: true
				}
			}
		})
	}

	async getMostPopularByViews() {
		return this.videoRepository.find({
			where: {
				views: MoreThan(0)
			},
			relations: {
				user: true,
				comments: {
					user: true
				}
			},
			select: {
				user: {
					id: true,
					name: true,
					avatarPath: true,
					isVerified: true
				}
			},
			order: {
				views: -1
			}
		})
	}

	async create(userId: number) {
		const defaultValue = {
			name: '',
			user: { id: userId },
			videoPAth: '',
			description: '',
			thumbnailPath: ''
		}

		const newVideo = this.videoRepository.create(defaultValue)
		const video = await this.videoRepository.save(newVideo)

		return video
	}

	async delete(id: number) {
		return await this.videoRepository.delete({ id })
	}

	async updateCountViews(id: number) {
		const video = await this.getOneById(id)
		video.views++

		return this.videoRepository.save(video)
	}

	async updateReaction(id: number) {
		const video = await this.getOneById(id)
		video.likes++

		return this.videoRepository.save(video)
	}
}
