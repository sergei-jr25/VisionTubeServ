import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const getTypeOrmConfig = async (
	configService: ConfigService
): Promise<TypeOrmModuleOptions> => ({
	type: 'postgres',
	host: 'dpg-cjd0cr7db61s73ak8ol0-a',
	port: 5432,
	database: 'visionstude',
	username: 'sergeijr',
	password: 'gkfjLN5oWm4vwu7aQ2NkYHiNKjepe8IA',
	autoLoadEntities: true,
	synchronize: true
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
