import type { StudioInfo } from '../types/salon';

interface FooterProps {
  studio: StudioInfo;
  onOpenDrawer: () => void;
}

export function Footer({ studio, onOpenDrawer }: FooterProps) {
  return (
    <footer className="border-t border-[#DCE2E5] bg-[#FFFFFF] py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <p className="text-lg font-semibold tracking-tight text-[#121517]">
            {studio.name}
          </p>
          <p className="text-xs sm:text-sm text-[#525C62] mt-1">
            {studio.addressLine1}, {studio.addressLine2}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-sm text-[#525C62]">
          <a
            href="#menu"
            className="hover:text-[#121517] transition-colors whitespace-nowrap"
          >
            Service Menu
          </a>
          <a
            href="#atelier"
            className="hover:text-[#121517] transition-colors whitespace-nowrap"
          >
            The Atelier
          </a>
          <a
            href="#visit"
            className="hover:text-[#121517] transition-colors whitespace-nowrap"
          >
            Hours &amp; Location
          </a>
          <button
            type="button"
            onClick={onOpenDrawer}
            className="font-semibold text-[#2A5C63] hover:text-[#121517] transition-colors whitespace-nowrap cursor-pointer"
          >
            Request Slot
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mt-8 pt-6 border-t border-[#DCE2E5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[#525C62]">
        <p>© {new Date().getFullYear()} {studio.name}. All rights reserved.</p>
        <p>{studio.instagram} · {studio.email}</p>
      </div>
    </footer>
  );
}
