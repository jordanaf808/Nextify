import Head from 'next/head'
import Sidebar from '../components/Sidebar'
import Center from '../components/Center'
import { getSession } from 'next-auth/react'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Nextify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='bg-black h-screen overflow-hidden'>
        <main className='flex'>
          <Sidebar />
          <Center />
        </main>    
      </div>
      <div>
        {/*Player*/}
      </div>
    </div>
  )
}

export async function getServerSideProps(context){
  const session = await getSession(context);

  return {
    props: {
      session
    }
  };
}