import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'

interface UserNameFieldProps {
  errorMessage: string
  isError?: boolean
}

export const UserNameField = ({ errorMessage, isError = false }: UserNameFieldProps) => {
  return (
    <Field>
      <FieldLabel htmlFor="username">ユーザー名</FieldLabel>
      <FieldDescription className="text-xs">名前には文字、数字、アンダースコアのみ使用できます</FieldDescription>
      <InputGroup>
        <InputGroupInput required id="username" placeholder="Yamada" aria-invalid={isError} />
        <InputGroupAddon>@</InputGroupAddon>
      </InputGroup>
      {isError && <FieldError className="text-xs">{errorMessage}</FieldError>}
    </Field>
  )
}
