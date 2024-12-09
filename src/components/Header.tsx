import React from 'react';
import { GraduationCap } from 'lucide-react';
import ConnectWalletBtn from './ConnectWalletBtn';

const Header: React.FC = () => {
  return (
    <div className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-2 rounded-lg">
              <GraduationCap className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Course Certificate DApp</h1>
              <p className="text-sm text-muted-foreground">Learn, Earn, and Certify on the Blockchain</p>
            </div>
          </div>
          <ConnectWalletBtn />
        </div>
      </div>
    </div>
  );
};

export default Header;