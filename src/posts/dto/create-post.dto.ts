import { IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsUrl({ require_tld: false })
  @IsOptional()
  imageUrl?: string;
}
