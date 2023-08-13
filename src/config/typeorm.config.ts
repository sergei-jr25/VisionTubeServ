import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const getTypeOrmConfig = async (
	configService: ConfigService
): Promise<TypeOrmModuleOptions> => ({
	type: 'postgres',
	host: '176.59.82.198',
	port: 5432,
	database: 'internet_shop',
	username: 'sergeijr',
	password: '6okBtYLu851Rr9OhAqauE2vJC9bwVZLF',
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
