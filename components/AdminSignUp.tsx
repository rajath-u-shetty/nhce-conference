"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { Role } from "@prisma/client";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SignUpRequest, SignUpValidator } from "@/lib/validators/sign-up-validator";

const AdminSignUp = () => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<SignUpRequest>({
    resolver: zodResolver(SignUpValidator),
    defaultValues: {
      email: "",
      password: "",
      secretkey: "",
      name: ""
    },
  });

  const onSubmit = async (values: SignUpRequest) => {

    try {
      const result = await signIn("admin-credentials", {
        email: values.email,
        password: values.password,
        secretkey: values.secretkey,
        callbackUrl: "/admin",
        redirect: false,
      });

      if (result?.error) {
        toast({
          title: "Sign in failed",
          description: "Invalid credentials or secret key",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Welcome, Admin!",
          description: "Successfully signed in as admin",
          variant: "default",
        });
        router.push("/admin"); // Redirect to admin dashboard
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          toast({
            title: "Invalid secret key",
            description: "Please check your secret key and try again",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: "Something went wrong. Please try again later.",
            variant: "destructive",
          });
        }
      }

      form.reset({
        ...values,
        password: "",
        secretkey: "",
      });
    }
  };

  return (
    <Card className="rounded-xl md:px-44 px-6 py-8 md:py-6 dark:bg-[rgb(15,15,15)] bg-neutral-200 border dark:border-[rgb(162,162,162)]/20 border-black">
      <div className="space-y-2 text-center pb-8">
        <h1 className="text-3xl font-bold text-black dark:text-white">
          Admin Sign Up
        </h1>
        <p className="text-gray-500 dark:text-muted-foreground">
          Create an admin account
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="md:space-y-2 space-y-4 md:max-w-[80vw] max-w-[300px] mx-auto"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="admin@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Your name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="********"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="secretkey"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Admin Secret Key</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter admin secret key"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-4">
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full"
            >
              {form.formState.isSubmitting ? "Creating..." : "Create Admin Account"}
            </Button>
            <Link
              href="/sign-in"
              className="text-center text-muted-foreground font-semibold"
            >
              Already have an account? Sign In
            </Link>
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default AdminSignUp;
