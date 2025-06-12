"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";

import { Layout, LayoutHeader, LayoutTitle, LayoutDescription, LayoutContent } from "./layout";

export function Page404() {
  const router = useRouter();

  return (
    <div className="container flex h-[calc(100vh-4rem)] items-center justify-center">
      <Layout className="w-full max-w-md">
        <LayoutHeader>
          <Typography className="text-9xl font-bold text-primary" variant="h1">
            404
          </Typography>
          <LayoutTitle>Page Not Found</LayoutTitle>
          <LayoutDescription>Oops! The page you arelooking for does not exist.</LayoutDescription>
        </LayoutHeader>
        <LayoutContent>
          <div className="flex justify-center">
            <Button className="gap-2" onClick={() => router.back()} variant="outline">
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
          </div>
        </LayoutContent>
      </Layout>
    </div>
  );
}
