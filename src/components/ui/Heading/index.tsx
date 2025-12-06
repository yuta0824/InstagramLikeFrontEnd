interface HeadingProps {
  text: string
}

export const Heading = ({ text }: HeadingProps) => {
  return <h1>{text}</h1>
}
