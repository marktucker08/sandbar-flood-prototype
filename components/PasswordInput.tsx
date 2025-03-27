"use client";

import React, { useState } from "react";
import { FormInput } from "@/components/ui/form";

interface PasswordInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  showForgotPassword?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  label = "Password",
  showForgotPassword = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1.5">
        <label className="text-xs font-bold text-black uppercase">
          {label}
        </label>
        {showForgotPassword && (
          <span className="text-xs text-gray-400 cursor-pointer">
            Forgot password?
          </span>
        )}
      </div>
      <FormInput
        type={showPassword ? "text" : "password"}
        rightElement={
          <i
            className={`ti ti-eye${
              showPassword ? "" : "-off"
            } text-gray-400 cursor-pointer`}
            onClick={() => setShowPassword(!showPassword)}
          />
        }
        {...props}
      />
    </div>
  );
};

export default PasswordInput;
