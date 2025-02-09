import { ZodError, ZodTypeAny } from "zod";
import { FormInstance } from "../form/types";

export function validate<T>(
  val: T,
  form: FormInstance<T>,
  validator: ZodTypeAny | ((val: T, form: FormInstance<T>) => Promise<boolean>)
) {
  if (validator instanceof Function) {
    return validator(val, form);
  } else {
    return validator.parseAsync(val);
  }
}

export function getValidationError(error: ZodError | string) {
  if (error instanceof ZodError) {
    return error.errors.map((error) => error.message);
  } else {
    return [error];
  }
}
