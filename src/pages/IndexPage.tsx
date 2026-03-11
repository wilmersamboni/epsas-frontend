import { title, DashboardCards } from "@/components";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <div className="flex flex-col items-center gap-6 py-10 px-6 w-full">
        
        <div className="text-center">
          <span className={title()}>Bienvenido a &nbsp;</span>
          <span className={title({ color: "violet" })}>Epsas</span>
        </div>

        <DashboardCards />

      </div>
    </DefaultLayout>
  );
}