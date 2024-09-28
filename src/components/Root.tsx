import {SDKProvider,useLaunchParams} from '@tma.js/sdk-react';
import {THEME, TonConnectUIProvider} from '@tonconnect/ui-react';
import {useEffect,useMemo,type FC} from 'react';

import {App} from '@/components/App.tsx';
import {ErrorBoundary} from '@/components/ErrorBoundary.tsx';
// import {WagmiProvider,createConfig,http} from 'wagmi';
// import {bsc} from 'wagmi/chains';
// const config = createConfig({
//   chains: [bsc], 
//   transports: {
//     [bsc.id]: http(BSC_PROVIDER),
//   },
// })
const ErrorBoundaryError: FC<{ error: unknown }> = ({ error }) => (
  <div>
    <p>An unhandled error occurred:</p>
    <blockquote>
      <code>
        {error instanceof Error
          ? error.message
          : typeof error === 'string'
            ? error
            : JSON.stringify(error)}
      </code>
    </blockquote>
  </div>
);

const Inner: FC = () => {
  const debug = useLaunchParams().startParam === 'debug';
  const manifestUrl = useMemo(() => {
    return new URL('tonconnect-manifest.json', window.location.href).toString();
  }, []);

  // Enable debug mode to see all the methods sent and events received.
  useEffect(() => {
    if (debug) {
      import('eruda').then((lib) => lib.default.init());
    }
  }, [debug]);

  return (
    // <WagmiProvider config={config} >
    <TonConnectUIProvider manifestUrl={manifestUrl} uiPreferences={{theme: THEME.LIGHT}}>
      <SDKProvider acceptCustomStyles debug={debug}>
        <App/>
      </SDKProvider>
    </TonConnectUIProvider>
    // </WagmiProvider>
  );
};

export const Root: FC = () => (
  <ErrorBoundary fallback={ErrorBoundaryError}>
    <Inner/>
  </ErrorBoundary>
);
