import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { compare, genSalt, hash } from 'bcryptjs'
import { UserEntity } from 'src/users/entities/user.entity'
import { Repository } from 'typeorm'
import { CreateAuthDto } from './dto/create-auth.dto'
import { CreateRefreshTokenDto } from './dto/create-refreshToken.dto'

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
		private readonly jwtService: JwtService
	) {}

	async login(dto: CreateAuthDto) {
		const user = await this.validateUser(dto)

		return {
			user: this.returnUserFields(user),
			accessToken: await this.issueAccessToken(user.id)
		}
	}

	async register(dto: CreateAuthDto) {
		const oldUser = await this.userRepository.findOneBy({ email: dto.email })

		if (oldUser) {
			throw new BadRequestException('Email занят')
		}

		const salt = await genSalt(10)
		const newUser = await this.userRepository.create({
			email: dto.email,
			password: await hash(dto.password, salt)
		})

		const user = await this.userRepository.save(newUser)
		return {
			user: this.returnUserFields(user),
			accessToken: await this.issueAccessToken(user.id)
		}
	}

	async validateUser(dto: CreateAuthDto) {
		const user = await this.userRepository.findOne({
			where: {
				email: dto.email
			},
			select: ['id', 'email', 'password']
		})

		if (!user) throw new NotFoundException('Пользователь не найден')
		const isPassword = await compare(dto.password, user.password)
		if (!isPassword) throw new UnauthorizedException('Не правильный пароль')

		return user
	}

	returnUserFields(user: UserEntity) {
		return {
			id: user.id,
			email: user.email
		}
	}

	async issueAccessToken(userId: number) {
		const data = {
			id: userId
		}

		// const accessToken = await this.jwtService.signAsync(data, {
		// 	expiresIn: '31d'
		// })
		// const refreshToken = await this.jwtService.signAsync(data, {
		// 	expiresIn: '1h'
		// })
		return await this.jwtService.signAsync(data, { expiresIn: '31d' })
	}

	returnUserEntity(user: UserEntity) {
		return {
			id: user.id,
			email: user.email,
			isVerified: user.isVerified
		}
	}

	async getNewToken({ refreshToken }: CreateRefreshTokenDto) {
		if (!refreshToken) throw new UnauthorizedException('Please sign in')

		const result = await this.jwtService.verifyAsync(refreshToken)
		if (!result) throw new UnauthorizedException('Invalid token or expired')
	}
}
