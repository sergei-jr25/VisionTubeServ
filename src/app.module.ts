import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { CommentModule } from './comment/comment.module'
// import getTypeOrmConfig from './config/typeorm.config'
import { getTypeOrmConfig } from './config/typeorm.config'
import { FileModule } from './file/file.module'
import { UsersModule } from './users/users.module'
import { VideoModule } from './video/video.module'

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getTypeOrmConfig
		}),
		VideoModule,
		UsersModule,
		FileModule,
		CommentModule,
		AuthModule
	],
	controllers: [],
	providers: []
})
export class AppModule {}
