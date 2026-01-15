import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";

export default async function Page() {
  const users = await prisma.user.findMany();

  console.log("Users:", users);
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Button>Click Me</Button>
    </div>
  );
}
