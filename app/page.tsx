"use client"

import {useAuth} from "@/app/hooks/useAuth";

export default function Home() {
    useAuth();

  return (
    <div className="flex min-h-screen">
      <div className={'w-[33.33%] bg-[red]'}>
        1
      </div>
      <div className={'flex flex-col flex-1 gap-[20px]'}>
        <div className={'bg-[yellow] p-[20px]'}>1</div>
        <div className={'flex-1 bg-[blue]'}>2</div>
      </div>
    </div>
  );
}
