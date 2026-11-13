import { ArrowDownRight, MessageCircle } from 'lucide-react';
import type { StudioHighlight, StudioInfo } from '../types/salon';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  studio: StudioInfo;
  highlights: StudioHighlight[];
  onBookViaWhatsApp: () => void;
}

export function HeroSection({
  studio,
  highlights,
  onBookViaWhatsApp,
}: HeroSectionProps) {
  return (
    <section className="pt-10 pb-12 sm:pt-14 sm:pb-16 lg:pt-16 lg:pb-16 border-b border-[#DCE2E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs sm:text-sm font-semibold tracking-wide text-[#2A5C63] mb-3.5">
            {studio.heroEyebrow}
          </p>
          <h1
            className="text-3xl sm:text-5xl lg:text-[3.25rem] font-semibold leading-[1.1] tracking-[-0.025em] text-[#121517] mb-5"
            style={{ textWrap: 'balance' }}
          >
            {studio.heroHeadline}
          </h1>
          <p className="text-base sm:text-lg leading-relaxed text-[#525C62] max-w-2xl mx-auto mb-8">
            {studio.heroDescription}
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
            <a
              href="#menu"
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-lg bg-[#2A5C63] text-[#FFFFFF] text-sm font-medium hover:bg-[#214A50] active:scale-[0.98] transition-all duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A5C63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F6F7]"
            >
              <span>Explore Service Menu</span>
              <ArrowDownRight className="w-4 h-4 shrink-0" strokeWidth={1.75} />
            </a>

            <button
              type="button"
              onClick={onBookViaWhatsApp}
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-lg border border-[#DCE2E5] bg-[#FFFFFF] text-[#121517] text-sm font-medium hover:border-[#121517]/30 hover:bg-[#EAEEF0] active:scale-[0.98] transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A5C63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F6F7]"
            >
              <MessageCircle className="w-4 h-4 text-[#2A5C63] shrink-0" strokeWidth={1.75} />
              <span>Book via WhatsApp</span>
            </button>
          </div>
        </div>

        <div className="mt-10 sm:mt-12">
          <div className="w-full aspect-[16/7] min-h-[190px] rounded-xl overflow-hidden bg-[#EAEEF0] border border-[#DCE2E5]">
            <ResilientImage
              src={studio.heroImage}
              alt={studio.heroImageAlt}
              fallbackTitle={studio.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="mt-8 sm:mt-10 pt-7 border-t border-[#DCE2E5] grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {highlights.map((item) => (
            <div key={item.label} className="space-y-1">
              <p className="text-xs font-medium text-[#525C62]">{item.label}</p>
              <p className="text-sm sm:text-base font-semibold tracking-tight text-[#121517]">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
