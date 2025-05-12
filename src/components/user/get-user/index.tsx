import { useGetProfile } from "@/hooks";
import { useAuthStore } from "@/providers/auth-store";
import { useEffect } from "react";

export const GetUser = () => {
  const setUser = useAuthStore((state) => state.setUser);

  const { data: userRes } = useGetProfile();

  useEffect(() => {
    if (userRes?.id) {
      setUser(userRes);
    }
  }, [setUser, userRes]);

  return null;
};
