import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'

interface UserNameFieldProps {
  errorMessage: string
  isError?: boolean
}

export const UserNameField = ({ errorMessage, isError = false }: UserNameFieldProps) => {
  return (
    <Field>
      <FieldLabel htmlFor="username" className="text-base">
        ユーザー名
      </FieldLabel>
      <FieldDescription>名前には半角英数字とアンダーバー記号のみ使用できます</FieldDescription>
      <InputGroup>
        <InputGroupInput required id="username" placeholder="Yamada" aria-invalid={isError} />
        <InputGroupAddon>@</InputGroupAddon>
      </InputGroup>
      {isError && <FieldError>{errorMessage}</FieldError>}
    </Field>
  )
}
