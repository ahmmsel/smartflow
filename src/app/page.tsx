import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";

export default async function Page() {
  await requireAuth();

  const users = await caller.getUsers();

  return <div>{JSON.stringify(users)}</div>;
}
