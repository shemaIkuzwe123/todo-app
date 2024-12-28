"use server";

import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";
import { LoginShema } from "./shema";

export async function authenticate(prevState: unknown, formData: FormData) {
  const validate = parseWithZod(formData, { schema: LoginShema });
  if (validate.status !== "success") {
    return validate.reply({ resetForm: false });
  }
  const { email, password } = validate.value;
  if (email == "eshemaikuzwe@gmail.com") {
    return validate.reply({
      formErrors: ["Custom error message here."],
    }).error;
  }
  redirect("/");
}


