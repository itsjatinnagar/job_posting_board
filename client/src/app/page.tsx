import Card from "@/components/Card";
import Header from "@/components/Header";
import Placeholder from "@/components/Placeholder";
import SignupForm from "@/components/SignupForm";

export default function Homepage() {
  return (
    <div className="min-h-svh flex flex-col">
      <Header />
      <main className="mx-auto container flex-1 px-5 py-10 text-center grid items-center justify-items-center grid-cols-1 gap-10 lg:grid-cols-2">
        <Placeholder />
        <Card title="Sign Up" subTitle="Lorem Ipsum is simply dummy text">
          <SignupForm />
        </Card>
      </main>
    </div>
  );
}
