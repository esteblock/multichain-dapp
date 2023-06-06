import Head from 'next/head'
import { Inter } from '@next/font/google'
import { Title } from '../src/components/Title';
import ButtonAppBar from '../src/components/ButtonAppBar';
import MySorobanReactProvider from '../src/MySorobanReactProvider';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head><title>Multichain Dapp</title></Head>
      <MySorobanReactProvider>
        <ButtonAppBar/>
        <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'}}>
          <Title/>
        </div>
      </MySorobanReactProvider>
    </>
  )
}
