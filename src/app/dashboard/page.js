"use client";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

function Dashboard() {
  const { data: session } = useSession();
  useEffect(() => {
    console.log("test overload");
  }, [session]);
  console.log("ses", session);
  return <div>Dashboard</div>;
}

export default Dashboard;
