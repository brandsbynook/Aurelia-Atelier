import { useMemo, useState } from 'react';
import { CalendarCheck } from 'lucide-react';
import rawConfig from './data/salonConfig.json';
import type { SalonConfig, ServiceCategory } from './types/salon';
import {
  buildWhatsAppBookingMessage,
  formatInr,
  formatShortDuration,
  getUpcomingOpenDays,
} from './utils/formatters';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ServiceMenu } from './components/ServiceMenu';
import { AtelierSection } from './components/AtelierSection';
import { AppointmentDrawer } from './components/AppointmentDrawer';
import { DemoBookingModal } from './components/DemoBookingModal';
import { Footer } from './components/Footer';

const salonConfig = rawConfig as SalonConfig;

export function App() {
  const dayOptions = useMemo(
    () => getUpcomingOpenDays(salonConfig.closedWeekdays, 7),
    []
  );

  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const [selectedDayId, setSelectedDayId] = useState<string>(
    dayOptions[0]?.id ?? ''
  );
  const [selectedTimeWindowId, setSelectedTimeWindowId] = useState<string>(
    salonConfig.timeWindows[0]?.id ?? 'morning'
  );
  const [selectedStylistId, setSelectedStylistId] = useState<string>(
    salonConfig.stylists[0]?.id ?? 'any'
  );
  const [guestName, setGuestName] = useState('');
  const [guestNote, setGuestNote] = useState('');

  const filteredServices = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return salonConfig.services.filter((service) => {
      const matchesCategory =
        activeCategory === 'All' || service.category === activeCategory;
      if (!matchesCategory) return false;
      if (!query) return true;
      return (
        service.name.toLowerCase().includes(query) ||
        service.note.toLowerCase().includes(query) ||
        service.category.toLowerCase().includes(query)
      );
    });
  }, [activeCategory, searchQuery]);

  const selectedServices = useMemo(() => {
    return salonConfig.services.filter((service) =>
      selectedIds.includes(service.id)
    );
  }, [selectedIds]);

  const totalDurationMins = useMemo(
    () =>
      selectedServices.reduce((sum, item) => sum + item.durationMins, 0),
    [selectedServices]
  );

  const totalPriceInr = useMemo(
    () => selectedServices.reduce((sum, item) => sum + item.priceInr, 0),
    [selectedServices]
  );

  const handleToggleService = (serviceId: string) => {
    setSelectedIds((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleBookWithArtist = (artistId: string) => {
    setSelectedStylistId(artistId);
    setIsDrawerOpen(true);
  };

  const handleRequestSlot = () => {
    setIsDrawerOpen(false);
    setIsDemoModalOpen(true);
  };

  const handleBackToEdit = () => {
    setIsDemoModalOpen(false);
    setIsDrawerOpen(true);
  };

  const formattedMessage = useMemo(() => {
    const preferredDay =
      dayOptions.find((d) => d.id === selectedDayId) ?? dayOptions[0];
    const timeWindow =
      salonConfig.timeWindows.find((w) => w.id === selectedTimeWindowId) ??
      salonConfig.timeWindows[0];
    const stylist =
      salonConfig.stylists.find((s) => s.id === selectedStylistId) ??
      salonConfig.stylists[0];

    return buildWhatsAppBookingMessage({
      studioName: salonConfig.studio.name,
      neighborhood: salonConfig.studio.neighborhood,
      selectedServices,
      totalDurationMins,
      totalPriceInr,
      preferredDay,
      timeWindow,
      stylist,
      guestName,
      guestNote,
    });
  }, [
    dayOptions,
    selectedDayId,
    selectedTimeWindowId,
    selectedStylistId,
    selectedServices,
    totalDurationMins,
    totalPriceInr,
    guestName,
    guestNote,
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F6F7] text-[#121517]">
      <Header
        shortName={salonConfig.studio.shortName}
        selectedCount={selectedServices.length}
        onOpenDrawer={() => setIsDrawerOpen(true)}
      />

      <main className={`flex-1 ${selectedServices.length > 0 ? 'pb-20 md:pb-0' : ''}`}>
        <HeroSection
          studio={salonConfig.studio}
          highlights={salonConfig.highlights}
          onBookViaWhatsApp={() => setIsDrawerOpen(true)}
        />

        <ServiceMenu
          categories={salonConfig.categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          services={filteredServices}
          totalCount={salonConfig.services.length}
          selectedIds={selectedIds}
          onToggleService={handleToggleService}
        />

        <AtelierSection
          studio={salonConfig.studio}
          stylists={salonConfig.stylists}
          hours={salonConfig.hours}
          onBookWithArtist={handleBookWithArtist}
        />
      </main>

      <Footer
        studio={salonConfig.studio}
        onOpenDrawer={() => setIsDrawerOpen(true)}
      />

      {selectedServices.length > 0 && !isDrawerOpen && !isDemoModalOpen && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#FFFFFF]/95 backdrop-blur-md border-t border-[#DCE2E5] px-4 py-2.5">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs text-[#525C62] truncate tabular-nums">
                {selectedServices.length}{' '}
                {selectedServices.length === 1 ? 'treatment' : 'treatments'} ·{' '}
                {formatShortDuration(totalDurationMins)}
              </p>
              <p className="text-lg font-semibold tracking-tight text-[#121517] tabular-nums leading-tight">
                {formatInr(totalPriceInr)}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              className="min-h-[44px] px-4 py-2 rounded-lg bg-[#2A5C63] text-[#FFFFFF] text-sm font-medium inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4 shrink-0" strokeWidth={1.75} />
              <span>Review Slot</span>
            </button>
          </div>
        </div>
      )}

      <AppointmentDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        selectedServices={selectedServices}
        onRemoveService={(id) =>
          setSelectedIds((prev) => prev.filter((item) => item !== id))
        }
        onClearAll={() => setSelectedIds([])}
        dayOptions={dayOptions}
        selectedDayId={selectedDayId}
        onSelectDay={setSelectedDayId}
        timeWindows={salonConfig.timeWindows}
        selectedTimeWindowId={selectedTimeWindowId}
        onSelectTimeWindow={setSelectedTimeWindowId}
        stylists={salonConfig.stylists}
        selectedStylistId={selectedStylistId}
        onSelectStylist={setSelectedStylistId}
        guestName={guestName}
        onGuestNameChange={setGuestName}
        guestNote={guestNote}
        onGuestNoteChange={setGuestNote}
        onRequestSlot={handleRequestSlot}
      />

      <DemoBookingModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onBackToEdit={handleBackToEdit}
        whatsappNumber={salonConfig.studio.whatsappNumber}
        formattedMessage={formattedMessage}
      />
    </div>
  );
}

export default App;
