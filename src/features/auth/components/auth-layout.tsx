"use client";

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-svh gap-6 p-6 md:p-10">
      <div className="flex flex-col w-full max-w-sm gap-6">{children}</div>
    </div>
  );
};
