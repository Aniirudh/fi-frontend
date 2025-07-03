"use client";

import Cookies from "js-cookie";

export default function LogoutButton() {
  const handleLogout = () => {
    Cookies.remove("token");
    window.location.href = "/";
  };

  return (
    <button
      onClick={handleLogout}
      className="text-sm hover:underline focus:outline-none cursor-pointer"
    >
      Logout
    </button>
  );
}
