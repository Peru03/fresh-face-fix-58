import { useState, useEffect } from "react";
import { User, Mail, DollarSign, Lock, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchUserProfile, updateUserProfile } from "@/store/slices/authSlice";
import { toast } from "@/hooks/use-toast";

const Profile = () => {
  const dispatch = useAppDispatch();
  const { user, profile: userProfile, isLoading } = useAppSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("profile");
  
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    budget: "",
    savingsGoal: "",
  });

  useEffect(() => {
    if (user) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (userProfile) {
      setProfile({
        name: userProfile.name || "",
        email: user?.email || "",
        phone: userProfile.phone || "",
        location: userProfile.location || "",
        budget: userProfile.budget?.toString() || "",
        savingsGoal: userProfile.savingsGoal?.toString() || "",
      });
    }
  }, [userProfile, user]);

  const handleSave = async () => {
    try {
      await dispatch(updateUserProfile({
        name: profile.name,
        phone: profile.phone,
        location: profile.location,
        budget: parseFloat(profile.budget) || undefined,
        savingsGoal: parseFloat(profile.savingsGoal) || undefined,
      })).unwrap();
      toast({ title: "Profile updated successfully!" });
    } catch (error: any) {
      toast({ title: "Error", description: error, variant: "destructive" });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6 flex items-center justify-center">
        <p className="text-muted-foreground">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-secondary/50 max-w-md">
          <TabsTrigger value="profile" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <User className="w-4 h-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Lock className="w-4 h-4 mr-2" />
            Security
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card className="border-border max-w-2xl">
            <CardHeader>
              <CardTitle className="text-foreground">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar */}
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground text-2xl font-bold shadow-glow-primary">
                  {profile.name ? profile.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div>
                  <Button variant="outline" size="sm" className="border-border">
                    Change Avatar
                  </Button>
                  <p className="text-xs text-muted-foreground mt-1">
                    JPG, PNG or GIF (MAX. 2MB)
                  </p>
                </div>
              </div>

              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="pl-10 bg-background/50 border-border"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    className="pl-10 bg-background/50 border-border"
                    disabled
                  />
                </div>
                <p className="text-xs text-muted-foreground">Email cannot be changed</p>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="bg-background/50 border-border"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-medium">
                  Location
                </Label>
                <Input
                  id="location"
                  type="text"
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  className="bg-background/50 border-border"
                  placeholder="City, Country"
                />
              </div>

              {/* Monthly Budget */}
              <div className="space-y-2">
                <Label htmlFor="budget" className="text-sm font-medium">
                  Monthly Budget
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="budget"
                    type="number"
                    value={profile.budget}
                    onChange={(e) => setProfile({ ...profile, budget: e.target.value })}
                    className="pl-10 bg-background/50 border-border"
                  />
                </div>
              </div>

              {/* Savings Goal */}
              <div className="space-y-2">
                <Label htmlFor="savingsGoal" className="text-sm font-medium">
                  Savings Goal
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="savingsGoal"
                    type="number"
                    value={profile.savingsGoal}
                    onChange={(e) => setProfile({ ...profile, savingsGoal: e.target.value })}
                    className="pl-10 bg-background/50 border-border"
                  />
                </div>
              </div>

              <Button 
                onClick={handleSave}
                className="w-full bg-gradient-primary text-primary-foreground shadow-glow-primary hover:opacity-90"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card className="border-border max-w-2xl">
            <CardHeader>
              <CardTitle className="text-foreground">Change Password</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Current Password */}
              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="text-sm font-medium">
                  Current Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="currentPassword"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 bg-background/50 border-border"
                  />
                </div>
              </div>

              {/* New Password */}
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-sm font-medium">
                  New Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 bg-background/50 border-border"
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium">
                  Confirm New Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 bg-background/50 border-border"
                  />
                </div>
              </div>

              <div className="p-4 rounded-lg bg-secondary/30 border border-border">
                <p className="text-sm text-muted-foreground">
                  Password requirements:
                </p>
                <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                  <li>• At least 8 characters long</li>
                  <li>• Include uppercase and lowercase letters</li>
                  <li>• Include at least one number</li>
                  <li>• Include at least one special character</li>
                </ul>
              </div>

              <Button className="w-full bg-gradient-primary text-primary-foreground shadow-glow-primary hover:opacity-90">
                <Save className="w-4 h-4 mr-2" />
                Update Password
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
