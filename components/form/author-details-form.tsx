import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { AuthorDetails } from "@/lib/validators/formValidator"
import { UseFormReturn } from "react-hook-form"

type AuthorDetailsFormProps = {
  form: UseFormReturn<AuthorDetails>
}

export function AuthorDetailsForm({ form }: AuthorDetailsFormProps) {
  return (
    <Form {...form} >
      <form className="space-y-6 w-full max-w-md ">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} className="focus:ring-2 focus:ring-primary focus:border-primary" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Email ID</FormLabel>
              <FormControl>
                <Input {...field} className="focus:ring-2 focus:ring-primary focus:border-primary" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mobileNumber"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Mobile Number</FormLabel>
              <FormControl>
                <Input {...field} className="focus:ring-2 focus:ring-primary focus:border-primary" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="designation"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Designation</FormLabel>
              <FormControl>
                <Input {...field} className="focus:ring-2 focus:ring-primary focus:border-primary" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="institute"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Institute</FormLabel>
              <FormControl>
                <Input {...field} className="focus:ring-2 focus:ring-primary focus:border-primary" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
