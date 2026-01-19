import { UpgradeModel } from "@/components/upgrade-modal";
import { TRPCError } from "@trpc/server";
import { useState } from "react";

export const useUpgradeModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleError = (error: unknown) => {
    if (error instanceof TRPCError) {
      if (error.code === "FORBIDDEN") {
        setIsOpen(true);
        return true;
      }
    }
    return false;
  };

  const modal = <UpgradeModel open={isOpen} onOpenChange={setIsOpen} />;

  return { handleError, modal };
};
