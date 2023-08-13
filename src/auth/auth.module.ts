import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { getJWTConfig } from 'src/config/jwt.config'
import { SubscriptionEntity } from 'src/users/entities/subscription'
import { UserEntity } from 'src/users/entities/user.entity'
import { UsersModule } from 'src/users/users.module'
import { UsersService } from 'src/users/users.service'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './stratiges/jwt_startegies'

@Module({
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy, UsersService],
	imports: [
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJWTConfig
		}),
		UsersModule,
		TypeOrmModule.forFeature([UserEntity, SubscriptionEntity])
	]
})
export class AuthModule {}
