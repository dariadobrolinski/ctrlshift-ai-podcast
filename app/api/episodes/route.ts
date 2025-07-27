import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Episode from '@/lib/models/Episode';
import { isAuthenticated } from '@/lib/auth';

// GET - Get all episodes or latest episode
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const latest = searchParams.get('latest');
    
    if (latest === 'true') {
      const episode = await Episode.findOne({ isLatest: true });
      return NextResponse.json(episode);
    }
    
    const episodes = await Episode.find().sort({ createdAt: -1 });
    return NextResponse.json(episodes);
    
  } catch (error) {
    console.error('Get episodes error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create new episode (admin only)
export async function POST(request: NextRequest) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    await dbConnect();
    
    const episodeData = await request.json();
    
    // Generate unique ID
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 8);
    episodeData.id = `ep${timestamp}${randomId}`;
    
    // Set as latest episode
    episodeData.isLatest = true;
    
    const episode = new Episode(episodeData);
    await episode.save();
    
    return NextResponse.json(episode, { status: 201 });
    
  } catch (error) {
    console.error('Create episode error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 