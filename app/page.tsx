"use client";

import { useEffect } from "react";
import AuthLoading from "@/components/AuthLoading";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

export default function Home() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/home");
    } else {
      router.push("/login");
    }
  }, [user, router]);

  return <AuthLoading/>;
}
