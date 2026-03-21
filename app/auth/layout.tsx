import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-3xl mx-auto min-h-screen space-y-4">
      <div>
        <Link href="/">
          <Button className="hover:cursor-pointer" variant="secondary">
            <ArrowLeft />
            Go Back
          </Button>
        </Link>
      </div>
      {children}
    </div>
  );
}
