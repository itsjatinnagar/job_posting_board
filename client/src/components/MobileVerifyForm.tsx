import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Check, Loader2, Phone, X } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useUser } from "@/contexts/user-context";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ENDPOINT } from "@/constants";

const formSchema = z.object({
  mode: z.literal("mobile"),
  code: z.string().length(6),
});

const iconClass =
  "absolute left-3 top-1/2 -translate-y-1/2 stroke-muted-foreground peer-focus-visible:stroke-black";

export default function MobileVerifyForm() {
  const [valid, setValid] = useState<boolean | null>(null);
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mode: "mobile",
      code: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await fetch(`${ENDPOINT}/auth/verify`, {
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
        if (data.verified) {
          setValid(true);
          setUser((prev) => ({ ...prev!, mobileVerified: true }));
          if (user!.emailVerified && user!.mobileVerified)
            navigate("/dashboard");
        } else {
          setValid(false);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10 space-y-6">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <div className="relative">
                <FormControl>
                  <Input
                    placeholder="Mobile OTP"
                    className="pl-12"
                    {...field}
                  />
                </FormControl>
                <Phone className={iconClass} />
                {valid === null ? null : valid ? (
                  <span className="absolute p-1 right-3 top-1/2 -translate-y-1/2 bg-success text-success-foreground rounded-full">
                    <Check className="h-4 w-4" />
                  </span>
                ) : (
                  <span className="absolute p-1 right-3 top-1/2 -translate-y-1/2 bg-destructive text-destructive-foreground rounded-full">
                    <X className="h-4 w-4" />
                  </span>
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Verify"
          )}
        </Button>
      </form>
    </Form>
  );
}
