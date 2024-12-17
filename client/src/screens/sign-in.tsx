import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInValidation } from "@/validations/user.validation";
import AuthForm from "@/components/forms/auth-form";
import { useAuthStore } from "@/store/store";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { LuEye, LuEyeOff, LuMail, LuSend } from "react-icons/lu";
import { cn } from "@/lib/utils";
import MiniLoader from "@/components/mini-loader";
import { Link } from "react-router-dom";
import { SlLock } from "react-icons/sl";
import { SiLivechat } from "react-icons/si";

export function SignIn() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { signin,isSigningIn, authUser } = useAuthStore();
  const { toast } = useToast();
  const navigate = useNavigate();

  console.log(authUser);

  const form = useForm<z.infer<typeof signInValidation>>({
    resolver: zodResolver(signInValidation),
    // default values
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const { formState } = form;
  const { errors, isSubmitting } = formState;

  useEffect(() => {
    if (authUser) {
      navigate("/");
    }
  }, [navigate, authUser]);

  async function onSubmit(values: z.infer<typeof signInValidation>) {
    try {
      await signin({
        email: values.email,
        password: values.password
      });
      toast({
        title: "You have successfully signed in",
        variant: "default"
      });
      form.reset();
      navigate("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast({
          title: `Uh oh! Invalid Email or Password. ${error.message}`,
          description: "There was a problem with your request.",
          variant: "destructive",
        });
      } else {
        console.error("Unexpected error:", error);
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <AuthForm className="">
        <div className="text-center mb-10 justify-center flex flex-col items-center space-y-3">
          <SiLivechat size={50} className="text-apple-blue" />
          <h1 className="antialiased prose prose-xl font-bold text-2xl">
            Sign In to start connecting
          </h1>
          <p className="text-apple-gray text-sm">
            Your conversations are just a step away.
          </p>
        </div>
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>*Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <LuMail size={20} />
                      </div>
                      <Input
                        {...form.register("email", {
                          required: "Email is required"
                        })}
                        autoComplete="on"
                        placeholder="Email"
                        className="pr-10 text-apple-gray pl-10 focus:outline-none focus:ring focus:ring-apple-gray focus:border-none transition-all duration-200 ease-in-out"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage>
                    {errors.email && (
                      <p className="text-red-500">{errors.email?.message}</p>
                    )}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="">*Password</FormLabel>
                  <FormControl>
                    <div className="relative items-center flex">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SlLock size={20} />
                      </div>
                      <Input
                        {...form.register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 7,
                            message:
                              "Password must be at least 7 characters or above"
                          }
                        })}
                        autoComplete="off"
                        placeholder="*******"
                        className="pr-10 text-apple-gray pl-10  focus:outline-none focus:ring focus:ring-apple-gray outline-none focus:border-none transition-all duration-200 ease-in-out"
                        type={showPassword ? "text" : "password"}
                        {...field}
                      />
                      <Button
                        type="button"
                        className="bg-apple-gray absolute right-0.5  inset-y-0.5 flex items-center px-2"
                        size={"sm"}
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <LuEyeOff size={10} />
                        ) : (
                          <LuEye size={10} />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage>
                    {errors.password && (
                      <p className="text-red-500">{errors.password?.message}</p>
                    )}
                  </FormMessage>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              size={"lg"}
              disabled={isSubmitting}
              className={cn(
                `group ${
                  isSubmitting && isSigningIn && "fixed"
                } transition-all ease-in-out duration-300 rounded p-4 hover:bg-gradient-to-br from-apple-blue to-apple-gray bg-apple-lightGray flex items-center`
              )}
            >
              {isSigningIn && isSubmitting ? (
                <>
                  <MiniLoader className="border-apple-blue" />
                  <LuSend className="group-hover:translate-x-1 group-hover:-translate-y-0.5 group-active:translate-x-1 group-hover:text-white transition-all ease-in-out text-apple-blue" />
                </>
              ) : (
                <p className="text-apple-blue text-lg group-hover:text-white ">
                  Sign In
                </p>
              )}
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-sm text-center">
          <p>
            Already a member?{" "}
            <span className="underline text-apple-blue ml-1 hover:text-apple-blue/60">
              <Link to="/signup">Sign Up</Link>
            </span>
          </p>
        </div>
      </AuthForm>
    </div>
  );
}
