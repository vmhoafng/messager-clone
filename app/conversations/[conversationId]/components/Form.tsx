"use client";

import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import { HiPhoto } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { HiPaperAirplane } from "react-icons/hi";

const Form = () => {
  const { conversationId } = useConversation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true });
    axios.post(`/api/messages`, {
      ...data,
      conversationId: conversationId,
    });
  };

  return (
    <div
      className="
        py-4
        px-4
        bg-white
        border-t
        flex
        items-center
        gap-2
        lg:gap-4
        w-full"
    >
      <HiPhoto size={30} className="text-sky-500" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="
            flex
            items-center
            gap-2
            lg:gap-4
            w-full"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          placeholder="Aa"
          required
        />
        <button
          title="send"
          type="submit"
          className="
            rounded-full
            p-2
            bg-white
            hover:bg-neutral-100
            cursor-pointer
            transition
            relative"
        >
          <HiPaperAirplane
            size={25}
            className="
            text-sky-500 
            hover:text-sky-600 
            transition
            rotate-90"
          />
        </button>
      </form>
    </div>
  );
};

export default Form;
