import mongoose from 'mongoose';

export interface ISource {
  title: string;
  url: string;
}

export interface ISection {
  title: string;
  timestamp: string;
  sources: ISource[];
}

export interface IEpisode {
  _id?: string;
  id: string;
  title: string;
  date: string;
  description: string;
  spotifyUrl: string;
  sections: ISection[];
  isLatest: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const sourceSchema = new mongoose.Schema<ISource>({
  title: { type: String, required: true },
  url: { type: String, required: true },
});

const sectionSchema = new mongoose.Schema<ISection>({
  title: { type: String, required: true },
  timestamp: { type: String, required: true },
  sources: [sourceSchema],
});

const episodeSchema = new mongoose.Schema<IEpisode>({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String, required: true },
  spotifyUrl: { type: String, required: true },
  sections: [sectionSchema],
  isLatest: { type: Boolean, default: false },
}, {
  timestamps: true,
});

// Ensure only one episode can be marked as latest
episodeSchema.pre('save', async function(next) {
  if (this.isLatest) {
    await mongoose.model('Episode').updateMany(
      { _id: { $ne: this._id } },
      { isLatest: false }
    );
  }
  next();
});

export default mongoose.models.Episode || mongoose.model<IEpisode>('Episode', episodeSchema); 