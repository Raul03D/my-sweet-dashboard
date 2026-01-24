import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { useProfile, useUpdateProfile } from '@/hooks/useProfile';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Loader2, Save } from 'lucide-react';
import { z } from 'zod';

const profileSchema = z.object({
  full_name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  bio: z.string().max(500, 'Bio is too long').optional(),
});

export default function Profile() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: profile, isLoading: profileLoading } = useProfile();
  const updateProfile = useUpdateProfile();

  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '');
      setBio(profile.bio || '');
    }
  }, [profile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const validation = profileSchema.safeParse({ full_name: fullName, bio: bio || undefined });
    if (!validation.success) {
      setError(validation.error.errors[0].message);
      return;
    }

    updateProfile.mutate({
      full_name: fullName.trim(),
      bio: bio.trim() || null,
    });
  };

  const initials = fullName
    ? fullName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : user?.email?.charAt(0).toUpperCase() || 'U';

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-6 py-8 max-w-2xl">
        <Button
          variant="ghost"
          className="gap-2 mb-6"
          onClick={() => navigate('/dashboard')}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <CardContent>
            {profileLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center gap-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={profile?.avatar_url || undefined} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{fullName || 'Your Name'}</h3>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                  </div>
                </div>

                {error && <p className="text-sm text-destructive">{error}</p>}

                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="input-focus"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={user?.email || ''}
                    disabled
                    className="bg-muted"
                  />
                  <p className="text-xs text-muted-foreground">
                    Email cannot be changed
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us about yourself..."
                    className="input-focus resize-none"
                    rows={4}
                  />
                </div>

                <Button type="submit" disabled={updateProfile.isPending} className="gap-2">
                  {updateProfile.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
