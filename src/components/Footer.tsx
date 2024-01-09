import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-5xl space-y-5 px-3 py-5">
        <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:justify-between">
          <div className="flex flex-col items-center justify-center space-y-2 md:items-start md:justify-start">
            <div className="flex items-center gap-1">
              <Image
                src="/assets/logo.png"
                alt="Job Hub logo"
                width={25}
                height={25}
                priority
                quality={95}
              />
              <h3 className="text-xl font-semibold">Job Hub</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Connecting talents with opportunities
            </p>
          </div>
          <div className="flex flex-wrap gap-5 text-sm text-muted-foreground">
            <Link href="/about" className="hover:underline">
              About Us
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
            <Link href="/terms" className="hover:underline">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
        <div className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Job Hub, Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
