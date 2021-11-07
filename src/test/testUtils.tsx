import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import { render, RenderOptions } from '@testing-library/react'
import { ConfirmProvider } from 'material-ui-confirm'
import React from 'react'

import theme from '@styles/theme'

const Providers: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <ConfirmProvider
        defaultOptions={{
          confirmationButtonProps: { autoFocus: true },
        }}
      >
        <CssBaseline />
        {children}
      </ConfirmProvider>
    </ThemeProvider>
  )
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const customRender = (ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: Providers, ...options })

// re-export everything
// eslint-disable-next-line import/export
export * from '@testing-library/react'

// override render method
// eslint-disable-next-line import/export
export { customRender as render }
