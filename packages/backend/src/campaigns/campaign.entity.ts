import Story from '../stories/story.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Campaign {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', unique: true })
  public company: string;

  @Column({ type: 'boolean', default: false })
  public open: boolean;

  @Column({ type: 'date' })
  public createdAt: Date;

  @OneToMany(() => Story, (story) => story.campaign)
  stories: Story[];
}

export default Campaign;
