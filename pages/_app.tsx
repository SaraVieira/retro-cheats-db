import "../styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import Logo from "../components/Logo";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="container m-auto max-w-[90%] sm:max-w-6xl pb-12">
      <Head>
        <title>RetroCheats DB</title>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@NikkitaFTW" />
        <meta
          name="twitter:image"
          content="http://graphics8.nytimes.com/images/2012/02/19/us/19whitney-span/19whitney-span-articleLarge.jpg"
        />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <script
          defer
          data-domain="cheats.letsplayretro.games"
          src="https://analytics.iamsaravieira.com/js/plausible.js"
        ></script>
      </Head>
      <div className="flex justify-center py-12 max-w-full">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
