export type Service = {
  title: string;
  day: number; // 0 = Sunday, 1 = Monday ... 6 = Saturday
  hour: number; // 24-hour clock, India Standard Time
  minute: number;
  // How long the service counts as "happening now". Adjust to the real length.
  durationMinutes: number;
};

// Weekly worship timings, in India Standard Time.
export const services: Service[] = [
  { title: "Sunday Worship", day: 0, hour: 9, minute: 30, durationMinutes: 150 },
  { title: "Sunday School", day: 0, hour: 16, minute: 0, durationMinutes: 90 },
  { title: "Bible Classes", day: 3, hour: 10, minute: 30, durationMinutes: 120 },
  { title: "Healing Service", day: 3, hour: 19, minute: 0, durationMinutes: 120 },
  {
    title: "Fasting Prayer & Bible Study",
    day: 5,
    hour: 19,
    minute: 0,
    durationMinutes: 120,
  },
];

export const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function formatServiceTime(service: Pick<Service, "hour" | "minute">) {
  const hour12 = service.hour % 12 === 0 ? 12 : service.hour % 12;
  const minutes = String(service.minute).padStart(2, "0");
  return `${hour12}:${minutes} ${service.hour < 12 ? "AM" : "PM"}`;
}
