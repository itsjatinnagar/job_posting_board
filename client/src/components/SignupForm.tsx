import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Mail, Phone, User, Users } from "lucide-react";
import { Button } from "./ui/button";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().length(10, "Phone number must be 10 digits"),
  company_name: z.string().min(1, "Company Name is required"),
  company_email: z.string().email("Company Email is required"),
  employee_size: z.number({ message: "Employee Size is required" }),
});

const iconClass =
  "absolute left-3 top-1/2 -translate-y-1/2 stroke-muted-foreground peer-focus-visible:stroke-black";

export default function SignupForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10 space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <div className="relative">
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <User className={iconClass} />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <div className="relative">
                <FormControl>
                  <Input placeholder="Phone no." {...field} />
                </FormControl>
                <Phone className={iconClass} />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="company_name"
          render={({ field }) => (
            <FormItem>
              <div className="relative">
                <FormControl>
                  <Input placeholder="Company Name" {...field} />
                </FormControl>
                <User className={iconClass} />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="company_email"
          render={({ field }) => (
            <FormItem>
              <div className="relative">
                <FormControl>
                  <Input placeholder="Company Email" {...field} />
                </FormControl>
                <Mail className={iconClass} />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="employee_size"
          render={({ field }) => (
            <FormItem>
              <div className="relative">
                <FormControl>
                  <Input placeholder="Employee Size" {...field} />
                </FormControl>
                <Users className={iconClass} />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

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

        <Button className="w-full">Proceed</Button>
      </form>
    </Form>
  );
}
