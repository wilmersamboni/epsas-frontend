import  {title, subtitle, GithubIcon, DashboardCards } from "@/components";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        
        <div className="inline-block max-w-lg text-center justify-center">
          <span className={title()}>Bienvenido a &nbsp;</span>
          <span className={title({ color: "violet" })}>Epsas&nbsp;</span>
          <br />
        </div>

        {/* Aquí insertas el Dashboard */}
        <DashboardCards />

      </section>
    </DefaultLayout>
  );
}
