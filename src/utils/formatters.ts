import type { DayOption, ServiceItem, StylistProfile, TimeWindowOption } from '../types/salon';

export function formatInr(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDuration(totalMins: number): string {
  if (totalMins <= 0) return '0 mins';
  if (totalMins < 60) return `${totalMins} mins`;
  const hours = Math.floor(totalMins / 60);
  const mins = totalMins % 60;
  if (mins === 0) {
    return `${hours} ${hours === 1 ? 'hr' : 'hrs'} (${totalMins} mins)`;
  }
  return `${hours} ${hours === 1 ? 'hr' : 'hrs'} ${mins} mins (${totalMins} mins)`;
}

export function formatShortDuration(totalMins: number): string {
  if (totalMins < 60) return `${totalMins} mins`;
  const hours = Math.floor(totalMins / 60);
  const mins = totalMins % 60;
  return mins === 0 ? `${hours}h` : `${hours}h ${mins}m`;
}

export function getUpcomingOpenDays(closedWeekdays: number[], count = 7): DayOption[] {
  const options: DayOption[] = [];
  const today = new Date();
  let offset = 0;

  while (options.length < count && offset < 21) {
    const date = new Date(today);
    date.setDate(today.getDate() + offset);
    const weekday = date.getDay();

    if (!closedWeekdays.includes(weekday)) {
      const dayName = date.toLocaleDateString('en-IN', { weekday: 'short' });
      const dateStr = date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
      });
      const fullLabel = date.toLocaleDateString('en-IN', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      });

      const prefix = offset === 0 ? 'Today' : offset === 1 ? 'Tomorrow' : dayName;

      options.push({
        id: date.toISOString().split('T')[0],
        shortLabel: `${prefix} · ${dateStr}`,
        fullLabel: offset === 0 ? `Today, ${fullLabel}` : offset === 1 ? `Tomorrow, ${fullLabel}` : fullLabel,
        dayName: prefix,
      });
    }
    offset += 1;
  }

  return options;
}

export interface WhatsAppMessageParams {
  studioName: string;
  neighborhood: string;
  selectedServices: ServiceItem[];
  totalDurationMins: number;
  totalPriceInr: number;
  preferredDay: DayOption;
  timeWindow: TimeWindowOption;
  stylist: StylistProfile;
  guestName?: string;
  guestNote?: string;
}

export function buildWhatsAppBookingMessage({
  studioName,
  neighborhood,
  selectedServices,
  totalDurationMins,
  totalPriceInr,
  preferredDay,
  timeWindow,
  stylist,
  guestName,
  guestNote,
}: WhatsAppMessageParams): string {
  const lines: string[] = [
    `Hello ${studioName} (${neighborhood}),`,
    '',
  ];

  if (selectedServices.length > 0) {
    lines.push('I would like to request an appointment for the following treatments:');
    lines.push('');
    selectedServices.forEach((service, idx) => {
      lines.push(
        `${idx + 1}. ${service.name} (${service.durationMins} mins) — ${formatInr(service.priceInr)}`
      );
    });
    lines.push('');
    lines.push(`Estimated Duration: ${formatDuration(totalDurationMins)}`);
    lines.push(`Estimated Total: ${formatInr(totalPriceInr)}`);
  } else {
    lines.push('I would like to request a consultation and appointment slot.');
  }

  lines.push('');
  lines.push(`Preferred Day: ${preferredDay.fullLabel}`);
  lines.push(`Preferred Window: ${timeWindow.label} (${timeWindow.range})`);
  lines.push(`Artist Preference: ${stylist.name}`);

  if (guestName && guestName.trim()) {
    lines.push(`Guest Name: ${guestName.trim()}`);
  }

  if (guestNote && guestNote.trim()) {
    lines.push(`Notes: ${guestNote.trim()}`);
  }

  lines.push('');
  lines.push('Please let me know available slots. Thank you.');

  return lines.join('\n');
}
