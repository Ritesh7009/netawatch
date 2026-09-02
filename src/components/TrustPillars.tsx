import React from 'react';

export const TrustPillars: React.FC = () => {
  const pillars = [
    {
      number: '01',
      title: 'Independently Verified',
      body: 'Every single figure is cross-referenced against sworn Election Commission Form 26 affidavits, official Lok Sabha Hansard session transcripts, and Comptroller & Auditor General (CAG) MPLADS audit reports.',
    },
    {
      number: '02',
      title: 'Always Current',
      body: 'The public ledger synchronizes as new session attendance sheets, by-election affidavits, ministerial asset declarations, and judicial case updates are entered into official public gazettes.',
    },
    {
      number: '03',
      title: 'Built for Scrutiny, Not Spin',
      body: 'No party or political coalition is favored. Every elected representative—across NDA, INDIA, Regional Blocs, and Independents—is audited under identical objective criteria and open data standards.',
    },
  ];

  return (
    <section className="w-full py-10 sm:py-16 border-b border-[#18181b]/15 bg-[#faf9f6]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-8 sm:mb-12">
          <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-widest text-[#c44d31]">
            Public Accountability Standards
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#18181b] mt-1">
            Data Integrity & Verification Principles
          </h2>
        </div>

        {/* 3-Row List: Large Left Heading + Right Body Copy + Thin Rules */}
        <div className="divide-y divide-[#18181b]/15 border-t border-b border-[#18181b]/15">
          {pillars.map((item) => (
            <div 
              key={item.number}
              className="py-6 sm:py-10 grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-8 items-baseline group hover:bg-[#f1ede4]/40 transition-colors px-2 sm:px-4"
            >
              {/* Number + Large Left-Aligned Heading */}
              <div className="md:col-span-6 flex items-baseline gap-3 sm:gap-4">
                <span className="font-mono text-xs sm:text-sm font-bold text-[#c44d31]">
                  {item.number}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-black text-[#18181b] tracking-tight group-hover:text-[#c44d31] transition-colors">
                  {item.title}
                </h3>
              </div>

              {/* Right-Aligned / Right Column Body Copy */}
              <div className="md:col-span-6">
                <p className="text-xs sm:text-sm md:text-base text-[#52525b] leading-relaxed font-normal">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
