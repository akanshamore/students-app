"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "./authContext";
import StudentsPage from "./components/StudentsPage";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    router.push("/login");
  }
  return (
    <div>
      <StudentsPage />
    </div>
  );
}
