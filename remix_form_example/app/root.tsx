import './styles/index.css'

// Remix
import { Links, Meta, Outlet, Scripts } from '@remix-run/react'

// Layouts
import HeaderLayout from '~/layouts/header.layout'

export default function App() {
  return (
    <html lang='en'>
      <head>
        <link rel='icon' type='image/svg+xml' href='/remix.svg' />
        <title>Update Form - Exercise</title>
        <Meta />
        <Links />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='anonymous'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap'
          rel='stylesheet'
        ></link>
      </head>
      <body>
        <HeaderLayout />
        <Outlet />
        <Scripts />
      </body>
    </html>
  )
}
