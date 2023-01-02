import "../styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import Logo from "../components/Logo";
import Head from "next/head";
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="container m-auto max-w-[90%] min-h-screen sm:max-w-6xl  flex flex-col">
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
        <Script
          defer
          data-domain="cheats.letsplayretro.games"
          src="https://analytics.iamsaravieira.com/js/plausible.js"
        />
      </Head>
      <div className="flex justify-center py-12 max-w-full">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <Component {...pageProps} />
      <footer className="flex justify-between mt-12 mb-6 text-sm text-gray-300 flex-grow items-end">
        <span>
          Made by{" "}
          <a href="https://twitter.com/NikkitaFTW" className="text-gray-100">
            @NikkitaFTW
          </a>
        </span>
        <span>
          <a
            href="https://github.com/SaraVieira/retro-cheats-db"
            className="flex gap-2 items-center"
          >
            Missing a game? Found a bug?{" "}
            <svg
              className="w-5 h-5"
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>GitHub</title>
              <path
                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                fill="currentColor"
              />
            </svg>
          </a>
        </span>
      </footer>
    </div>
  );
}

export default MyApp;
