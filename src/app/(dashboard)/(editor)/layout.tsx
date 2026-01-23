import { Provider } from "jotai";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <Provider>{children}</Provider>;
}
