import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream px-5 text-center">
      <p className="font-display text-6xl font-[700] text-sage">404</p>
      <h1 className="mt-3 font-display text-3xl font-[400] text-slate">We couldn't find that page</h1>
      <p className="mt-2 max-w-sm text-slateM">The link may be old, or the page may have moved.</p>
      <Link href="/" className="mt-6 rounded-full bg-slate px-6 py-3 font-[600] text-cream hover:bg-[#4b2b18]">
        Back to home
      </Link>
    </div>
  );
}
