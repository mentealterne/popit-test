import { IsString, IsISO8601, IsOptional } from 'class-validator';

export default class StoryDTO {
  @IsString()
  public ig_id: string;

  @IsString()
  @IsOptional()
  public views?: number;

  @IsString()
  @IsOptional()
  public swipes: number;

  @IsString()
  @IsOptional()
  public clicks: number;

  @IsISO8601()
  public postedAt: Date;

  @IsString()
  public campaignId: number;
}
