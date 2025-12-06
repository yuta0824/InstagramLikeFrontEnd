import { FieldError } from '../field'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupTextarea } from '../input-group'
import { BsSend } from 'react-icons/bs'

interface CommentFieldProps {
  errorMessage: string
  onMention: () => void
  onSubmit: () => void
  isError?: boolean
  isDisabled?: boolean
}

export const CommentField = ({ errorMessage, isError, isDisabled, onMention, onSubmit }: CommentFieldProps) => {
  return (
    <div className="space-y-2">
      <InputGroup>
        <InputGroupTextarea placeholder="コメントする" aria-invalid={isError} />
        <InputGroupAddon align="block-end">
          <InputGroupButton variant="outline" size="icon-xs" onClick={onMention}>
            ＠
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
