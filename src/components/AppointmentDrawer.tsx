import { useEffect } from 'react';
import { MessageCircle, Plus, Trash2, X } from 'lucide-react';
import type {
  DayOption,
  ServiceItem,
  StylistProfile,
  TimeWindowOption,
} from '../types/salon';
import { formatDuration, formatInr } from '../utils/formatters';

interface AppointmentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedServices: ServiceItem[];
  onRemoveService: (serviceId: string) => void;
  onClearAll: () => void;
  dayOptions: DayOption[];
  selectedDayId: string;
  onSelectDay: (dayId: string) => void;
  timeWindows: TimeWindowOption[];
  selectedTimeWindowId: string;
  onSelectTimeWindow: (windowId: string) => void;
  stylists: StylistProfile[];
  selectedStylistId: string;
  onSelectStylist: (stylistId: string) => void;
  guestName: string;
  onGuestNameChange: (name: string) => void;
  guestNote: string;
  onGuestNoteChange: (note: string) => void;
  onRequestSlot: () => void;
}

export function AppointmentDrawer({
  isOpen,
  onClose,
  selectedServices,
  onRemoveService,
  onClearAll,
  dayOptions,
  selectedDayId,
  onSelectDay,
  timeWindows,
  selectedTimeWindowId,
  onSelectTimeWindow,
  stylists,
  selectedStylistId,
  onSelectStylist,
  guestName,
  onGuestNameChange,
  guestNote,
  onGuestNoteChange,
  onRequestSlot,
}: AppointmentDrawerProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const totalDurationMins = selectedServices.reduce(
    (sum, item) => sum + item.durationMins,
    0
  );
  const totalPriceInr = selectedServices.reduce(
    (sum, item) => sum + item.priceInr,
    0
  );

  return (
    <div
      className="fixed inset-0 z-40 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="appointment-drawer-title"
    >
      <div
        className="fixed inset-0 bg-[#121517]/40 backdrop-blur-[2px] transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <aside className="relative z-10 w-full max-w-lg bg-[#F4F6F7] text-[#121517] h-full flex flex-col border-l border-[#DCE2E5] shadow-2xl">
        <div className="px-5 sm:px-6 py-4 border-b border-[#DCE2E5] flex items-center justify-between gap-4 bg-[#FFFFFF]">
          <div>
            <p className="text-xs font-semibold text-[#2A5C63]">
              Serein Dermal & Hair Studio · Indiranagar
            </p>
            <h2
              id="appointment-drawer-title"
              className="text-xl font-semibold tracking-tight text-[#121517]"
            >
              Your Appointment Request
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close appointment drawer"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-[#525C62] hover:text-[#121517] hover:bg-[#EAEEF0] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A5C63]"
          >
            <X className="w-5 h-5" strokeWidth={1.75} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-6 space-y-7">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#525C62]">
                Selected Treatments ({selectedServices.length})
              </h3>
              {selectedServices.length > 0 && (
                <button
                  type="button"
                  onClick={onClearAll}
                  className="text-xs font-medium text-[#525C62] hover:text-[#121517] underline underline-offset-4 cursor-pointer"
                >
                  Clear all
                </button>
              )}
            </div>

            {selectedServices.length === 0 ? (
              <div className="p-5 rounded-xl bg-[#FFFFFF] border border-[#DCE2E5] text-center space-y-3">
                <p className="text-base font-semibold tracking-tight text-[#121517]">
                  No treatments selected yet
                </p>
                <p className="text-sm text-[#525C62]">
                  Pick rituals from our menu to see estimated time and pricing, or continue below to request a general consultation slot.
                </p>
                <a
                  href="#menu"
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 min-h-[40px] px-4 py-2 rounded-lg bg-[#EAEEF0] text-xs font-medium text-[#121517] hover:bg-[#DCE2E5] transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" strokeWidth={2} />
                  <span>Browse Service Menu</span>
                </a>
              </div>
            ) : (
              <ul className="divide-y divide-[#DCE2E5] border-y border-[#DCE2E5]">
                {selectedServices.map((item) => (
                  <li
                    key={item.id}
                    className="py-3.5 flex items-start justify-between gap-4"
                  >
                    <div className="min-w-0">
                      <p className="text-xs text-[#525C62] mb-0.5">
                        {item.category}
                      </p>
                      <p className="font-semibold text-sm text-[#121517]">
                        {item.name}
                      </p>
                      <p className="text-xs text-[#525C62] mt-1 tabular-nums">
                        {item.durationMins} mins · {formatInr(item.priceInr)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemoveService(item.id)}
                      aria-label={`Remove ${item.name}`}
                      className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-[#525C62] hover:text-[#121517] hover:bg-[#EAEEF0] transition-colors shrink-0 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" strokeWidth={1.75} />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {selectedServices.length > 0 && (
              <div className="mt-4 pt-2 flex items-center justify-between text-sm">
                <div>
                  <p className="text-xs text-[#525C62]">Total Duration</p>
                  <p className="font-semibold text-[#121517] tabular-nums">
                    {formatDuration(totalDurationMins)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[#525C62]">Estimated Total</p>
                  <p className="text-xl font-semibold tracking-tight text-[#121517] tabular-nums">
                    {formatInr(totalPriceInr)}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#525C62] mb-3">
              Preferred Day (Closed Mondays)
            </label>
            <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
              {dayOptions.map((day) => {
                const active = selectedDayId === day.id;
                return (
                  <button
                    key={day.id}
                    type="button"
                    onClick={() => onSelectDay(day.id)}
                    aria-pressed={active}
                    className={`min-h-[44px] px-3.5 py-2 rounded-lg text-xs font-medium border transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-[#2A5C63] border-[#2A5C63] text-[#FFFFFF]'
                        : 'bg-[#FFFFFF] border-[#DCE2E5] text-[#121517] hover:border-[#121517]/30'
                    }`}
                  >
                    {day.shortLabel}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#525C62] mb-3">
              Preferred Time Window
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {timeWindows.map((win) => {
                const active = selectedTimeWindowId === win.id;
                return (
                  <button
                    key={win.id}
                    type="button"
                    onClick={() => onSelectTimeWindow(win.id)}
                    aria-pressed={active}
                    className={`min-h-[56px] p-3 rounded-xl border text-left transition-all duration-150 cursor-pointer ${
                      active
                        ? 'bg-[#2A5C63] border-[#2A5C63] text-[#FFFFFF]'
                        : 'bg-[#FFFFFF] border-[#DCE2E5] text-[#121517] hover:border-[#121517]/30'
                    }`}
                  >
                    <p className="text-sm font-semibold">{win.label}</p>
                    <p
                      className={`text-xs mt-0.5 tabular-nums ${
                        active ? 'text-[#FFFFFF]/85' : 'text-[#525C62]'
                      }`}
                    >
                      {win.range}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label
              htmlFor="stylist-select"
              className="block text-xs font-semibold uppercase tracking-wider text-[#525C62] mb-2.5"
            >
              Stylist &amp; Therapist Preference
            </label>
            <select
              id="stylist-select"
              value={selectedStylistId}
              onChange={(e) => onSelectStylist(e.target.value)}
              className="w-full min-h-[46px] px-3.5 py-2.5 rounded-lg bg-[#FFFFFF] border border-[#DCE2E5] text-sm text-[#121517] focus:outline-none focus:border-[#2A5C63] focus:ring-1 focus:ring-[#2A5C63]"
            >
              {stylists.map((stylist) => (
                <option key={stylist.id} value={stylist.id}>
                  {stylist.name} — {stylist.role}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 gap-4 pt-1">
            <div>
              <label
                htmlFor="guest-name"
                className="block text-xs font-medium text-[#525C62] mb-1.5"
              >
                Your Name (optional)
              </label>
              <input
                id="guest-name"
                type="text"
                value={guestName}
                onChange={(e) => onGuestNameChange(e.target.value)}
                placeholder="e.g., Priya Sharma"
                className="w-full min-h-[44px] px-3.5 py-2 rounded-lg bg-[#FFFFFF] border border-[#DCE2E5] text-sm text-[#121517] placeholder:text-[#525C62]/65 focus:outline-none focus:border-[#2A5C63] focus:ring-1 focus:ring-[#2A5C63]"
              />
            </div>

            <div>
              <label
                htmlFor="guest-note"
                className="block text-xs font-medium text-[#525C62] mb-1.5"
              >
                Preferences or Sensitivities (optional)
              </label>
              <textarea
                id="guest-note"
                rows={2}
                value={guestNote}
                onChange={(e) => onGuestNoteChange(e.target.value)}
                placeholder="e.g., Sensitive scalp, fragrance-free skin products"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#FFFFFF] border border-[#DCE2E5] text-sm text-[#121517] placeholder:text-[#525C62]/65 focus:outline-none focus:border-[#2A5C63] focus:ring-1 focus:ring-[#2A5C63] resize-none"
              />
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-6 border-t border-[#DCE2E5] bg-[#FFFFFF] space-y-3">
          <button
            type="button"
            onClick={onRequestSlot}
            className="w-full min-h-[48px] px-5 py-3 rounded-lg bg-[#2A5C63] text-[#FFFFFF] text-sm font-medium hover:bg-[#214A50] active:scale-[0.99] transition-all duration-150 inline-flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A5C63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFFFF]"
          >
            <MessageCircle className="w-4 h-4 shrink-0" strokeWidth={1.75} />
            <span>Request Slot via WhatsApp</span>
          </button>
          <p className="text-xs text-center text-[#525C62]">
            Preview your formatted WhatsApp booking summary before sending.
          </p>
        </div>
      </aside>
    </div>
  );
}
