import AuthForm from "@/components/forms/auth-form";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/store";
import { CalendarIcon } from "lucide-react";
import type React from "react";
import {
  LuEye,
  LuEyeOff,
  LuMail,
  LuUser,
} from "react-icons/lu";
import { SiLivechat } from "react-icons/si";
import { useToast } from "@/hooks/use-toast";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from "@radix-ui/react-hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { profileUpdateValidation } from "@/validations/user.validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { SlLock } from "react-icons/sl";
import { cn } from "@/lib/utils";
export default function Profile() {
  const { isUpdatingProfile, updateProfile, authUser } = useAuthStore();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [, setFiles] = useState<File[]>([]);
  const { toast } = useToast();

  // form
  const form = useForm<z.infer<typeof profileUpdateValidation>>({
    resolver: zodResolver(profileUpdateValidation),
    defaultValues: {
      fullName: authUser?.fullName,
      email: authUser?.email,
      password: authUser?.password,
      profilePic: authUser?.profilePic
    }
  });

  const { formState } = form;
  const { errors, isSubmitting } = formState;

  const handleImage = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));

      // Validate the file type before processing
      if (!file.type.includes("image")) {
        console.error("Selected file is not an image.");
        return;
      }
      fileReader.onload = (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl); // Set Base64 string to the form field
      };
      fileReader.onerror = () => {
        console.error("Error reading the file.");
      };

      fileReader.readAsDataURL(file); // Convert file to Base64
    }
  };

  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB in bytes

  const validateFileSize = (base64String: string): boolean => {
    // Calculate the file size in bytes
    const base64Length = base64String.length;
    const fileSize =
      (base64Length * 3) / 4 -
      (base64String.endsWith("==") ? 2 : base64String.endsWith("=") ? 1 : 0);
    return fileSize <= MAX_FILE_SIZE;
  };

  const onSubmit = async (values: z.infer<typeof profileUpdateValidation>) => {
    if (!values.profilePic) {
      toast({
        title: "Profile picture is required",
        variant: "destructive"
      });
      return;
    }

    // Validate file size
    if (validateFileSize(values.profilePic)) {
      try {
        await updateProfile(values);
        toast({
          title: "You have successfully changed your profile information.",
          variant: "default"
        });
      } catch (error: unknown) {
        console.error(`Error updating profile:, ${error}`);
      }
    } else {
      toast({
        variant: "destructive",
        title: "Oops! File size exceeds the allowed limit of 2MB.",
        description: "You can only upload an image below 2MB"
      });
    }
  };

  console.log(authUser ?? "no data");
  return (
    <div className="mx-auto w-full items-center flex pt-20 p-5 sm:px-14 flex-col min-h-screen flex-1">
      {/* form */}
      <AuthForm className="">
        <div className="text-center mb-10 justify-center flex flex-col items-center space-y-3">
          <SiLivechat size={50} className="text-apple-blue" />
          <h1 className="antialiased prose prose-xl font-bold text-2xl">
            ChatApp Profile Information.
          </h1>
          <p className="text-apple-gray text-sm">*Update your profile image.</p>
        </div>
        {/* ========== */}

        {/* ========== */}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3 justify-start"
          >
            <FormField
              control={form.control}
              name="profilePic"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center">
                  <FormLabel className="">
                    {field.value ? (
                      <img
                        src={field.value}
                        alt="profile_photo"
                        loading="eager"
                        className="rounded-full h-[75px] w-[75px]"
                      />
                    ) : (
                      <img
                        src={"avatar.jpg"}
                        alt="profile logo"
                        className="rounded-full h-[75px] w-[75px]"
                      />
                    )}
                  </FormLabel>
                  <p className="text-sm text-apple-silver">
                    click on icon to change profile image
                  </p>
                  <FormControl className="flex-1 text-base-semibold text-gray-200">
                    <Input
                      type="file"
                      accept="image/*"
                      placeholder="Upload Profile Photo"
                      className="hidden"
                      onChange={(e) => handleImage(e, field.onChange)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>*Full Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <LuUser size={20} />
                      </div>
                      <Input
                        {...form.register("fullName", {
                          required: "Full name is required"
                        })}
                        readOnly
                        autoFocus
                        autoComplete="on"
                        placeholder="Full Name"
                        className={cn(
                          `pr-10 text-apple-gray pl-10 focus:outline-none focus:ring focus:ring-apple-gray focus:border-none transition-all duration-200 ease-in-out`
                        )}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage>
                    {errors.fullName && (
                      <p className="text-red-500">{errors.fullName?.message}</p>
                    )}
                  </FormMessage>
                </FormItem>
              )}
            />
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
              className={cn(
                `group ${
                  isUpdatingProfile && "bg-apple-gray text-apple-black"
                } transition-all mt-2 ease-in-out duration-300 rounded p-4 hover:bg-gradient-to-br from-apple-blue to-apple-gray bg-apple-lightGray flex items-center`
              )}
            >
              <p className="text-apple-blue text-lg group-hover:text-white ">
                {isUpdatingProfile || isSubmitting ? "Updating..." : "Update"}
              </p>
            </Button>
          </form>
        </Form>

        <div className="mt-8">
          <h2 className="text-lg font-medium text-center">
            Account Information
          </h2>
          <div className="space-y-2 rounded-xl p-3 ">
            <div className="space-x-2">
              <HoverCard openDelay={200} closeDelay={0}>
                <HoverCardTrigger asChild className={``}>
                  <Button
                    variant="link"
                    className={` underline transition-all ease-in-out duration-200 text-apple-blue`}
                  >
                    member since
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="ml-20 mt-5">
                  <div className="flex justify-between space-x-4">
                    <Avatar>
                      <AvatarImage src="/chat.png" className="h-7 w-7" />
                      <AvatarFallback className="bg-apple-blue text-apple-lightGray">
                        CA
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <div className="flex items-center pt-2">
                        <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                        <span className="text-apple-gray font-semibold ">
                          Joined:
                        </span>{" "}
                        <span className="mt-1 ml-2 text-apple-blue font-mono font-bold">
                          {authUser?.createdAt?.split("T")[0]}
                        </span>
                      </div>
                      <div className="space-x-2">
                        <span className="text-apple-gray font-semibold">
                          Account Status:
                        </span>{" "}
                        <span className="text-apple-blue font-mono font-bold">
                          {authUser ? "active" : "inactive"}
                        </span>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>
        </div>
      </AuthForm>
    </div>
  );
}
