import { useRouter } from "next/router";
import { useEffect } from "react";

export const useRedirect = (condition: boolean, route: string) => {
  const router = useRouter();
  useEffect(() => {
    if (condition) {
      router.push(route);
    }
  }, []);
};
