import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="max-w-3xl mx-auto">{children}</div>;
}
