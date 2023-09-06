import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/ui"
import { ChangeEvent, FC } from "react"
import { Form } from "../../types"

type AmountFieldProps = {
  form: Form
}

const AmountField: FC<AmountFieldProps> = ({ form }) => {
  function onChange(e: ChangeEvent<HTMLInputElement>) {
    form.setValue("amount", e.target.valueAsNumber)
    form.clearErrors("amount")
  }

  return (
    <FormField
      control={form.control}
      name="amount"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Number of questions</FormLabel>
          <FormControl>
            <Input
              type="number"
              placeholder="Enter an amount..."
              {...field}
              onChange={onChange}
            />
          </FormControl>
          <FormDescription>
            You can choose how many questions you want to be quized
          </FormDescription>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  )
}

export { AmountField }
