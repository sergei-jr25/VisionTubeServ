import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SubscriptionEntity } from 'src/users/entities/subscription'
import { UserEntity } from '../users/entities/user.entity'
import { VideoEntity } from './entities/video.entity'
import { VideoController } from './video.controller'
import { VideoService } from './video.service'

@Module({
	imports: [
		TypeOrmModule.forFeature([VideoEntity, UserEntity, SubscriptionEntity])
	],

	controllers: [VideoController],
	providers: [VideoService]
})
export class VideoModule {}
