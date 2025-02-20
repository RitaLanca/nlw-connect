import './globals.css'
import type { Metadata } from 'next'
import { Montserrat, Oxanium } from 'next/font/google'

export const metadata: Metadata = {
  title: 'devstage',
}

const oxanium = Oxanium({
  weight: ['500', '600'],
  subsets: ['latin'], // nao carrega todos os simbolos do mundo
  variable: '--font-oxanium', // definir a variavel para a fonte
})

const montserrat = Montserrat({
  weight: ['400', '600'],
  subsets: ['latin'], // nao carrega todos os simbolos do mundo
  variable: '--font-montserrat', // definir a variavel para a fonte
})
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // Para deixar as fontes disponiveis na pagina precisamos de passar no className
    <html lang="en" className={`${oxanium.variable} ${montserrat.variable}`}>
      <body className="bg-gray-900 text-gray-100 antialiased bg-[url(/background.png)] bg-no-repeat bg-top md:bg-right-top">
        <main className="max-w-[1240px] mx-auto px-5 py-8 md:py-0">
          {children}
        </main>
      </body>
    </html>
  )
}
