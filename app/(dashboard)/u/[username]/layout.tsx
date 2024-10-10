import { getSelfByUsername } from "@/lib/auth-service";
import { redirect } from "next/navigation";
import { Metadata } from "next";

import { Navbar } from "./_components/navbar";
import Sidebar from "./_components/sidebar";
import { Container } from "./_components/container";

export const metadata: Metadata = {
  title: "Dashboard",
};

interface CreatorLayout {
  params: { username: string };
  children: React.ReactNode;
}

const layout = async ({ params, children }: CreatorLayout) => {
  const self = await getSelfByUsername(params.username);

  if (!self) redirect("/");
  return (
    <div>
      <Navbar />
      <div className="flex h-full pt-20">
        <Sidebar />
        <Container>{children}</Container>
      </div>
    </div>
  );
};

export default layout;
