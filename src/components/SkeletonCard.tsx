import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-xs border border-[#18181b]/10 bg-white p-4 shadow-xs animate-pulse space-y-3">
      {/* Top Stripe */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-stone-200" />
      
      {/* Header */}
      <div className="flex items-start gap-3 pt-1">
        <div className="h-16 w-16 sm:h-20 sm:w-20 bg-stone-200 rounded-xs flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-1.5">
            <div className="h-4 w-12 bg-stone-200 rounded-xs" />
            <div className="h-4 w-16 bg-stone-200 rounded-xs" />
          </div>
          <div className="h-5 w-3/4 bg-stone-300 rounded-xs" />
          <div className="h-3 w-1/2 bg-stone-200 rounded-xs" />
        </div>
      </div>

      {/* Seat box */}
      <div className="h-7 bg-stone-100 rounded-xs" />

      {/* Metric Tiles 2x2 */}
      <div className="grid grid-cols-2 gap-1.5">
        <div className="h-14 bg-stone-100 rounded-xs p-2 space-y-1.5">
          <div className="h-2.5 w-1/2 bg-stone-200 rounded-xs" />
          <div className="h-4 w-3/4 bg-stone-300 rounded-xs" />
        </div>
        <div className="h-14 bg-stone-100 rounded-xs p-2 space-y-1.5">
          <div className="h-2.5 w-1/2 bg-stone-200 rounded-xs" />
          <div className="h-4 w-3/4 bg-stone-300 rounded-xs" />
        </div>
        <div className="h-14 bg-stone-100 rounded-xs p-2 space-y-1.5">
          <div className="h-2.5 w-1/2 bg-stone-200 rounded-xs" />
          <div className="h-4 w-3/4 bg-stone-300 rounded-xs" />
        </div>
        <div className="h-14 bg-stone-100 rounded-xs p-2 space-y-1.5">
          <div className="h-2.5 w-1/2 bg-stone-200 rounded-xs" />
          <div className="h-4 w-3/4 bg-stone-300 rounded-xs" />
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex items-center gap-2 pt-2 border-t border-stone-100">
        <div className="h-9 w-24 bg-stone-200 rounded-xs" />
        <div className="h-9 flex-1 bg-stone-300 rounded-xs" />
      </div>
    </div>
  );
};
