"use client"
import { LoaderPinwheel } from "lucide-react";
import { redirect } from "next/navigation";
import React, { useEffect, useRef } from "react";

const Protected = ({ children }: { children: React.ReactNode }) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  let [isLoading, setIsLoading] = React.useState(true);
  const isAuth = true;


  useEffect(() => {
    timeoutRef.current= setTimeout(()=>{
      setIsLoading(false)
    },1000)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
    
  },[])

  if (isLoading) {
    return (
      <section className="w-screen text-orange-500 h-screen flex flex-col items-center justify-center">
        
          <LoaderPinwheel size={48} className="animate-spin" />
          <h4 className="mt-2 text-center text-zinc-400">Loading...</h4>
        
      </section>
    );
  }

  if (!isAuth) {
    redirect("/login");
    return null;
  }

  return <div>{children}</div>;
};

export default Protected;
