import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import AuthForm from "@/components/forms/auth-form";
import { messageValidation } from "@/validations/message.validation";

export default function SignUp() {
  const form = useForm<z.infer<typeof messageValidation>>({
    resolver: zodResolver(messageValidation)
    // default values
  });
  return (
    <AuthForm className="">
      <h1 className="mb">Signup</h1>

      <Form {...form}>

        <form className="space-y-8">
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-apple-blue hover:bg-apple-blue/80">Submit</Button>
        </form>
      </Form>
    </AuthForm>
  );
}
