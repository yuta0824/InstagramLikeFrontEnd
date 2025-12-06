import { GoArrowLeft } from 'react-icons/go'

interface BackButtonProps {
  onClick: () => void
}

export const BackButton = ({ onClick }: BackButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="inline-block aspect-square rounded-full p-1 transition duration-300 hover:bg-gray-100"
    >
      <GoArrowLeft className="size-8" />
    </button>
  )
}
