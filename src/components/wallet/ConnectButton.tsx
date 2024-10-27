import { ConnectButton as SuiConnectButton, useCurrentAccount } from '@mysten/dapp-kit';

export const ConnectButton = () => {
  const account = useCurrentAccount();

  const buttonContent = account ? (
    <div className="flex items-center gap-2">
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <rect x="3" y="6" width="18" height="12" rx="2" strokeWidth="2"/>
        <path d="M16 10h2v4h-2" strokeWidth="2" strokeLinecap="round"/>
      </svg>
      {`${account.address.slice(0, 6)}...${account.address.slice(-4)}`}
    </div>
  ) : (
    <div className="flex items-center gap-2">
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <rect x="3" y="6" width="18" height="12" rx="2" strokeWidth="2"/>
        <path d="M16 10h2v4h-2" strokeWidth="2" strokeLinecap="round"/>
      </svg>
      Connect Wallet
    </div>
  );

  return (
    <SuiConnectButton className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
      {buttonContent}
    </SuiConnectButton>
  );
}