import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="msvalidate.01" content="0604F6F0CDB312F1136B972E1E631B46" />
      </Head>

      <Component {...pageProps} />
      <SpeedInsights />
    </>
  );
}
