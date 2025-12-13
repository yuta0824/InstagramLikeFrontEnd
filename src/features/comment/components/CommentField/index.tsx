import { FieldError } from '@/components/ui/field'
import { BsSend } from 'react-icons/bs'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

interface CommentFieldProps {
  errorMessage: string
  onSubmit: () => void
  value?: string
  onChange?: (value: string) => void
  isError?: boolean
  isDisabled?: boolean
}

export const CommentField = ({ errorMessage, isError, isDisabled, onSubmit, value, onChange }: CommentFieldProps) => {
  return (
    <div className="space-y-2">
      <div className="flex gap-1">
        <Textarea
          placeholder="コメントする"
          value={value}
          className="min-h-none max-h-20 overflow-auto"
          onChange={e => onChange?.(e.target.value)}
        />
        <Button onClick={onSubmit} disabled={isDisabled}>
          <BsSend />
        </Button>
      </div>
      {isError && <FieldError className="text-xs">{errorMessage}</FieldError>}
    </div>
  )
}
