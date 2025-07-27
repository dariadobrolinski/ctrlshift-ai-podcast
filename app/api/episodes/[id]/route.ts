import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Episode from '@/lib/models/Episode';
import { isAuthenticated } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const episode = await Episode.findOne({ id: params.id });
    
    if (!episode) {
      return NextResponse.json(
        { error: 'Episode not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(episode);
    
  } catch (error) {
    console.error('Get episode error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Update episode (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    await dbConnect();
    
    const episodeData = await request.json();
    
    // Find the episode to update
    const episode = await Episode.findOne({ id: params.id });
    
    if (!episode) {
      return NextResponse.json(
        { error: 'Episode not found' },
        { status: 404 }
      );
    }
    
    // Update the episode
    const updatedEpisode = await Episode.findByIdAndUpdate(
      episode._id,
      episodeData,
      { new: true, runValidators: true }
    );
    
    return NextResponse.json(updatedEpisode);
    
  } catch (error) {
    console.error('Update episode error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Delete episode (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    await dbConnect();
    
    // Find the episode to delete
    const episode = await Episode.findOne({ id: params.id });
    
    if (!episode) {
      return NextResponse.json(
        { error: 'Episode not found' },
        { status: 404 }
      );
    }
    
    // Delete the episode
    await Episode.findByIdAndDelete(episode._id);
    
    return NextResponse.json({ message: 'Episode deleted successfully' });
    
  } catch (error) {
    console.error('Delete episode error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 