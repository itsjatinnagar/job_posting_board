import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { Calendar } from "../ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Tag, TagInput } from "emblor";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ENDPOINT } from "@/constants";

const formSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  level: z.enum(["Entry Level", "Mid Level", "Senior Level"]),
  candidates: z.array(z.string().email()),
  endDate: z.date(),
});

export default function CreateJobForm() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      level: "Entry Level",
      candidates: [],
      endDate: new Date(),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    values = { ...values, candidates: candidates.map((tag) => tag.text) };
    try {
      const res = await fetch(`${ENDPOINT}/jobs`, {
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
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }

  const [candidates, setCandidates] = useState<Tag[]>([]);
  const { setValue } = useForm();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-end gap-10">
                <FormLabel className="text-3xl text-black">Job Title</FormLabel>
                <div className="flex-1 max-w-2xl text-left space-y-2">
                  <FormControl>
                    <Input placeholder="Enter Job Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-end gap-10">
                <FormLabel className="text-3xl text-black">
                  Job Description
                </FormLabel>
                <div className="flex-1 max-w-2xl text-left space-y-2">
                  <FormControl>
                    <Textarea placeholder="Enter Job Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="level"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-end gap-10">
                <FormLabel className="text-3xl text-black">
                  Experience Level
                </FormLabel>
                <div className="flex-1 max-w-2xl text-left space-y-2">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Experience Level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Entry Level">Entry Level</SelectItem>
                      <SelectItem value="Mid Level">Mid Level</SelectItem>
                      <SelectItem value="Senior Level">Senior Level</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="candidates"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-end gap-10">
                <FormLabel className="text-3xl text-black">
                  Add Candidate
                </FormLabel>
                <div className="flex-1 max-w-2xl text-left space-y-2">
                  <FormControl>
                    <TagInput
                      {...field}
                      activeTagIndex={null}
                      setActiveTagIndex={() => null}
                      placeholder="Enter Candidate Email"
                      tags={candidates}
                      setTags={(newTags) => {
                        setCandidates(newTags);
                        setValue("candidates", newTags);
                      }}
                      styleClasses={{
                        tag: {
                          body: "h-12 border-input bg-background rounded-full",
                          closeButton: "text-[#919191]",
                        },
                        tagList: {
                          sortableList: "px-3 py-2",
                        },
                        input:
                          "flex h-14 w-full bg-background px-3 py-2 text-xl placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-end gap-10">
                <FormLabel className="text-3xl text-black">End Date</FormLabel>
                <div className="flex-1 max-w-2xl text-left space-y-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="max-w-2xl h-14 w-full font-normal text-xl"
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span className="text-muted-foreground">
                            Select a Date
                          </span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </div>
              </div>
            </FormItem>
          )}
        />

        <Button className="float-end" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Send"
          )}
        </Button>
      </form>
    </Form>
  );
}
