import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { VideoEntity } from 'src/video/entities/video.entity'
import { SubscriptionEntity } from './entities/subscription'
import { UserEntity } from './entities/user.entity'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
	controllers: [UsersController],
	providers: [UsersService],
	imports: [
		ConfigModule,
		TypeOrmModule.forFeature([UserEntity, SubscriptionEntity, VideoEntity])
	]
})
export class UsersModule {}
