import { EventItem } from '../types';

export interface EventTimingInfo {
  isPast: boolean;
  isOngoing: boolean;
  diffDays: number;
  label: string;
  urgency: 'today' | 'tomorrow' | 'this-week' | 'soon' | 'future' | 'past';
  startDate: Date | null;
  endDate: Date | null;
}

/**
 * Parses event date strings into start and end Date objects.
 * Handles:
 *  - Single dates: "September 07, 2026", "Sept 15, 2026", "October 15, 2026"
 *  - Date ranges in same month: "November 09 - 13, 2026", "Nov 09 – 13, 2026"
 *  - Multi-month ranges: "October 30 - November 02, 2026"
 */
export function parseEventDateRange(dateStr: string): { start: Date; end: Date } | null {
  if (!dateStr || typeof dateStr !== 'string') return null;
  const raw = dateStr.trim();

  // Pattern 1: Same month range e.g. "November 09 - 13, 2026" or "Nov 09 – 13, 2026"
  const sameMonthRange = raw.match(/^([A-Za-z]+)\s+(\d{1,2})\s*[-–—]\s*(\d{1,2}),?\s*(\d{4})$/);
  if (sameMonthRange) {
    const [, month, startDay, endDay, year] = sameMonthRange;
    const start = new Date(`${month} ${startDay}, ${year} 00:00:00`);
    const end = new Date(`${month} ${endDay}, ${year} 23:59:59`);
    if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
      return { start, end };
    }
  }

  // Pattern 2: Multi-month range e.g. "October 30 - November 02, 2026"
  const multiMonthRange = raw.match(/^([A-Za-z]+\s+\d{1,2})\s*[-–—]\s*([A-Za-z]+\s+\d{1,2}),?\s*(\d{4})$/);
  if (multiMonthRange) {
    const [, startPart, endPart, year] = multiMonthRange;
    const start = new Date(`${startPart}, ${year} 00:00:00`);
    const end = new Date(`${endPart}, ${year} 23:59:59`);
    if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
      return { start, end };
    }
  }

  // Pattern 3: Standard single date (normalizing "Sept" to "Sep")
  const normalized = raw.replace(/^Sept\b/i, 'Sep');
  const parsed = new Date(normalized);
  if (!isNaN(parsed.getTime())) {
    const start = new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate(), 0, 0, 0);
    const end = new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate(), 23, 59, 59);
    return { start, end };
  }

  return null;
}

/**
 * Returns true if an event has completely finished based on the reference date.
 * If an event has a range (e.g. Nov 09 - 13), it is only past after the end date expires.
 */
export function isEventPast(dateStr: string, referenceDate: Date = new Date()): boolean {
  const dates = parseEventDateRange(dateStr);
  if (!dates) return false;
  return dates.end.getTime() < referenceDate.getTime();
}

/**
 * Calculates timing, countdown, and urgency information for an event.
 */
export function getEventTiming(dateStr: string, referenceDate: Date = new Date()): EventTimingInfo {
  const dates = parseEventDateRange(dateStr);
  if (!dates) {
    return {
      isPast: false,
      isOngoing: false,
      diffDays: 999,
      label: 'Scheduled',
      urgency: 'future',
      startDate: null,
      endDate: null,
    };
  }

  const { start, end } = dates;
  const isPast = end.getTime() < referenceDate.getTime();
  const isOngoing = referenceDate.getTime() >= start.getTime() && referenceDate.getTime() <= end.getTime();

  const todayStart = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), referenceDate.getDate()).getTime();
  const eventStartDay = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
  const diffDays = Math.round((eventStartDay - todayStart) / (1000 * 60 * 60 * 24));

  if (isPast) {
    const daysAgo = Math.abs(diffDays);
    const label = daysAgo === 1 ? 'Concluded yesterday' : `Concluded ${daysAgo} days ago`;
    return {
      isPast: true,
      isOngoing: false,
      diffDays,
      label,
      urgency: 'past',
      startDate: start,
      endDate: end,
    };
  }

  if (isOngoing) {
    return {
      isPast: false,
      isOngoing: true,
      diffDays: 0,
      label: 'Happening Today!',
      urgency: 'today',
      startDate: start,
      endDate: end,
    };
  }

  if (diffDays === 1) {
    return {
      isPast: false,
      isOngoing: false,
      diffDays: 1,
      label: 'Happening Tomorrow',
      urgency: 'tomorrow',
      startDate: start,
      endDate: end,
    };
  }

  if (diffDays <= 7) {
    return {
      isPast: false,
      isOngoing: false,
      diffDays,
      label: `In ${diffDays} days`,
      urgency: 'this-week',
      startDate: start,
      endDate: end,
    };
  }

  if (diffDays <= 21) {
    return {
      isPast: false,
      isOngoing: false,
      diffDays,
      label: `In ${diffDays} days`,
      urgency: 'soon',
      startDate: start,
      endDate: end,
    };
  }

  const weeks = Math.round(diffDays / 7);
  return {
    isPast: false,
    isOngoing: false,
    diffDays,
    label: `In ~${weeks} weeks`,
    urgency: 'future',
    startDate: start,
    endDate: end,
  };
}

/**
 * Sorts events chronologically by start date.
 */
export function sortEventsChronologically(events: EventItem[], ascending: boolean = true): EventItem[] {
  return [...events].sort((a, b) => {
    const timingA = parseEventDateRange(a.date);
    const timingB = parseEventDateRange(b.date);

    const timeA = timingA ? timingA.start.getTime() : 0;
    const timeB = timingB ? timingB.start.getTime() : 0;

    return ascending ? timeA - timeB : timeB - timeA;
  });
}
