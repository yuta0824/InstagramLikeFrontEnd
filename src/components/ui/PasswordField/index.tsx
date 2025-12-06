import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

interface PasswordFieldProps {
  errorMessage: string
  description: string
  isError?: boolean
}

export const PasswordField = ({ errorMessage, description, isError = false }: PasswordFieldProps) => {
  return (
    <Field>
      <FieldLabel htmlFor="password" className="text-base">
        パスワード
      </FieldLabel>
      <FieldDescription>{description}</FieldDescription>
      <Input id="password" type="password" placeholder="••••••••" aria-invalid={isError} />
      {isError && <FieldError className="text-xs">{errorMessage}</FieldError>}
    </Field>
  )
}
