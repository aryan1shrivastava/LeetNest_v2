import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import Button from "./ui/Button";

const LogoutButton = ({ children, className = "" }) => {
  const { logout } = useAuthStore();

  const onLogout = async () => {
    await logout();
  };

  return (
    <Button variant="ghost" className={className} onClick={onLogout}>
      {children}
    </Button>
  );
};

export default LogoutButton;
