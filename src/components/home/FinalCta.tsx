import { Button } from "@/components/ui/Button";
import Link from "next/link";

export function FinalCta() {
  return (
    <section className="py-16 md:py-20">
      <div className="container-yardwise">
        <div className="overflow-hidden rounded-[24px] bg-deep-green px-6 py-12 text-center text-soft-sage md:px-12">
          <h2 className="text-3xl text-white md:text-4xl">
            Ready to Start Your Next Project?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sage">
            Get a clearer idea of what you need before heading to the garden center.
          </p>
          <div className="mt-8">
            <Link href="/tools/mulch-calculator">
              <Button
                size="lg"
                className="bg-clay text-white hover:bg-[#b56d48]"
              >
                Calculate Your Mulch
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
