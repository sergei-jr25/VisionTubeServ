import { Base } from 'src/utils/base'
import { VideoEntity } from 'src/video/entities/video.entity'
import { Column, Entity, OneToMany } from 'typeorm'
import { SubscriptionEntity } from './subscription'

@Entity('User')
export class UserEntity extends Base {
	@Column({ unique: true })
	email: string

	@Column({ select: false })
	password: string

	@Column({ default: '' })
	name: string

	@Column({ default: false, name: 'is_verified' })
	isVerified: boolean

	@Column({ default: 0, name: 'subscriber_count' })
	subscriberCount?: number

	@Column({ default: '', type: 'text' })
	description: string

	@Column({ default: '', name: 'avatar_path' })
	avatarPath: string

	@OneToMany(() => VideoEntity, video => video.user)
	videos: VideoEntity[]

	@OneToMany(() => SubscriptionEntity, sub => sub.toChannel)
	subscribers: SubscriptionEntity[]

	@OneToMany(() => SubscriptionEntity, sub => sub.fromUser )
	subscriptions: SubscriptionEntity[]
}
