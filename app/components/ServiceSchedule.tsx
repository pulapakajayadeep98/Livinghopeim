"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { dayNames, formatServiceTime, services } from "../data/services";
import type { Service } from "../data/services";

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
// India Standard Time is UTC+5:30 all year, so service times are fixed to it
// no matter where the visitor is.
const IST_OFFSET = 5.5 * HOUR;

const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

type Occurrence = {
  service: Service;
  start: number;
  end: number;
  dayOffset: number; // 0 = today in India, 1 = tomorrow ...
};

function subscribeToClock(onTick: () => void) {
  const timer = window.setInterval(onTick, SECOND);
  return () => window.clearInterval(timer);
}

// Reading the UTC fields of this date gives the calendar date in India.
function indiaDate(now: number, dayOffset = 0) {
  return new Date(now + IST_OFFSET + dayOffset * DAY);
}

function upcomingOccurrences(now: number): Occurrence[] {
  const list: Occurrence[] = [];

  // Start from yesterday so a late service that is still running is included.
  for (let dayOffset = -1; dayOffset <= 7; dayOffset += 1) {
    const date = indiaDate(now, dayOffset);
    for (const service of services) {
      if (service.day !== date.getUTCDay()) continue;
      const start =
        Date.UTC(
          date.getUTCFullYear(),
          date.getUTCMonth(),
          date.getUTCDate(),
          service.hour,
          service.minute
        ) - IST_OFFSET;
      const end = start + service.durationMinutes * MINUTE;
      if (end > now) list.push({ service, start, end, dayOffset });
    }
  }

  return list.sort((a, b) => a.start - b.start);
}

function dayLabel(now: number, dayOffset: number) {
  if (dayOffset === 0) return "Today";
  if (dayOffset === 1) return "Tomorrow";
  return dayNames[indiaDate(now, dayOffset).getUTCDay()];
}

function dateLabel(now: number, dayOffset: number) {
  const date = indiaDate(now, dayOffset);
  return `${date.getUTCDate()} ${monthNames[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

export default function ServiceSchedule() {
  // Ticks once a second in the browser; the server renders a placeholder so
  // the page never ships a stale date.
  const seconds = useSyncExternalStore(
    subscribeToClock,
    () => Math.floor(Date.now() / SECOND),
    () => null
  );

  if (seconds === null) {
    return <div className="mt-12 min-h-[520px]" />;
  }

  const now = seconds * SECOND;
  const upcoming = upcomingOccurrences(now);
  const current = upcoming[0];
  const isLive = current.start <= now;
  const following = upcoming.find((item) => item.start > now);

  const remaining = Math.max(current.start - now, 0);
  const countdown = [
    { label: "Days", value: Math.floor(remaining / DAY) },
    { label: "Hours", value: Math.floor((remaining % DAY) / HOUR) },
    { label: "Minutes", value: Math.floor((remaining % HOUR) / MINUTE) },
    { label: "Seconds", value: Math.floor((remaining % MINUTE) / SECOND) },
  ];

  const week = Array.from({ length: 7 }, (_, dayOffset) => {
    const date = indiaDate(now, dayOffset);
    return {
      dayOffset,
      weekday: dayNames[date.getUTCDay()].slice(0, 3),
      dayOfMonth: date.getUTCDate(),
      month: monthNames[date.getUTCMonth()],
      services: services
        .filter((service) => service.day === date.getUTCDay())
        .sort((a, b) => a.hour * 60 + a.minute - (b.hour * 60 + b.minute)),
    };
  });

  return (
    <div className="mt-12">
      <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#0b1a3a] via-[#241246] to-[#4b2a7a] p-8 text-white shadow-[0_18px_40px_rgba(11,26,58,0.25)] sm:p-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#f1d27a]">
              <span className="relative flex h-3 w-3">
                <span
                  className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${
                    isLive ? "bg-red-500" : "bg-[#5ab4f0]"
                  }`}
                />
                <span
                  className={`relative inline-flex h-3 w-3 rounded-full ${
                    isLive ? "bg-red-500" : "bg-[#5ab4f0]"
                  }`}
                />
              </span>
              {isLive ? "Happening now" : "Next service"}
            </p>
            <h3 className="mt-4 font-serif text-3xl font-semibold sm:text-4xl">
              {current.service.title}
            </h3>
            <p className="mt-3 text-lg text-white/85">
              {dayLabel(now, current.dayOffset)},{" "}
              {dateLabel(now, current.dayOffset)} at{" "}
              {formatServiceTime(current.service)}
            </p>
            {isLive && following ? (
              <p className="mt-2 text-sm text-white/70">
                Up next: {following.service.title},{" "}
                {dayLabel(now, following.dayOffset)} at{" "}
                {formatServiceTime(following.service)}
              </p>
            ) : null}
          </div>

          {isLive ? (
            <Link
              href="/watch-live"
              className="self-start rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[#0b1a3a] shadow-lg shadow-black/20 transition-all hover:-translate-y-0.5 lg:self-center"
            >
              Watch Live
            </Link>
          ) : (
            <div className="grid grid-cols-4 gap-3 text-center">
              {countdown.map((part) => (
                <div
                  key={part.label}
                  className="min-w-[68px] rounded-2xl bg-white/10 px-3 py-4 ring-1 ring-white/15"
                >
                  <p className="font-serif text-3xl font-semibold tabular-nums">
                    {String(part.value).padStart(2, "0")}
                  </p>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-white/70">
                    {part.label}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Swipeable row on phones and tablets, full week grid on desktop */}
      <div className="-mx-6 mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-8 pt-4 [scrollbar-width:none] lg:mx-0 lg:grid lg:grid-cols-7 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden">
        {week.map((day) => {
          const isToday = day.dayOffset === 0;
          const hasServices = day.services.length > 0;

          return (
            <div
              key={day.dayOffset}
              className={`group flex w-40 shrink-0 snap-start scroll-ml-6 flex-col overflow-hidden lg:h-full lg:w-auto rounded-2xl bg-white shadow-[0_15px_35px_rgba(11,26,58,0.12)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_45px_rgba(11,26,58,0.2)] ${
                isToday ? "ring-2 ring-[#d4af37]" : "ring-1 ring-slate-100"
              }`}
            >
              {/* Date header */}
              <div
                className={`relative px-4 pb-4 pt-3 text-center ${
                  hasServices
                    ? "bg-gradient-to-br from-[#0b1a3a] via-[#241246] to-[#4b2a7a] text-white"
                    : "bg-[#f1ecfb] text-[#0b1a3a]"
                }`}
              >
                <p
                  className={`text-[11px] font-semibold uppercase tracking-[0.25em] ${
                    hasServices ? "text-[#f1d27a]" : "text-[#4b2a7a]"
                  }`}
                >
                  {day.weekday}
                </p>
                <p className="mt-1 font-serif text-4xl font-semibold leading-none">
                  {day.dayOfMonth}
                </p>
                <p
                  className={`mt-1 text-[11px] font-semibold uppercase tracking-widest ${
                    hasServices ? "text-white/70" : "text-slate-500"
                  }`}
                >
                  {day.month}
                </p>
                {isToday ? (
                  <span className="absolute right-2 top-2 rounded-full bg-[#d4af37] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#0b1a3a]">
                    Today
                  </span>
                ) : null}
              </div>

              {/* Services */}
              <div className="flex flex-1 flex-col gap-2 p-3">
                {hasServices ? (
                  day.services.map((service) => {
                    const isNext =
                      current.dayOffset === day.dayOffset &&
                      current.service.title === service.title;

                    return (
                      <div
                        key={service.title}
                        className={`rounded-xl border-l-4 px-3 py-2 ${
                          isNext
                            ? "border-[#d4af37] bg-[#fff8e1]"
                            : "border-[#4b2a7a]/40 bg-[#f8f5ff]"
                        }`}
                      >
                        <p className="flex items-center gap-1.5 text-sm font-bold text-[#4b2a7a]">
                          <svg
                            width="13"
                            height="13"
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden="true"
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="9"
                              stroke="currentColor"
                              strokeWidth="2.2"
                            />
                            <path
                              d="M12 7v5l3 2"
                              stroke="currentColor"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          {formatServiceTime(service)}
                        </p>
                        <p className="mt-0.5 text-sm font-medium leading-5 text-[#0b1a3a]">
                          {service.title}
                        </p>
                        {isNext ? (
                          <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-[#b8901f]">
                            {isLive ? "Happening now" : "Next service"}
                          </p>
                        ) : null}
                      </div>
                    );
                  })
                ) : (
                  <div className="flex flex-1 flex-col items-center justify-center gap-2 py-4 text-center">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                      className="text-[#4b2a7a]/40"
                    >
                      <path
                        d="M12 4v16M7 9h10"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      />
                    </svg>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      No service
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-center text-xs font-semibold uppercase tracking-widest text-[#4b2a7a]/70 lg:hidden">
        Swipe to see the week &rarr;
      </p>

      <p className="mt-6 text-center text-sm text-slate-500">
        All times are India Standard Time (IST).
      </p>
    </div>
  );
}
