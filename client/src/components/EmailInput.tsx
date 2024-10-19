import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Control } from "react-hook-form";

export default function EmailInput({ control }: { control: Control }) {
  return (
    <FormField
      control={control}
      name="candidates"
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center justify-end gap-10">
            <FormLabel className="text-3xl text-black">Add Candidate</FormLabel>
            <div className="flex-1 max-w-2xl text-left space-y-2">
              <FormControl>
                <Input placeholder="Enter Candidate Email" {...field} />
              </FormControl>
              <FormMessage />
            </div>
          </div>
        </FormItem>
      )}
    />
  );
}
