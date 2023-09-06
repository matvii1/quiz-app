import {
  Button,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { BookOpen, CopyCheck } from "lucide-react"
import { FC } from "react"
import { Form } from "../../types"

type ControlsFieldProps = {
  form: Form
}

const ControlsField: FC<ControlsFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="type"
      render={({ field }) => (
        <FormItem className="mt-4">
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              {...field}
              className="flex items-center gap-2"
            >
              <div className="flex-1">
                <RadioGroupItem
                  value="open_ended"
                  defaultChecked
                  className="peer absolute left-4 top-4 -z-10 h-0 w-0"
                  id="r2"
                />
                <Button asChild variant="radioItem">
                  <Label htmlFor="r2">
                    <BookOpen className="h-4 w-4" />
                    <p>Open ended</p>
                  </Label>
                </Button>
              </div>
              <div className="flex-1">
                <RadioGroupItem
                  value="multiple_choice"
                  className="peer absolute left-4 top-4 -z-10 h-0 w-0"
                  id="r3"
                />
                <Button asChild variant="radioItem">
                  <Label htmlFor="r3">
                    <CopyCheck className="h-4 w-4" />
                    <p>Multiple choice</p>
                  </Label>
                </Button>
              </div>
            </RadioGroup>
          </FormControl>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  )
}

export { ControlsField }
