import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight, Bell, Sparkles } from 'lucide-react';

export const AuditUpdatesStrip: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 4000);
  };

  const auditFeed = [
    {
      date: 'Aug 2026',
      title: '18th Lok Sabha Hansard Debates Ingested',
      tag: 'PARLIAMENT',
      tagColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    },
    {
      date: 'Jul 2026',
      title: 'ECI Form 26 Sworn Disclosures Synchronized',
      tag: 'AFFIDAVIT',
      tagColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    },
    {
      date: 'Jun 2026',
      title: 'CAG MPLADS Phase-III Project Utilization Audited',
      tag: 'MPLADS',
      tagColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    },
  ];

  return (
    <section className="w-full py-10 sm:py-14 bg-[#18181b] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Two-Column Rounded Dark Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#27272a] border border-white/15 p-6 sm:p-10 rounded-3xl shadow-2xl">
          
          {/* Left Column: Email Notification Form */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest text-amber-300 rounded-full border border-white/10">
              <Bell className="h-3 w-3" />
              <span>Civic Dispatch & Alerts</span>
            </div>
            
            <h2 className="font-serif text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
              Get notified when new affidavits or asset disclosures are audited.
            </h2>

            <p className="text-xs sm:text-sm text-zinc-400 max-w-lg leading-relaxed">
              We send concise data audits whenever MPs submit new sworn filings, judicial case status updates, or parliamentary session voting logs.
            </p>

            <form onSubmit={handleSubscribe} className="pt-2">
              {subscribed ? (
                <div className="flex items-center gap-2 text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-4 py-3 rounded-full text-xs font-mono font-bold animate-in fade-in">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Subscribed! You will receive verified civic disclosures.</span>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-md">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                    <input
                      type="email"
                      placeholder="citizen@public.in"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-[#18181b] border border-white/20 rounded-full py-2.5 pl-10 pr-4 text-xs font-medium text-white placeholder-zinc-500 focus:outline-none focus:border-amber-300 transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#c44d31] hover:bg-[#d95d40] text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-md cursor-pointer flex-shrink-0"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Right Column: Latest Audit Stream Feed */}
          <div className="lg:col-span-5 bg-[#18181b] border border-white/10 p-5 rounded-2xl space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-1.5">
                <Sparkles className="h-3 w-3 text-amber-300" />
                Latest Verified Audits
              </span>
              <span className="text-[9px] font-mono text-emerald-400">● LIVE</span>
            </div>

            <div className="space-y-2.5">
              {auditFeed.map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 space-y-1">
                  <div className="flex items-center justify-between text-[9px] font-mono">
                    <span className="text-zinc-400">{item.date}</span>
                    <span className={`px-1.5 py-0.2 rounded-full border text-[8px] font-bold ${item.tagColor}`}>
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-zinc-200">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
