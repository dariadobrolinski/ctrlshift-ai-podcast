'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Plus, LogOut, Headphones, Calendar, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface Episode {
  _id: string;
  id: string;
  title: string;
  date: string;
  description: string;
  isLatest: boolean;
  createdAt: string;
}

export default function AdminDashboard() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    fetchEpisodes();
  }, [router]);

  const fetchEpisodes = async () => {
    try {
      const response = await fetch('/api/episodes');
      if (!response.ok) {
        throw new Error('Failed to fetch episodes');
      }
      const data = await response.json();
      setEpisodes(data);
    } catch (err) {
      setError('Failed to load episodes');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    router.push('/admin/login');
  };

  const handleDeleteEpisode = async (episodeId: string) => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setError('Not authenticated');
        return;
      }

      const response = await fetch(`/api/episodes/${episodeId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete episode');
      }

      // Refresh the episodes list
      fetchEpisodes();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete episode');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/50">
      <div className="container max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your podcast episodes</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
            <Button asChild>
              <Link href="/admin/episodes/new">
                <Plus className="h-4 w-4 mr-2" />
                Add Episode
              </Link>
            </Button>
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Episodes Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {episodes.map((episode) => (
            <Card key={episode._id || episode.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg line-clamp-2">{episode.title}</CardTitle>
                  {episode.isLatest && (
                    <Badge variant="default">Latest</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {episode.description}
                </p>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{episode.date}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Headphones className="h-4 w-4" />
                  <span>Episode {episode.id}</span>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" asChild className="flex-1">
                    <Link href={`/admin/episodes/${episode.id}/edit`}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild className="flex-1">
                    <Link href={`/sources/${episode.id}`}>
                      <Headphones className="h-4 w-4 mr-2" />
                      View
                    </Link>
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Episode</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{episode.title}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteEpisode(episode.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {episodes.length === 0 && !loading && (
          <Card className="text-center py-12">
            <CardContent>
              <Headphones className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No episodes yet</h3>
              <p className="text-muted-foreground mb-4">
                Get started by adding your first podcast episode.
              </p>
              <Button asChild>
                <Link href="/admin/episodes/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Episode
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
} 