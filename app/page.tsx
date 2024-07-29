"use client";

// Example component
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to a new page
    router.push("/task/list");
  }, [router]);

  return <div>Redirecting...</div>;
}
