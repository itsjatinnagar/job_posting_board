import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { KeyRound, Loader2, Mail, Phone, User, Users } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useUser } from "@/contexts/user-context";
import { ENDPOINT } from "@/constants";

const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  mobile: z.string().length(10, "Must contain exactly 10 digits"),
  role: z.literal("company"),
  password: z.string().min(8),
  companyName: z.string().min(1),
  employeeSize: z.coerce.number().gte(1),
});

const iconClass =
  "absolute left-3 top-1/2 -translate-y-1/2 stroke-muted-foreground peer-focus-visible:stroke-black";

export default function SignupForm() {
  const { setUser } = useUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      role: "company",
      companyName: "",
      employeeSize: 1,
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await fetch(`${ENDPOINT}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(values),
      });
      const data = await res.json();
      toast(data.message);
      if (data.status) {
        setUser(data.user);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-10 space-y-6 text-left"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <div className="relative">
                <FormControl>
                  <Input className="pl-12" placeholder="Name" {...field} />
                </FormControl>
                <User className={iconClass} />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mobile"
          render={({ field }) => (
            <FormItem>
              <div className="relative">
                <FormControl>
                  <Input className="pl-12" placeholder="Phone no." {...field} />
                </FormControl>
                <Phone className={iconClass} />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <div className="relative">
                <FormControl>
                  <Input
                    className="pl-12"
                    placeholder="Company Name"
                    {...field}
                  />
                </FormControl>
                <User className={iconClass} />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div className="relative">
                <FormControl>
                  <Input
                    className="pl-12"
                    placeholder="Company Email"
                    {...field}
                  />
                </FormControl>
                <Mail className={iconClass} />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="employeeSize"
          render={({ field }) => (
            <FormItem>
              <div className="relative">
                <FormControl>
                  <Input
                    className="pl-12"
                    placeholder="Employee Size"
                    {...field}
                  />
                </FormControl>
                <Users className={iconClass} />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="relative">
                <FormControl>
                  <Input
                    className="pl-12"
                    placeholder="Password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <KeyRound className={iconClass} />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Message />
        <SubmitButton isPending={form.formState.isSubmitting} />
      </form>
    </Form>
  );
}

function Message() {
  return (
    <p className="mt-6 font-bold text-foreground/70">
      By clicking on proceed you wil accept our
      <br />
      <a href="#" className="text-primary/70">
        Terms
      </a>
      &nbsp;&&nbsp;
      <a href="#" className="text-primary/70">
        Conditions
      </a>
    </p>
  );
}

function SubmitButton({ isPending }: { isPending: boolean }) {
  return (
    <Button className="w-full" disabled={isPending}>
      {isPending ? <Loader2 className="animate-spin" /> : "Proceed"}
    </Button>
  );
}
