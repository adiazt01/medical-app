import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import { useLoginForm } from "../../hooks/useLoginForm";
import { FieldInfo } from "@/modules/core/components/input/form-info";

export function LoginForm() {
  const { form, loginUserMutation } = useLoginForm();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-end">
      <div className="min-h-screen bg-white p-8 rounded-xl shadow-2xl w-auto h-auto lg:w-[450px]">
        <div>
          <img
            src="/src/assets/logo.png"
            alt="Logo"
            className="w-32 mx-auto"
          />
        </div>
        <h1 className="text-3xl text-center uppercase font-bold tracking-[5px] text-black mb-8">
          Iniciar <span className="text-emerald-700">sesión</span>
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="mb-8"
        >
          <div className="relative mb-4">
            <form.Field
              name="email"
              children={(field) => (
                <div className="relative mb-4">
                  <Input
                    placeholder="Correo electrónico"
                    id="email"
                    disabled={loginUserMutation.isPending}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg border border-gray-300 focus:shadow-lg"
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            />
          </div>
          <div className="relative mb-8">
            <form.Field
              name="password"
              children={(field) => (
                <div className="relative mb-8">
                  <Input
                    disabled={loginUserMutation.isPending}
                    placeholder="Contraseña"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="py-3 px-8 bg-secondary-900 w-full outline-none rounded-lg border border-gray-300 focus:shadow-lg"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer text-primary"
                  >
                    {/* Aquí se elimina el texto "Mostrar" y "Ocultar" */}
                  </span>
                  <FieldInfo field={field} />
                </div>
              )}
            />
          </div>
          <div>
            <Button
              disabled={loginUserMutation.isPending}
              type="submit"
              className="bg-primary text-white uppercase font-bold text-sm w-full py-3 px-4 rounded-lg hover:bg-black mb-0"
            >
              {loginUserMutation.isPending ? (
                <Loader className="w-6 animate-spin h-6" />
              ) : (
                "Ingresar"
              )}
            </Button>
          </div>
        </form>
        <div className="flex flex-col items-center gap-4">
          <span className="flex items-center gap-2">
            ¿No tienes cuenta?{" "}
            <a href="/auth/register" className="text-primary hover:text-gray-500 transition-colors font-bold">
              Registrate
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}