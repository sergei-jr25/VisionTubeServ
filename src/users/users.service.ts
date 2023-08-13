import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { genSalt, hash } from 'bcryptjs'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { SubscriptionEntity } from './entities/subscription'
import { UserEntity } from './entities/user.entity'

@Injectable()
export class UsersService {
	constructor(
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

		const toUser = await this.userRepository.findOneBy({ id: channelId })

		const isSubscribe = await this.subscriptionRepository.findOneBy(data)

		if (!isSubscribe) {
			const newSubscription = await this.subscriptionRepository.create(data)
			await this.subscriptionRepository.save(newSubscription)
			toUser.subscriberCount++
			await this.userRepository.save(toUser)

			return true
		}
		if (toUser.subscriberCount > 0) {
			toUser.subscriberCount--
			await this.userRepository.save(toUser)
		}

		await this.subscriptionRepository.delete(data)
		return false
	}

	async getAll() {
		return await this.userRepository.find()
	}

	async getOneById(id: number) {
		const user = await this.userRepository.findOne({
			where: {
				id
			},
			relations: {
				videos: true,
				subscriptions: {
					toChannel: true
				}
			},
			order: {
				createdAt: 'DESC'
			}
		})

		if (!user) throw new NotFoundException('User не найден')

		return user
	}

	async updateProfile(id: number, dto: CreateUserDto) {
		const user = await this.getOneById(id)

		const isSameUser = await this.userRepository.findOneBy({ email: dto.email })
		if (isSameUser && isSameUser.id !== id) {
			throw new BadRequestException('Email занят')
		}

		if (dto.password) {
			const salt = await genSalt(10)
			user.password = await hash(dto.password, salt)
		}

		user.name = dto.name
		user.description = dto.description
		user.avatarPath = dto.avatarPath
		user.email = dto.email

		return await this.userRepository.save(user)
	}

	remove(id: number) {
		return `This action removes a #${id} user`
	}
}
