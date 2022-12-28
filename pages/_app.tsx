import "../styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import Logo from "../components/Logo";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="container m-auto max-w-6xl pb-12">
      <Head>
        <title>RetroCheats DB</title>
      </Head>
      <div className="flex justify-center py-12">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
