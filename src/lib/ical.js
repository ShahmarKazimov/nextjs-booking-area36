/**
 * iCalendar (.ics) parser for Airbnb and other booking platforms.
 * Extracts booked date ranges and individual booked nights.
 */

export function formatDateISO(date) {
  const d = new Date(date);
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function parseIcsDate(raw) {
  if (!raw) return null;
  const val = raw.includes(":") ? raw.split(":").pop().trim() : raw.trim();
  if (val.length < 8) return null;

  const year = parseInt(val.substring(0, 4), 10);
  const month = parseInt(val.substring(4, 6), 10) - 1;
  const day = parseInt(val.substring(6, 8), 10);

  if (isNaN(year) || isNaN(month) || isNaN(day)) return null;

  return new Date(Date.UTC(year, month, day));
}

export function parseIcsCalendar(icsContent) {
  if (!icsContent || typeof icsContent !== "string") {
    return { bookedRanges: [], bookedDates: [] };
  }

  const events = [];
  const lines = icsContent.split(/\r\n|\n|\r/);

  let inEvent = false;
  let currentEvent = {};

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();

    // Handle RFC 5545 line folding (unfolding continued lines)
    while (i + 1 < lines.length && (lines[i + 1].startsWith(" ") || lines[i + 1].startsWith("\t"))) {
      i++;
      line += lines[i].trim();
    }

    if (line === "BEGIN:VEVENT") {
      inEvent = true;
      currentEvent = {};
    } else if (line === "END:VEVENT") {
      inEvent = false;
      if (currentEvent.start && currentEvent.end) {
        events.push(currentEvent);
      }
    } else if (inEvent) {
      if (line.startsWith("DTSTART")) {
        currentEvent.start = parseIcsDate(line);
      } else if (line.startsWith("DTEND")) {
        currentEvent.end = parseIcsDate(line);
      } else if (line.startsWith("SUMMARY")) {
        currentEvent.summary = line.split(":").slice(1).join(":").trim();
      }
    }
  }

  const bookedRanges = [];
  const bookedDatesSet = new Set();

  for (const ev of events) {
    if (!ev.start || !ev.end) continue;
    if (ev.end <= ev.start) continue;

    const startStr = formatDateISO(ev.start);
    const endStr = formatDateISO(ev.end);

    bookedRanges.push({
      start: startStr,
      end: endStr,
      summary: ev.summary || "Reserved",
    });

    // In Airbnb iCal, DTSTART is arrival date, DTEND is departure date.
    // The night of DTEND is available for the next guest.
    const cur = new Date(ev.start.getTime());
    while (cur < ev.end) {
      bookedDatesSet.add(formatDateISO(cur));
      cur.setUTCDate(cur.getUTCDate() + 1);
    }
  }

  return {
    bookedRanges,
    bookedDates: Array.from(bookedDatesSet).sort(),
  };
}

