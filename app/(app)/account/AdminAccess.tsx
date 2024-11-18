
'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import UserSettings from "./UserSettings";
// import { checkAuth, getUserAuth } from "@/lib/auth/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

// interface AccountPageProps {
//   session: Awaited<ReturnType<typeof getUserAuth>>['session'];
// }

export default function AdminAccessForm() {
  const [secretKey, setSecretKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ secretKey }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to add admin access');
      }

      toast({
        title: "Success",
        description: "Admin access has been granted successfully",
      });

      setSecretKey(''); // Reset form
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add admin access",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full  mx-auto">
      <CardTitle className="pt-4 pl-4 text-xl">Add Admin Access</CardTitle>
      <CardHeader className="pt-0 pl-4 text-muted-foreground">
        <p>Add an admin to your account to manage your conference.</p>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <Input
            placeholder="Enter secret key"
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
            required
          />
        </CardContent>
        <CardFooter className="border-t flex justify-between text-muted-foreground">
          <p className="text-sm mt-2">
            Admins have full access to View conference Papers
          </p>
          <Button type="submit" className="mt-2" disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Admin"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

