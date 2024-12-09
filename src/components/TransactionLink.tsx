import React from 'react';
import { ExternalLink } from 'lucide-react';

interface TransactionLinkProps {
    hash: string;
    className?: string;
}

export const TransactionLink: React.FC<TransactionLinkProps> = ({ hash, className }) => {
    return (
        <a
            href={`https://kairos.klaytn.net/tx/${hash}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1 text-blue-500 hover:text-blue-600 ${className}`}
        >
            View Transaction <ExternalLink className="w-4 h-4" />
        </a>
    );
};