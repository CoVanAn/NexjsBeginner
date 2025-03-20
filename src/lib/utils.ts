import { clsx, type ClassValue } from "clsx"
import { UseFormSetError } from "react-hook-form";
import { twMerge } from "tailwind-merge"
import { EntityError } from "./http";
import { toast } from "sonner";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleErrorAPI = ({ error, setError, duration }: {
  error: any;
  setError: UseFormSetError<any>;
  duration?: number;
}) => {
  if (error instanceof EntityError && setError) {
    error.payload.errors.forEach((error) => {
      setError(error.field, { type: 'server', message: error.message });
    });
  } else {
    toast("Lỗi", {
      description: error?.payload?.message ?? "Có lỗi xảy ra",
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
      duration: duration ?? 5000,
    })
  }
}