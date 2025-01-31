"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "./authContext";
import Header from "./components/Header";
import StudentsPage from "./components/StudentsPage";

export default function Home() {
  const { user } = useAuth();
  console.log("user", user);
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
