import { Injectable } from '@nestjs/common';
import { Video } from './video.model';

@Injectable()
export class VideoService {
  private videos: Video[] = [
    {
      id: '1',
      title: 'Video 1 ejemplo',
      url: 'https://dinetik/video1.mp4',
      description: 'Descripción de video 1',
      tags: ['tag1', 'tag2'],
    },
    {
      id: '2',
      title: 'Video 2 ejemplo',
      url: 'https://dinetik/video2.mp4',
      description: 'Descripción de video 2',
    },
  ];

  getAll(): Video[] {
    return this.videos;
  }

  add(video: Video) {
    this.videos.push(video);
  }
}

