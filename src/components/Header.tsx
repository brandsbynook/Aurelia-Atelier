import { CalendarCheck } from 'lucide-react';

interface HeaderProps {
  shortName: string;
  selectedCount: number;
  onOpenDrawer: () => void;
}

export function Header({ shortName, selectedCount, onOpenDrawer }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-[#F4F6F7]/90 backdrop-blur-md border-b border-[#DCE2E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between gap-8">
        <a
          href="#"
          className="text-lg sm:text-xl font-semibold tracking-[-0.02em] text-[#121517] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A5C63] rounded-sm"
        >
          {shortName}
        </a>

        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#525C62]"
        >
          <a
            href="#menu"
            className="hover:text-[#121517] transition-colors duration-150 whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#121517]/40"
          >
            Service Menu
          </a>
          <a
            href="#atelier"
            className="hover:text-[#121517] transition-colors duration-150 whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#121517]/40"
          >
            The Atelier
          </a>
          <a
            href="#artists"
            className="hover:text-[#121517] transition-colors duration-150 whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#121517]/40"
          >
            Artists
          </a>
          <a
            href="#visit"
            className="hover:text-[#121517] transition-colors duration-150 whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#121517]/40"
          >
            Visit
          </a>
        </nav>

        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onOpenDrawer}
            className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-lg text-sm font-medium bg-[#121517] text-[#FFFFFF] hover:bg-[#23282C] active:scale-[0.98] transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A5C63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F6F7]"
          >
            <CalendarCheck className="w-4 h-4 shrink-0" strokeWidth={1.75} />
            <span>
              Appointment Bag{selectedCount > 0 ? ` (${selectedCount})` : ''}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
