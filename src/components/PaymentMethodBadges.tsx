import React from 'react';

interface PaymentMethodBadgeProps {
  className?: string;
  variant?: 'dark' | 'light' | 'mono';
  size?: 'sm' | 'md' | 'lg';
}

export const PaymentMethodBadges: React.FC<PaymentMethodBadgeProps> = ({
  className = '',
  variant = 'dark',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'h-6 px-2 text-[10px]',
    md: 'h-7 px-2.5 text-[11px]',
    lg: 'h-8 px-3 text-xs'
  }[size];

  const containerBg = variant === 'dark'
    ? 'bg-[#1A1D20] border-[#2E3238] text-neutral-300'
    : 'bg-white border-neutral-200 text-neutral-800 shadow-xs';

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {/* Visa */}
      <div 
        title="Visa"
        className={`inline-flex items-center justify-center rounded-sm border font-bold tracking-wider ${sizeClasses} ${containerBg} hover:border-[#C5A880]/60 transition-colors`}
      >
        <span className="font-serif italic font-black text-blue-400 tracking-tighter text-xs">
          VISA
        </span>
      </div>

      {/* Mastercard */}
      <div 
        title="Mastercard"
        className={`inline-flex items-center justify-center rounded-sm border ${sizeClasses} ${containerBg} hover:border-[#C5A880]/60 transition-colors`}
      >
        <div className="flex items-center -space-x-1.5 mr-1.5">
          <div className="w-3.5 h-3.5 rounded-full bg-[#EB001B] opacity-90" />
          <div className="w-3.5 h-3.5 rounded-full bg-[#F79E1B] opacity-90" />
        </div>
        <span className="font-medium text-[10px] tracking-tight">Mastercard</span>
      </div>

      {/* American Express */}
      <div 
        title="American Express"
        className={`inline-flex items-center justify-center rounded-sm border font-bold ${sizeClasses} ${containerBg} hover:border-[#C5A880]/60 transition-colors`}
      >
        <span className="bg-[#006FCF] text-white px-1 py-0.2 rounded-xs text-[9px] font-sans font-black tracking-wider">
          AMEX
        </span>
      </div>

      {/* Apple Pay */}
      <div 
        title="Apple Pay"
        className={`inline-flex items-center justify-center rounded-sm border font-medium ${sizeClasses} ${containerBg} hover:border-[#C5A880]/60 transition-colors`}
      >
        <svg className="w-3 h-3 fill-current mr-1 mb-0.5" viewBox="0 0 170 170">
          <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.67-7.81-11.96-14.34-6.43-9.79-11.37-20.9-14.82-33.34-3.45-12.44-5.18-23.75-5.18-33.93 0-14.07 3.53-25.75 10.58-35.03 7.05-9.28 16.03-14.06 26.94-14.34 5.34 0 11.16 1.48 17.46 4.45 6.3 2.97 10.22 4.51 11.75 4.63 1.23-.12 5.33-1.74 12.31-4.87 6.98-3.13 12.82-4.53 17.52-4.19 12.98.68 23.36 5.56 31.14 14.65-11.36 6.86-16.92 16.29-16.68 28.29.24 9.4 3.86 17.34 10.87 23.82 4.15 3.88 8.91 6.64 14.28 8.28-2.61 7.69-5.78 15.42-9.5 23.19zM119.22 33.14c0-7.37 2.65-14.48 7.95-21.32 5.3-6.84 11.97-11.23 20.02-13.18.3 1.36.45 2.66.45 3.91 0 7.42-2.8 14.59-8.4 21.52-5.6 6.93-12.44 11.25-20.52 12.97-.24-1.3-.36-2.6-.36-3.9z" />
        </svg>
        <span className="font-semibold text-[11px] tracking-tight">Pay</span>
      </div>

      {/* Google Pay */}
      <div 
        title="Google Pay"
        className={`inline-flex items-center justify-center rounded-sm border font-medium ${sizeClasses} ${containerBg} hover:border-[#C5A880]/60 transition-colors`}
      >
        <span className="font-bold text-[#4285F4] mr-0.5">G</span>
        <span className="font-semibold text-[11px] tracking-tight">Pay</span>
      </div>

      {/* SEPA Wire */}
      <div 
        title="SEPA Instant Wire Transfer"
        className={`inline-flex items-center justify-center rounded-sm border font-semibold ${sizeClasses} ${containerBg} hover:border-[#C5A880]/60 transition-colors`}
      >
        <span className="text-[#003399] dark:text-[#3B82F6] font-black tracking-widest text-[10px] mr-1">
          SEPA
        </span>
        <span className="text-[9px] uppercase tracking-wider text-neutral-400">Instant</span>
      </div>

      {/* Bank Wire / SWIFT */}
      <div 
        title="Bank Wire / SWIFT Escrow"
        className={`inline-flex items-center justify-center rounded-sm border font-semibold ${sizeClasses} ${containerBg} hover:border-[#C5A880]/60 transition-colors`}
      >
        <span className="text-[#C5A880] font-mono font-bold text-[10px] tracking-wider">
          SWIFT
        </span>
      </div>

      {/* UnionPay */}
      <div 
        title="UnionPay"
        className={`inline-flex items-center justify-center rounded-sm border ${sizeClasses} ${containerBg} hover:border-[#C5A880]/60 transition-colors`}
      >
        <div className="flex items-center -space-x-1 mr-1">
          <div className="w-2.5 h-3 bg-[#DE2910] rounded-xs transform -skew-x-12" />
          <div className="w-2.5 h-3 bg-[#004A97] rounded-xs transform -skew-x-12" />
          <div className="w-2.5 h-3 bg-[#007B3D] rounded-xs transform -skew-x-12" />
        </div>
        <span className="font-bold text-[9px] tracking-tight">UnionPay</span>
      </div>
    </div>
  );
};
