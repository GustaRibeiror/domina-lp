import { cacheLife } from "next/cache";

/** Ano corrente, calculado em cache e revalidado diariamente. */
export async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
