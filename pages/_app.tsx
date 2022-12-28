import "../styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import Logo from "../components/Logo";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="container m-auto max-w-6xl pb-12">
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
