import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { CoAuthorDetails, formSchema } from "@/lib/validators/formValidator"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

type CoAuthorDetailsFormProps = {
  coAuthorDetails: CoAuthorDetails
  setCoAuthorDetails: (details: CoAuthorDetails) => void
}

export function CoAuthorDetailsForm({ coAuthorDetails, setCoAuthorDetails }: CoAuthorDetailsFormProps) {
  const form = useForm<CoAuthorDetails>({
    resolver: zodResolver(formSchema),
    defaultValues: coAuthorDetails,
  })

  // Watch for form changes and update parent component
  form.watch((data) => {
    setCoAuthorDetails(data as CoAuthorDetails)
  })

  return (
    <Form {...form}>
      <form className="space-y-6 w-full max-w-md">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Jane Doe" {...field} />
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
              <FormLabel>Email ID</FormLabel>
              <FormControl>
                <Input placeholder="janedoe@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="designation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Designation</FormLabel>
              <FormControl>
                <Input placeholder="Associate Professor" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="institute"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Institute</FormLabel>
              <FormControl>
                <Input placeholder="University of Example" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
