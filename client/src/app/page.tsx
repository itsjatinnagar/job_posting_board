import Card from "@/components/Card";
import EmailVerifyForm from "@/components/EmailVerifyForm";
import Header from "@/components/Header";
import MobileVerifyForm from "@/components/MobileVerifyForm";
import Placeholder from "@/components/Placeholder";
import SignupForm from "@/components/SignupForm";
import { useUser } from "@/contexts/user-context";

export default function Homepage() {
  const { user, verified } = useUser();

  return (
    <div className="min-h-svh flex flex-col">
      <Header />
      <main className="mx-auto container flex-1 px-5 py-10 text-center grid items-center justify-items-center grid-cols-1 gap-10 lg:grid-cols-2">
        <Placeholder />
        <Card title="Sign Up" subTitle="Lorem Ipsum is simply dummy text">
          {user != null && !verified ? (
            <>
              <EmailVerifyForm />
              <MobileVerifyForm />
            </>
          ) : (
            <SignupForm />
          )}
        </Card>
      </main>
    </div>
  );
}
