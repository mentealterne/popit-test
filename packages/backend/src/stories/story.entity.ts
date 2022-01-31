import Campaign from 'src/campaigns/campaign.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Story {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar' })
  public ig_id: string;

  @Column({ type: 'bigint' })
  public views: number;

  @Column({ type: 'bigint' })
  public swipes: number;

  @Column({ type: 'bigint' })
  public clicks: number;

  @Column({ type: 'date' })
  public postedAt: Date;

  @ManyToOne(() => Campaign, (campaign) => campaign.stories)
  campaign: Campaign;
}

export default Story;
