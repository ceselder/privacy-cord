import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Router from 'next/router'

const discordLoginLink = 'https://discord.com/api/oauth2/authorize?client_id=1006216532008898590&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Flogin&response_type=code&scope=identify'

export default function Home() {


  function SignInWithDiscord()
  {
    Router.push(discordLoginLink)
  }

  return (
    <>
    <div className='flex flex-row w-full'>
    <div onClick={SignInWithDiscord} className='mx-auto m-20 bg-slate-500 p-5'>Sign in with discord</div>
    </div>

    </>
  )
}
