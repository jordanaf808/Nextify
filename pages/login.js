import { getProviders, signIn } from 'next-auth/react';

function Login({ providers }) {
  return (
    <div className='w-screen h-screen flex flex-col justify-center bg-black text-center p-5'>
      <h1 className='my-5 text-white'>Login Page</h1>
      <img className='w-52 my-5 mx-auto' src="https://links.papareact.com/9xl" alt="Spotify Logo" />
    
    {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          {/* Need to trigger NextAuth onClick. Need to set RedirectURI on SpotifyAPI Dashboard */}
          <button className='bg-[#18D860] text-white p-5 rounded-full' onClick={() => signIn(provider.id, { callbackUrl: '/' })} >Login with {provider.name}</button>
        </div>
    ))}
      
    </div>
  );
};

export default Login;

export async function getServerSideProps(){
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
};
