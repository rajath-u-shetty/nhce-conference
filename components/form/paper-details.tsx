import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PaperDetailsRequest } from "@/lib/validators/formValidator"
import { UseFormReturn } from "react-hook-form"
import { Textarea } from "../ui/textarea"



type PaperDetailsFormProps = {
  form: UseFormReturn<PaperDetailsRequest>
}

export function PaperDetailsForm({ form }: PaperDetailsFormProps) {
  return (
    <Form {...form}>
      <form className="space-y-6 w-full max-w-md">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Paper Title</FormLabel>
              <FormControl>
                <Input placeholder="Eg.Quantum Computing" {...field} className="focus:ring-2 focus:ring-primary focus:border-primary" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="abstract"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Abstract</FormLabel>
              <FormControl>
                <Textarea placeholder="Abstract of the research paper" {...field} className="h-56 focus:ring-2 focus:ring-primary focus:border-primary" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

