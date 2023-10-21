"use client";
import type { AppProps } from "next/app";
/* <--------------- Styles Imports ---------------> */
import "../styles/globals.css";
import Providers from "@/utils/providers";
import Navbar from "@/components/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <div>
        <div id="gifs" className='z-[100] hidden absolute flex items-center justify-center mx-auto w-screen h-screen '>
          <img src={"/img/rhino-running.gif"} className=' object-contain' />
        </div>
        <Navbar />
        <Component {...pageProps} id="app" />
      </div>
    </Providers>
  );
}
export default MyApp;
