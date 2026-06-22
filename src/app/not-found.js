import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0c0604] dark:bg-black px-4">
      <div className="text-center">
        <div className="mb-6 inline-flex h-32 w-32 items-center justify-center rounded-full bg-orange-500/10">
          <span className="text-6xl text-orange-500">404</span>
        </div>
        <h1 className="mb-4 text-4xl font-bold text-white">
          Oops! Recipe Not Found
        </h1>
        <p className="mb-8 text-[#cdb7aa]">
          Looks like someone ate this page. We can&apos;t find what you&apos;re looking for.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
