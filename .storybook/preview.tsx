import type { Preview } from '@storybook/nextjs-vite'
import { Toaster } from '../src/components/ui/sonner'
import '@/styles/globals.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  },
  decorators: [
    Story => (
      <>
        <Toaster position="top-right" />
        <Story />
      </>
    )
  ]
}

export default preview
