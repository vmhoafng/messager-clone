"use client";
import axios from "axios";
import { useCallback, useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Input from "../../components/inputs/Input";
import Button from "../../components/Button";
import AuthenticSocialButton from "./AuthenticSocialButton";
import { BsGithub, BsFacebook, BsGoogle } from "react-icons/bs";
import { toast } from "react-hot-toast";
type Variant = "LOGIN" | "REGISTER";
export default function AuthForm() {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);
  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    if (variant === "REGISTER") {
      axios
        .post("./api/register", data)
        .catch(() => {
          toast.error("error");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    if (variant === "LOGIN") {
      //NextAuth SignIn
    }
  };
  const socialAction = (action: string) => {
    setIsLoading(true);
    //NextAuth Social SignIn
  };
  return (
    <div
      className="
        mt-8 
        sm:mx-auto 
        sm:w-full 
        sm:max-w-md"
    >
      <div
        className="
         bg-white 
         px-4 
         py-8 
         shadow 
         sm:rounded-lg 
         sm:px-10"
      >
        <form action="" className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input
              id="name"
              label="name"
              type="name"
              register={register}
              errors={errors}
              disabled={isLoading}
            />
          )}
          <Input
            id="email"
            label="Email address"
            type="email"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          {/* {variant === "REGISTER" && (
            <Input
              id="password"
              label="Password"
              type="password"
              register={register}
              errors={errors}
              disabled={isLoading}
            />
          )} */}
          <Button type="submit" disabled={isLoading} fullWidth>
            {variant === "LOGIN" ? "Sign In" : "Register"}
          </Button>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div
              className="
                absolute 
                inset-0
                flex
                items-center"
            >
              <div
                className="
                  w-full 
                  border-t 
                  border-gray-300"
              />
            </div>
            <div
              className="
                relative 
                flex
                justify-center
                text-sm"
            >
              <span
                className="
                 bg-white 
                 px-2 
                 text-gray-500"
              >
                Or continue with
              </span>
            </div>
          </div>
          <div
            className="
              mt-6
              flex
              gap-2"
          >
            <AuthenticSocialButton
              icon={BsGithub}
              onClick={() => socialAction("github")}
            />{" "}
            <AuthenticSocialButton
              icon={BsFacebook}
              onClick={() => socialAction("facebook")}
            />{" "}
            <AuthenticSocialButton
              icon={BsGoogle}
              onClick={() => socialAction("google")}
            />
          </div>
        </div>
        <div
          className="
            flex
            gap-2
            justify-center
            text-sm
            mt-6
            px-2
            text-gray-500"
        >
          <div>
            {variant === "LOGIN"
              ? "New to Messenger?"
              : "Already have an account?"}
          </div>
          <div onClick={toggleVariant} className="underline cursor-pointer">
            {variant === "LOGIN" ? "Register" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
}
