'use client';
import { Card, CardContent } from '@/components/ui/card';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react'; // Icons for the eye toggle
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { signIn } from '../api/auth/signin/route';

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const SignInForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Handle password visibility toggle
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    const res = await signIn(values)
    if (res.success) {
        toast.success('Login successful')
        router.push('/')
    } else {
        toast.error(res.error)
    }
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
  }

  return (
    <Card className="min-w-[440px] bg-white/60 text-black rounded-3xl shadow-none">
      <CardContent className="space-y-2 mt-8">
        <Form {...form}>
          <form className="flex flex-col gap-8" onSubmit={form.handleSubmit(onSubmit)}>
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email Anda"
                      className="border border-[#ADB4B8] text-neutral-600"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password Anda"
                        {...field}
                        className="border border-[#ADB4B8] text-neutral-600 pr-10"
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="self-start mt-1 bg-[#4C84F6] text-white rounded-3xl w-full font-semibold text-xl h-12"
            >
              Masuk
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SignInForm;
