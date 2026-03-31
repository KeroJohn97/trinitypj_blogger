// app/admin/settings/settings-form.tsx
"use client"
import { useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { GearIcon } from "@radix-ui/react-icons"
import { useTransition } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { SiteData } from "@/types/website"

interface SettingsFormProps {
  initialData: SiteData
}

// 1. Define the validation schema
const SettingsSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  isTwoFactorEnabled: z.optional(z.boolean()),
  email: z.email(),
})

export const SettingsForm = ({ initialData }: SettingsFormProps) => {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")

  // 2. Initialize the form
  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: "",
      email: "",
      isTwoFactorEnabled: false,
    },
  })

  // 3. Define submit handler
  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    setError("")
    setSuccess("")

    startTransition(() => {
      // Replace this with your actual server action or API call
      console.log(values)
      setSuccess("Settings updated successfully!")
    })
  }

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-x-2 text-2xl">
          <GearIcon className="h-6 w-6" />
          Settings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="John Doe" disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="john.doe@example.com" type="email" disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isTwoFactorEnabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Two Factor Authentication</FormLabel>
                      <FormDescription>Enable two factor authentication for your account.</FormDescription>
                    </div>
                    <FormControl>
                      <Switch disabled={isPending} checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            {error && <div className="text-destructive text-sm">{error}</div>}
            {success && <div className="text-sm text-emerald-500">{success}</div>}
            <Button disabled={isPending} type="submit" className="w-full">
              Save changes
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
