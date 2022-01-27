import Head from 'next/head'
import Sidebar from '../components/Sidebar'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Nextify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Nextify</h1>
      <h3>Spotify with Next.js and ...</h3>
      
      <div className='bg-black h-screen overflow-hidden'>
        <main >
          <Sidebar />
          {/* Center */}
        </main>    
      </div>
      <div>
        {/*Player*/}
      </div>
    </div>
  )
}
