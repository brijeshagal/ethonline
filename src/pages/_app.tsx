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
        <Navbar />
        <Component {...pageProps} id="app" />
      </div>
    </Providers>
  );
}
export default MyApp;
