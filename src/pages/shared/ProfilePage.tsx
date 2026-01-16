import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Camera, Key, Globe, LogOut } from 'lucide-react';
import BackButton from '@/components/navigation/BackButton';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30 p-4 md:p-8">
      <div className="max-w-md mx-auto">
        <BackButton dashboardPath="/" />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-foreground">Profile</h1>
          <p className="text-muted-foreground mt-2">Manage your account settings</p>
        </motion.div>

        {/* Avatar */}
        <GlassCard className="p-6 text-center mb-6">
          <div className="relative inline-block">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white text-3xl font-bold">
              <User className="w-10 h-10" />
            </div>
            <Button
              size="icon"
              className="absolute bottom-0 right-0 rounded-full w-8 h-8"
            >
              <Camera className="w-4 h-4" />
            </Button>
          </div>
          <h2 className="text-xl font-bold mt-4">John Doe</h2>
          <p className="text-muted-foreground">Adviser - Grade 10-A</p>
        </GlassCard>

        {/* Settings */}
        <div className="space-y-4">
          <GlassCard className="p-4">
            <div className="flex items-center gap-3 mb-4">
              <Key className="w-5 h-5 text-primary" />
              <span className="font-medium">Change Password</span>
            </div>
            <div className="space-y-3">
              <div>
                <Label htmlFor="current">Current Password</Label>
                <Input id="current" type="password" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="new">New Password</Label>
                <Input id="new" type="password" className="mt-1" />
              </div>
              <Button className="w-full">Update Password</Button>
            </div>
          </GlassCard>

          <GlassCard className="p-4">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-5 h-5 text-primary" />
              <span className="font-medium">Language</span>
            </div>
            <Select defaultValue="en">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="fil">Filipino</SelectItem>
              </SelectContent>
            </Select>
          </GlassCard>

          <Button variant="destructive" className="w-full gap-2">
            <LogOut className="w-4 h-4" /> Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
