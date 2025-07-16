import React from "react";
import Sidebar from "@/components/Sidebar";
import MobileNavigation from "@/components/MobileNavigation";
import Header from "@/components/Header";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/actions/user.action";
import { Toaster } from "@/components/ui/toaster";

export const dynamic = "force-dynamic";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return redirect("/sign-in");
  }
  return (
    <main className="flex h-screen">
      <Sidebar
        {...currentUser}
        // fullName={currentUser.fullName}
        // avatar={currentUser.avatar}
        // email={currentUser.email}
      />

      <section className="flex h-full flex-1 flex-col">
        <MobileNavigation {...currentUser} />
        <Header userId={currentUser.$id} accountId={currentUser.accountId} />

        <div className="main-content">{children}</div>
      </section>
      <Toaster />
    </main>
  );
};
export default Layout;
