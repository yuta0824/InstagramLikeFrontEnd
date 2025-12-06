import { FieldError } from '../field'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupTextarea } from '../input-group'
import { BsSend } from 'react-icons/bs'

interface CommentFieldProps {
  errorMessage: string
  onMention: () => void
  onSubmit: () => void
  value?: string
  onChange?: (value: string) => void
  isError?: boolean
  isDisabled?: boolean
}

export const CommentField = ({
  errorMessage,
  isError,
  isDisabled,
  onMention,
  onSubmit,
  value,
  onChange
}: CommentFieldProps) => {
  return (
    <div className="space-y-2">
      <InputGroup>
        <InputGroupTextarea
          placeholder="コメントする"
          aria-invalid={isError}
          value={value}
          onChange={e => onChange?.(e.target.value)}
        />
        <InputGroupAddon align="block-end">
          <InputGroupButton variant="outline" size="icon-xs" onClick={onMention}>
            ＠<span className="sr-only">でメンションする</span>
          </InputGroupButton>
          <InputGroupButton variant="default" className="w-10" size="icon-xs" onClick={onSubmit} disabled={isDisabled}>
            <BsSend />
            <span className="sr-only">Send</span>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      {isError && <FieldError className="text-xs">{errorMessage}</FieldError>}
    </div>
  )
}
