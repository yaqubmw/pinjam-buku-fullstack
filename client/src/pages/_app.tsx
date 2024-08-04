import "src/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "store";
import { poppins } from "src/styles/fonts";
import { Layout } from "src/components/layouts";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${poppins.variable}`}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PersistGate>
      </Provider>
    </main>
  );
}
