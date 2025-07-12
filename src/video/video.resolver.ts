import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Video } from './video.model';
import { VideoService } from './video.service';
import { VideoFiltersInput } from './dto/video-filters.input';
import * as crypto from 'crypto';


@Resolver(() => Video)
export class VideoResolver {
  constructor(private readonly videoService: VideoService) {}

  @Query(() => [Video])
  getVideos(@Args('filters', { nullable: true }) filters?: VideoFiltersInput): Video[] {
    let videos = this.videoService.getAll();

    if (filters?.title) {
      videos = videos.filter(v =>
        v.title.toLowerCase().includes(filters.title!.toLowerCase()),
      );
    }

    if (filters?.tag) {
      videos = videos.filter(v => v.tags?.includes(filters.tag!));
    }

    return videos;
  }

  @Mutation(() => Video)
  addVideo(
    @Args('title') title: string,
    @Args('url') url: string,
    @Args('description') description: string,
    @Args({ name: 'tags', type: () => [String] }) tags: string[],
  ): Video {
    const newVideo = {
      id: crypto.randomUUID(),
      title,
      url,
      description,
      tags,
    };
    this.videoService.add(newVideo);
    return newVideo;
  }
}
