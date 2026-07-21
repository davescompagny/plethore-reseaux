import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <header className="border-b border-line bg-surface">
        <div className="mx-auto flex min-h-16 max-w-[1160px] items-center justify-between px-5">
          <Link href="/" className="focus-ring flex items-center gap-2.5 font-black">
            <span className="grid size-8 place-items-center rounded-lg bg-green text-sm font-black text-white">P</span>
            Pléthore Réseaux
          </Link>
          <Link href="/" className="focus-ring text-sm font-bold text-muted hover:text-green">
            Retour au site
          </Link>
        </div>
      </header>
      <main className="flex flex-1 items-center justify-center bg-cream px-5 py-12">{children}</main>
    </div>
  );
}
