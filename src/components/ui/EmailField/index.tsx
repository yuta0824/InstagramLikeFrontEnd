import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

interface EmailFieldProps {
  errorMessage: string
  isError?: boolean
}

export const EmailField = ({ errorMessage, isError = false }: EmailFieldProps) => {
  return (
    <Field>
      <FieldLabel htmlFor="email" className="text-base">
        メールアドレス
      </FieldLabel>
      <Input required id="email" type="email" placeholder="yamada@example.com" aria-invalid={isError} />
      {isError && <FieldError className="text-xs">{errorMessage}</FieldError>}
    </Field>
  )
}
