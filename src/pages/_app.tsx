"use client";
import type { AppProps } from "next/app";
/* <--------------- Styles Imports ---------------> */
import "../styles/globals.css";
import Providers from "@/utils/providers";
import Navbar from "@/components/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Navbar />
      <Component {...pageProps} id="app"/>
    </Providers>
  );
}
export default MyApp;
