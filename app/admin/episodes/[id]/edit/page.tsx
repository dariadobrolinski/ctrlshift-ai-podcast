'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Plus, Trash2, Save, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface Source {
  title: string;
  url: string;
}

interface Section {
  title: string;
  timestamp: string;
  sources: Source[];
}

interface Episode {
  _id: string;
  id: string;
  title: string;
  date: string;
  description: string;
  spotifyUrl: string;
  sections: Section[];
  isLatest: boolean;
}

export default function EditEpisode({ params }: { params: Promise<{ id: string }> }) {
  const [episodeId, setEpisodeId] = useState<string>('');

  useEffect(() => {
    // Extract the ID from the params promise
    params.then(({ id }) => setEpisodeId(id));
  }, [params]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    date: '',
    description: '',
    spotifyUrl: '',
  });

  const [sections, setSections] = useState<Section[]>([
    {
      title: '',
      timestamp: '',
      sources: [{ title: '', url: '' }],
    },
  ]);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    if (episodeId) {
      fetchEpisode();
    }
  }, [router, episodeId]);

  const fetchEpisode = async () => {
    try {
      const response = await fetch(`/api/episodes/${episodeId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch episode');
      }
      const episode: Episode = await response.json();
      
      setFormData({
        title: episode.title,
        date: episode.date,
        description: episode.description,
        spotifyUrl: episode.spotifyUrl,
      });
      
      setSections(episode.sections.length > 0 ? episode.sections : [
        {
          title: '',
          timestamp: '',
          sources: [{ title: '', url: '' }],
        },
      ]);
    } catch (err) {
      setError('Failed to load episode');
    } finally {
      setLoading(false);
    }
  };

  const addSection = () => {
    setSections([
      ...sections,
      {
        title: '',
        timestamp: '',
        sources: [{ title: '', url: '' }],
      },
    ]);
  };

  const removeSection = (index: number) => {
    if (sections.length > 1) {
      setSections(sections.filter((_, i) => i !== index));
    }
  };

  const updateSection = (index: number, field: keyof Section, value: string) => {
    const newSections = [...sections];
    newSections[index] = { ...newSections[index], [field]: value };
    setSections(newSections);
  };

  const addSource = (sectionIndex: number) => {
    const newSections = [...sections];
    newSections[sectionIndex].sources.push({ title: '', url: '' });
    setSections(newSections);
  };

  const removeSource = (sectionIndex: number, sourceIndex: number) => {
    const newSections = [...sections];
    if (newSections[sectionIndex].sources.length > 1) {
      newSections[sectionIndex].sources.splice(sourceIndex, 1);
      setSections(newSections);
    }
  };

  const updateSource = (sectionIndex: number, sourceIndex: number, field: keyof Source, value: string) => {
    const newSections = [...sections];
    newSections[sectionIndex].sources[sourceIndex] = {
      ...newSections[sectionIndex].sources[sourceIndex],
      [field]: value,
    };
    setSections(newSections);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        throw new Error('Not authenticated');
      }

      const episodeData = {
        ...formData,
        sections: sections.filter(section => 
          section.title.trim() && section.timestamp.trim() && 
          section.sources.some(source => source.title.trim() && source.url.trim())
        ),
      };

      const response = await fetch(`/api/episodes/${episodeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(episodeData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update episode');
      }

      setSuccess('Episode updated successfully!');
      setTimeout(() => {
        router.push('/admin/dashboard');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update episode');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading episode...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/50">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Edit Episode</h1>
            <p className="text-muted-foreground">Update episode information</p>
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-6">
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Episode Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Episode Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    disabled={saving}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Publication Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                    disabled={saving}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  disabled={saving}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="spotifyUrl">Spotify Episode URL</Label>
                <Input
                  id="spotifyUrl"
                  type="url"
                  value={formData.spotifyUrl}
                  onChange={(e) => setFormData({ ...formData, spotifyUrl: e.target.value })}
                  required
                  disabled={saving}
                  placeholder="https://open.spotify.com/episode/..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Sections */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Episode Sections & Sources</CardTitle>
                <Button type="button" onClick={addSection} variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Section
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {sections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="space-y-4 p-4 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Section {sectionIndex + 1}</h3>
                    {sections.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => removeSection(sectionIndex)}
                        variant="ghost"
                        size="sm"
                        className="text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Section Title</Label>
                      <Input
                        value={section.title}
                        onChange={(e) => updateSection(sectionIndex, 'title', e.target.value)}
                        required
                        disabled={saving}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Timestamp</Label>
                      <Input
                        value={section.timestamp}
                        onChange={(e) => updateSection(sectionIndex, 'timestamp', e.target.value)}
                        required
                        disabled={saving}
                        placeholder="00:00:00 - 00:15:00"
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label>Sources</Label>
                      <Button
                        type="button"
                        onClick={() => addSource(sectionIndex)}
                        variant="outline"
                        size="sm"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Source
                      </Button>
                    </div>
                    
                    {section.sources.map((source, sourceIndex) => (
                      <div key={sourceIndex} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Source Title</Label>
                          <Input
                            value={source.title}
                            onChange={(e) => updateSource(sectionIndex, sourceIndex, 'title', e.target.value)}
                            required
                            disabled={saving}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Source URL</Label>
                          <div className="flex gap-2">
                            <Input
                              value={source.url}
                              onChange={(e) => updateSource(sectionIndex, sourceIndex, 'url', e.target.value)}
                              required
                              disabled={saving}
                              type="url"
                            />
                            {section.sources.length > 1 && (
                              <Button
                                type="button"
                                onClick={() => removeSource(sectionIndex, sourceIndex)}
                                variant="ghost"
                                size="sm"
                                className="text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" asChild>
              <Link href="/admin/dashboard">Cancel</Link>
            </Button>
            <Button type="submit" disabled={saving}>
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
} 