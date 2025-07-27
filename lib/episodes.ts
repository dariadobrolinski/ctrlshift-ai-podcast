import dbConnect from './db';
import Episode, { IEpisode } from './models/Episode';

export async function getLatestEpisode(): Promise<IEpisode | null> {
  try {
    await dbConnect();
    const episode = await Episode.findOne({ isLatest: true });
    return episode;
  } catch (error) {
    console.error('Error fetching latest episode:', error);
    return null;
  }
}

export async function getAllEpisodes(): Promise<IEpisode[]> {
  try {
    await dbConnect();
    const episodes = await Episode.find().sort({ createdAt: -1 });
    return episodes;
  } catch (error) {
    console.error('Error fetching episodes:', error);
    return [];
  }
}

export async function getEpisodeById(id: string): Promise<IEpisode | null> {
  try {
    await dbConnect();
    const episode = await Episode.findOne({ id });
    return episode;
  } catch (error) {
    console.error('Error fetching episode:', error);
    return null;
  }
} 