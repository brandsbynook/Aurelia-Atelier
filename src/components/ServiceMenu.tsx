import { Check, Plus, Search, X } from 'lucide-react';
import type { ServiceCategory, ServiceItem } from '../types/salon';
import { formatInr } from '../utils/formatters';

interface ServiceMenuProps {
  categories: ServiceCategory[];
  activeCategory: ServiceCategory;
  onCategoryChange: (category: ServiceCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  services: ServiceItem[];
  totalCount: number;
  selectedIds: string[];
  onToggleService: (serviceId: string) => void;
}

export function ServiceMenu({
  categories,
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  services,
  totalCount,
  selectedIds,
  onToggleService,
}: ServiceMenuProps) {
  const hasFilters = activeCategory !== 'All' || searchQuery.trim().length > 0;

  return (
    <section id="menu" className="py-12 sm:py-16 lg:py-20 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div className="max-w-2xl">
            <p className="text-xs sm:text-sm font-semibold text-[#2A5C63] mb-2">
              Service Menu
            </p>
            <h2
              className="text-2xl sm:text-4xl font-semibold tracking-[-0.02em] text-[#121517] leading-tight"
              style={{ textWrap: 'balance' }}
            >
              Select treatments to compose your studio session.
            </h2>
          </div>

          <p className="text-sm text-[#525C62] tabular-nums">
            Showing {services.length} of {totalCount} treatments
          </p>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-8 border-b border-[#DCE2E5]">
          <div
            role="tablist"
            aria-label="Service categories"
            className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 -mx-1 px-1"
          >
            {categories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => onCategoryChange(category)}
                  className={`min-h-[44px] px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A5C63] ${
                    isActive
                      ? 'bg-[#2A5C63] text-[#FFFFFF]'
                      : 'bg-[#FFFFFF] border border-[#DCE2E5] text-[#525C62] hover:text-[#121517] hover:border-[#121517]/25'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div className="relative w-full lg:w-80 shrink-0">
            <Search
              className="w-4 h-4 text-[#525C62] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              strokeWidth={1.75}
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search treatments, scalp, facial..."
              aria-label="Search treatments"
              className="w-full min-h-[44px] pl-10 pr-10 py-2.5 rounded-lg bg-[#FFFFFF] border border-[#DCE2E5] text-sm text-[#121517] placeholder:text-[#525C62]/70 focus:outline-none focus:border-[#2A5C63] focus:ring-1 focus:ring-[#2A5C63] transition-colors"
            />
            {searchQuery.trim().length > 0 && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                aria-label="Clear search"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 min-h-[36px] min-w-[36px] flex items-center justify-center rounded-md text-[#525C62] hover:text-[#121517] cursor-pointer"
              >
                <X className="w-4 h-4" strokeWidth={1.75} />
              </button>
            )}
          </div>
        </div>

        {services.length === 0 ? (
          <div className="py-16 text-center max-w-md mx-auto">
            <p className="text-xl font-semibold tracking-tight text-[#121517] mb-2">
              No matching treatments found
            </p>
            <p className="text-sm text-[#525C62] mb-6">
              Try a different ingredient, ritual name, or return to the complete studio menu.
            </p>
            {hasFilters && (
              <button
                type="button"
                onClick={() => {
                  onCategoryChange('All');
                  onSearchChange('');
                }}
                className="min-h-[44px] px-5 py-2.5 rounded-lg border border-[#DCE2E5] bg-[#FFFFFF] text-sm font-medium text-[#121517] hover:bg-[#EAEEF0] transition-colors cursor-pointer"
              >
                Reset menu filters
              </button>
            )}
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {services.map((service) => {
              const isSelected = selectedIds.includes(service.id);
              return (
                <article
                  key={service.id}
                  className={`flex flex-col justify-between p-6 rounded-xl border transition-all duration-150 bg-[#FFFFFF] ${
                    isSelected
                      ? 'border-[#2A5C63] ring-1 ring-[#2A5C63]/30'
                      : 'border-[#DCE2E5] hover:border-[#121517]/25'
                  }`}
                >
                  <div>
                    <p className="text-xs font-medium text-[#525C62] mb-2">
                      {service.category}
                    </p>
                    <h3 className="text-lg font-semibold tracking-[-0.01em] leading-snug text-[#121517] mb-2.5">
                      {service.name}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#525C62] mb-6">
                      {service.note}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#DCE2E5] flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-sm text-[#121517] tabular-nums">
                      <span className="text-[#525C62]">
                        {service.durationMins} mins
                      </span>
                      <span aria-hidden="true" className="text-[#525C62]/60">
                        ·
                      </span>
                      <span className="font-semibold">
                        {formatInr(service.priceInr)}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onToggleService(service.id)}
                      aria-pressed={isSelected}
                      className={`inline-flex items-center justify-center gap-1.5 min-h-[44px] px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A5C63] ${
                        isSelected
                          ? 'bg-[#2A5C63] text-[#FFFFFF] hover:bg-[#214A50]'
                          : 'bg-[#EAEEF0] text-[#121517] hover:bg-[#DCE2E5]'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-3.5 h-3.5 shrink-0" strokeWidth={2} />
                          <span>Selected</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5 shrink-0" strokeWidth={2} />
                          <span>Select Treatment</span>
                        </>
                      )}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
