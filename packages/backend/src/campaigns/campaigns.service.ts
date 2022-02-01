import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Story from 'src/stories/story.entity';
import { Repository } from 'typeorm';
import Campaign from './campaign.entity';
import CampaignDTO from './campaign.dto';

@Injectable()
export class CampaignsService {
  constructor(
    @InjectRepository(Campaign)
    private campaignsRepository: Repository<Campaign>,
  ) {}

  async getAll(): Promise<Campaign[]> {
    return await this.campaignsRepository.find();
  }

  async getById(campaignId: number): Promise<Campaign> {
    return await this.campaignsRepository.findOne(campaignId);
  }

  async create(campaign: CampaignDTO): Promise<void> {
    await this.campaignsRepository.save(campaign);
  }

  async edit(campaignId: number, campaign: CampaignDTO) {
    return await this.campaignsRepository.update(campaignId, campaign);
  }

  async remove(campaignId: number): Promise<void> {
    await this.campaignsRepository.delete(campaignId);
  }

  async getAverageViews() {
    const sql = `SELECT c.company, AVG(s.views) AS average_views FROM stories s LEFT JOIN campaigns c on c.id = s.campaignid GROUP BY c.company ORDER BY average_views DESC`;
    return await this.campaignsRepository.query(sql);
  }

  async getKInfluencers(
    type: 'worst' | 'top',
    k: number,
    campaignId?: number,
  ): Promise<Story[]> {
    let sql = `SELECT ig_id, SUM(views) AS views
      FROM stories`;

    if (campaignId) sql += ` WHERE campaignid = ${campaignId}`;

    sql += ` GROUP BY ig_id ORDER BY views ${
      type === 'worst' ? 'ASC' : 'DESC'
    } LIMIT ${k}`;

    return await this.campaignsRepository.query(sql);
  }
}
