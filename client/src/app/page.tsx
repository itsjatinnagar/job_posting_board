import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, User, Users } from "lucide-react";

export default function Homepage() {
  return (
    <div className="min-h-svh flex flex-col">
      <Header />
      <main className="mx-auto container px-5 py-10 text-center flex-1 grid grid-cols-1 items-center justify-items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="font-medium text-[22.24px] text-[#292929]/70 lg:text-left">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley
          </p>
        </div>
        <div className="gradient-border max-w-[620px] w-full p-10 bg-white lg:ml-auto">
          <h1 className="font-semibold text-[32px] text-black">Sign Up</h1>
          <p className="font-medium text-base text-[#292929]/70">
            Lorem Ipsum is simply dummy text
          </p>
          <form className="mt-10 space-y-6">
            <div className="relative">
              <Input placeholder="Name" />
              <User className="absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            <div className="relative">
              <Input placeholder="Phone no." />
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            <div className="relative">
              <Input placeholder="Company Name" />
              <User className="absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            <div className="relative">
              <Input placeholder="Company Email" />
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            <div className="relative">
              <Input placeholder="Employee Size" />
              <Users className="absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            <p className="mt-6 font-bold text-[#292929]/70">
              By clicking on proceed you wil accept our
              <br />
              <a href="#" className="text-[#0B66EF]/70">
                Terms
              </a>
              &nbsp;&&nbsp;
              <a href="#" className="text-[#0B66EF]/70">
                Conditions
              </a>
            </p>
            <Button className="w-full font-bold text-2xl">Proceed</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
