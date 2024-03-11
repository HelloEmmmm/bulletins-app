
export default function Home() {
  return (
    <main className="flex min-h-screen">
      <div className={'w-[33.33%] bg-[red]'}>
        1
      </div>
      <div className={'flex flex-col flex-1 gap-[20px]'}>
        <div className={'bg-[yellow]'}>1</div>
        <div className={'flex-1 bg-[blue]'}>2</div>
      </div>
    </main>
  );
}
