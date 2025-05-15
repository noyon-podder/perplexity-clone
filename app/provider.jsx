"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";
import { supabase } from "../services/supabase";
import { UserDetailContext } from "../context/UserDetailContext";

function Provider({ children }) {
  const { user } = useUser();
  const [userDetails, setUserDetails] = React.useState();

  useEffect(() => {
    user && CreateNewUser();
  }, [user]);

  const CreateNewUser = async () => {
    // If user already exists

    let { data: Users, error } = await supabase
      .from("Users")
      .select("*")
      .eq("email", user?.primaryEmailAddress.emailAddress);

    console.log("Users", Users);
    if (Users.length == 0) {
      const { data, error } = await supabase
        .from("Users")
        .insert([
          {
            name: user?.fullName,
            email: user?.primaryEmailAddress.emailAddress,
          },
        ])
        .select();

      setUserDetails(data[0]);
      return;
    }

    setUserDetails(Users[0]);
  };

  return (
    <UserDetailContext.Provider value={(userDetails, setUserDetails)}>
      <div className="w-full">{children}</div>
    </UserDetailContext.Provider>
  );
}

export default Provider;
