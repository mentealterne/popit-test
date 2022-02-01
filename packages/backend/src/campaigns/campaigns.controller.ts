import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import CampaignDTO from './campaign.dto';
import Story from 'src/stories/story.entity';
import Campaign from './campaign.entity';

@Controller('campaigns')
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  @Get('/')
  async getCampaigns(): Promise<Campaign[]> {
    return await this.campaignsService.getAll();
  }

  @Post('/')
  async createCampaign(@Body() campaign: CampaignDTO): Promise<void> {
    return await this.campaignsService.create(campaign);
  }

  @Get('/top-k-influencers')
  async getKInfluencers(
    @Query('k', ParseIntPipe) k: number,
    @Query('type') type: 'worst' | 'top',
    @Query('campaignId') campaignId?: number,
  ): Promise<Story[]> {
    return await this.campaignsService.getKInfluencers(type, k, campaignId);
  }

  @Get(':campaignId')
  async getCampaignDetails(
    @Param('campaignId', ParseIntPipe) campaignId: number,
  ): Promise<Campaign> {
    return await this.campaignsService.getById(campaignId);
  }

  @Patch(':campaignId')
  async editCampaignDetails(
    @Param('campaignId', ParseIntPipe) campaignId: number,
    @Body() campaign: CampaignDTO,
  ): Promise<void> {
    await this.campaignsService.edit(campaignId, campaign);
  }

  @Delete('campaignId')
  async deleteCampaign(@Param('campaignId', ParseIntPipe) campaignId: number) {
    return await this.campaignsService.remove(campaignId);
  }

  @Get(':campaignId/average-views')
  async getAverageViewsPerCampaign(
    @Param('campaignId', ParseIntPipe) campaignId: number,
  ) {
    return await this.campaignsService.getAverageViewsPerCampaign(campaignId);
  }
}
