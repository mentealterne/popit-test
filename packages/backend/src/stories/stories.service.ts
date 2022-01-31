import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Campaign from 'src/campaigns/campaign.entity';
import { Repository } from 'typeorm';
import StoryDTO from './story.dto';
import Story from './story.entity';

@Injectable()
export class StoriesService {
  constructor(
    @InjectRepository(Story)
    private storiesRepository: Repository<Story>,
    @InjectRepository(Campaign)
    private campaignsRepository: Repository<Campaign>,
  ) {}
  async getAll(): Promise<Story[]> {
    return await this.storiesRepository.find();
  }

  async getById(storyId: number): Promise<Story> {
    return await this.storiesRepository.findOne(storyId);
  }

  async create(story: StoryDTO): Promise<void> {
    await this.storiesRepository.save({
      ...story,
      campaign: await this.campaignsRepository.findOne(story.campaignId),
    });
  }

  async edit(storyId: number, story: StoryDTO) {
    return await this.storiesRepository.update(storyId, {
      ...story,
      campaign: await this.campaignsRepository.findOne(story.campaignId),
    });
  }

  async remove(storyId: number): Promise<void> {
    await this.storiesRepository.delete(storyId);
  }
}
