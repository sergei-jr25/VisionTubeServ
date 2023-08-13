import { UserEntity } from 'src/users/entities/user.entity'
import { Base } from 'src/utils/base'
import { VideoEntity } from 'src/video/entities/video.entity'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'

@Entity()
export class CommentEntity extends Base {
	@Column({ type: 'text' })
	message: string

	@ManyToOne(() => UserEntity)
	@JoinColumn({ name: 'user_id' })
	user: UserEntity

	@ManyToOne(() => VideoEntity, video => video.comments)
	@JoinColumn({ name: 'video_id' })
	video: VideoEntity
}
