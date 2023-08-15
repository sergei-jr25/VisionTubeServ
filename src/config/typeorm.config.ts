import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const getTypeOrmConfig = async (
	configService: ConfigService
): Promise<TypeOrmModuleOptions> => ({
	type: 'postgres',
	host: 'ep-floral-mouse-26014417-pooler.eu-central-1.postgres.vercel-storage.com',
	port: 5432,
	database: 'verceldb',
	username: 'default',
	password: '4BxPXGzb2hyc',
	autoLoadEntities: true,
	synchronize: true,
	ssl: {
		rejectUnauthorized: true
	}
})
// export const getTypeOrmConfig = async (
// 	configService: ConfigService
// ): Promise<TypeOrmModuleOptions> => ({
// 	type: 'postgres',
// 	host: configService.get('HOST'),
// 	port: configService.get('PORT'),
// 	database: configService.get('DATABASE'),
// 	username: configService.get('USERNAME2'),
// 	password: configService.get('PASSWORD')
// })
