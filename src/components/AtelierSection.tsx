import { Clock, MapPin, Phone } from 'lucide-react';
import type { StudioHours, StudioInfo, StylistProfile } from '../types/salon';
import { ResilientImage } from './ResilientImage';

interface AtelierSectionProps {
  studio: StudioInfo;
  stylists: StylistProfile[];
  hours: StudioHours[];
  onBookWithArtist: (artistId: string) => void;
}

export function AtelierSection({
  studio,
  stylists,
  hours,
  onBookWithArtist,
}: AtelierSectionProps) {
  const namedArtists = stylists.filter((s) => s.id !== 'any');

  return (
    <>
      <section
        id="atelier"
        className="py-12 sm:py-16 lg:py-20 border-t border-[#DCE2E5] scroll-mt-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-5">
              <p className="text-xs sm:text-sm font-semibold text-[#2A5C63] mb-2">
                The Atelier
              </p>
              <h2
                className="text-2xl sm:text-4xl font-semibold tracking-[-0.02em] text-[#121517] leading-tight mb-5"
                style={{ textWrap: 'balance' }}
              >
                Botanical formulation meets architectural precision.
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-[#525C62] mb-6">
                We compound small-batch botanical scalp infusions, cold-pressed camellia oils, and barrier-supportive ceramides in-house. Every session begins with a fifteen-minute diagnostic before a single shear or serum is lifted.
              </p>
              <div className="space-y-4 pt-6 border-t border-[#DCE2E5]">
                <div>
                  <h3 className="text-sm font-semibold text-[#121517]">
                    Zero-Rush Scheduling
                  </h3>
                  <p className="text-sm text-[#525C62] mt-1">
                    One guest per artist at any hour, ensuring uninterrupted attention in daylight-filled suites.
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#121517]">
                    Hard-Water &amp; Climate Calibration
                  </h3>
                  <p className="text-sm text-[#525C62] mt-1">
                    Mineral-chelating rinses and breathable Japanese gels chosen specifically for Bengaluru’s water profile and humidity.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              <div className="space-y-3">
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#EAEEF0] border border-[#DCE2E5]">
                  <ResilientImage
                    src={studio.apothecaryImage}
                    alt={studio.apothecaryImageAlt}
                    fallbackTitle="Botanical Apothecary"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs text-[#525C62]">
                  Small-batch camellia, hinoki, and rosemary apothecary infusions.
                </p>
              </div>

              <div className="space-y-3">
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#EAEEF0] border border-[#DCE2E5]">
                  <ResilientImage
                    src={studio.facialSuiteImage}
                    alt={studio.facialSuiteImageAlt}
                    fallbackTitle="Dermal Treatment Suite"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs text-[#525C62]">
                  Private acoustic-quiet facial suites with natural daylight.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="artists"
        className="py-12 sm:py-16 lg:py-20 border-t border-[#DCE2E5] scroll-mt-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="max-w-2xl mb-10">
            <p className="text-xs sm:text-sm font-semibold text-[#2A5C63] mb-2">
              Studio Artists
            </p>
            <h2
              className="text-2xl sm:text-4xl font-semibold tracking-[-0.02em] text-[#121517] leading-tight"
              style={{ textWrap: 'balance' }}
            >
              Specialists dedicated to a single craft.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {namedArtists.map((artist) => (
              <div
                key={artist.id}
                className="flex flex-col justify-between pt-5 border-t border-[#DCE2E5]"
              >
                <div>
                  <p className="text-xs font-semibold text-[#2A5C63] mb-1">
                    {artist.role}
                  </p>
                  <h3 className="text-lg font-semibold tracking-tight text-[#121517] mb-2">
                    {artist.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#525C62] mb-5">
                    {artist.specialty}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onBookWithArtist(artist.id)}
                  className="self-start min-h-[44px] py-2 text-sm font-medium text-[#121517] hover:text-[#2A5C63] underline underline-offset-4 decoration-[#DCE2E5] hover:decoration-[#2A5C63] transition-colors cursor-pointer"
                >
                  Request with {artist.name.split(' ')[0]}
                </button>
              </div>
            ))}
          </div>

          <div
            id="visit"
            className="mt-14 pt-12 border-t border-[#DCE2E5] grid grid-cols-1 md:grid-cols-3 gap-8 scroll-mt-20"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#2A5C63]">
                <MapPin className="w-4 h-4 shrink-0" strokeWidth={1.75} />
                <span>Indiranagar Studio</span>
              </div>
              <p className="text-lg font-semibold tracking-tight text-[#121517]">
                {studio.addressLine1}
              </p>
              <p className="text-sm text-[#525C62]">{studio.addressLine2}</p>
              <p className="text-xs text-[#525C62]/85 pt-1">{studio.landmark}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#2A5C63]">
                <Clock className="w-4 h-4 shrink-0" strokeWidth={1.75} />
                <span>Studio Hours</span>
              </div>
              <dl className="space-y-1.5 text-sm">
                {hours.map((entry) => (
                  <div
                    key={entry.days}
                    className="flex items-baseline justify-between gap-4 border-b border-[#DCE2E5] pb-1.5"
                  >
                    <dt className="text-[#525C62]">{entry.days}</dt>
                    <dd className="font-medium text-[#121517] tabular-nums">
                      {entry.time}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#2A5C63]">
                <Phone className="w-4 h-4 shrink-0" strokeWidth={1.75} />
                <span>Reception Desk</span>
              </div>
              <p className="text-lg font-semibold tracking-tight text-[#121517] tabular-nums">
                {studio.whatsappNumber}
              </p>
              <p className="text-sm text-[#525C62]">
                WhatsApp concierge &amp; studio line: {studio.phone}
              </p>
              <p className="text-sm text-[#525C62]">{studio.email}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
