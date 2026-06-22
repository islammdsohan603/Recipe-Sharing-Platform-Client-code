export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0c0604] dark:bg-black">
      <div className="flex flex-col items-center gap-4">
        <span className="loading loading-spinner loading-lg text-orange-500"></span>
        <h2 className="text-xl font-semibold text-orange-400 animate-pulse">
          Cooking up something delicious...
        </h2>
      </div>
    </div>
  );
}
