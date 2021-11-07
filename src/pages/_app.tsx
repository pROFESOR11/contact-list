import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import { ConfirmProvider } from 'material-ui-confirm'
import { AppProps } from 'next/app'
import Head from 'next/head'
import * as React from 'react'

import theme from '@styles/theme'

if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview') {
  require('../../mocks')
}

function App({ Component, pageProps }: AppProps): JSX.Element {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Contact List</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <ConfirmProvider
          defaultOptions={{
            confirmationButtonProps: { autoFocus: true },
          }}
        >
          <CssBaseline />
          <Component {...pageProps} />
        </ConfirmProvider>
      </ThemeProvider>
    </>
  )
}

export default App
