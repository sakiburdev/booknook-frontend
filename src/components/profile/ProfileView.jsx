"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { BookBookmark, Check, ImagePlus, Mail } from "lucide-react";

const ProfileView = () => {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [saving, setSaving] = useState(false);

  // সেশন লোড হলে ইউজারের বর্তমান নাম ও প্রোফাইল ছবির URL ফর্মে বসানো হয়
  useEffect(() => {
    if (session?.user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setName(session.user.name || "");
      setImageUrl(session.user.image || "");
    }
  }, [session?.user]);

  // নাম ও প্রোফাইল ইমেজ URL একসাথে আপডেট — Better Auth এর updateUser ব্যবহার করে
  const handleSaveProfile = async (event) => {
    event.preventDefault();

    const updatedName = name.trim();
    const updatedImage = imageUrl.trim();

    if (!updatedName) {
      toast.error("Name cannot be empty");
      return;
    }

    setSaving(true);

    const { error } = await authClient.updateUser({
      name: updatedName,
      image: updatedImage || null,
    });

    setSaving(false);

    if (error) {
      toast.error(error.message || "Could not update your profile");
      return;
    }

    toast.success("Profile updated successfully");
    router.refresh();
  };

  if (isPending || !session?.user) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10">
        <Skeleton className="mb-6 h-9 w-40 max-w-full" />
        <Skeleton className="h-96 w-full rounded-3xl" />
      </div>
    );
  }

  const user = session.user;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="max-w-xl">
        <p className="text-sm font-medium text-primary">Your account</p>

        <h1 className="mt-1 text-3xl font-bold md:text-4xl">Profile</h1>

        <p className="mt-2 text-muted-foreground">
          Your login details and personal information on BookNook.
        </p>
      </div>

      <Card className="mt-6">
        <CardContent className="pt-6">
          {/* Identity header */}
          <div className="flex items-center gap-4">
            <Avatar size="lg" className="size-16 border">
              <AvatarImage src={user.image || ""} alt={user.name || "User"} />
              <AvatarFallback className="text-xl">
                {user.name?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0">
              <p className="truncate text-lg font-semibold">
                {user.name || "User"}
              </p>

              <p className="truncate text-sm text-muted-foreground">
                {user.email}
              </p>
            </div>

            <Badge variant="secondary" className="ml-auto shrink-0">
              Active
            </Badge>
          </div>

          {/* Account details (read-only) */}
          <div className="mt-6 grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">
                <Mail className="inline size-4" /> Email
              </Label>

              <Input id="email" value={user.email} readOnly />

              <p className="text-xs text-muted-foreground">
                Managed by your login provider.
              </p>
            </div>
          </div>

          {/* Name and image URL update form */}
          <form onSubmit={handleSaveProfile} className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                <BookBookmark className="inline size-4" /> Name
              </Label>

              <Input
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />

              <p className="text-xs text-muted-foreground">
                This is how your name will appear as a book owner and borrower.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl">
                <ImagePlus className="inline size-4" /> Profile Image URL
              </Label>

              <Input
                id="imageUrl"
                type="url"
                placeholder="https://example.com/your-photo.jpg"
                value={imageUrl}
                onChange={(event) => setImageUrl(event.target.value)}
              />

              <p className="text-xs text-muted-foreground">
                This link is shown as your profile photo. Leave it empty to use
                your default avatar.
              </p>
            </div>

            <Button type="submit" disabled={saving}>
              <Check className="size-4" />
              {saving ? "Saving..." : "Save changes"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileView;
