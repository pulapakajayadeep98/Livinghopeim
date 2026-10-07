import "server-only";

// YouTube channel "Living Hope In" (@Livinghopein)
export const CHANNEL_ID = "UCUtkViqk6qqHBJzKc2kIq3g";
export const CHANNEL_URL = "https://www.youtube.com/@Livinghopein";

// How many earlier messages are listed under the main player.
export const PREVIOUS_MESSAGE_COUNT = 6;

export type Stream = {
  id: string;
  title: string;
};

export type LiveData = {
  live: Stream | null; // the stream being broadcast right now, if any
  streams: Stream[]; // finished streams, newest first
};

const BROWSER_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
  "Accept-Language": "en",
};

const VIDEO_ID = "[A-Za-z0-9_-]{11}";

function decodeEntities(text: string) {
  return text
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&amp;/g, "&");
}

// YouTube's RSS feeds are unreliable (they often answer 404/500 for every
// channel), so the channel's own "Live" tab is read first and the feed is
// only a fallback.
async function fetchStreams(): Promise<Stream[]> {
  const fromPage = await fetchStreamsPage().catch(() => []);
  if (fromPage.length > 0) return fromPage;
  return fetchStreamsFeed().catch(() => []);
}

// The channel's "Live" tab, newest first. Only broadcasts that have finished
// ("Streamed 2d ago") are kept, so live and upcoming ones are skipped.
async function fetchStreamsPage(): Promise<Stream[]> {
  const response = await fetch(
    `https://www.youtube.com/channel/${CHANNEL_ID}/streams?hl=en`,
    { headers: BROWSER_HEADERS, next: { revalidate: 300 } }
  );
  if (!response.ok) return [];

  const html = await response.text();
  const streams: Stream[] = [];
  for (const card of html.split('"lockupViewModel":{').slice(1)) {
    const id = card.match(new RegExp(`"contentId":"(${VIDEO_ID})"`));
    const title = card.match(
      /"lockupMetadataViewModel":\{"title":\{"content":"((?:[^"\\]|\\.)*)"/
    );
    if (!id || !/"Streamed /.test(card)) continue;
    if (streams.some((stream) => stream.id === id[1])) continue;

    let text = "Living Hope message";
    if (title) {
      try {
        text = JSON.parse(`"${title[1]}"`);
      } catch {
        text = title[1];
      }
    }
    streams.push({ id: id[1], title: text });
  }
  return streams;
}

// The channel's "live streams" playlist feed, which YouTube keeps newest first.
async function fetchStreamsFeed(): Promise<Stream[]> {
  const playlistId = `UULV${CHANNEL_ID.slice(2)}`;
  const response = await fetch(
    `https://www.youtube.com/feeds/videos.xml?playlist_id=${playlistId}`,
    { headers: BROWSER_HEADERS, next: { revalidate: 300 } }
  );
  if (!response.ok) return [];

  const xml = await response.text();
  const streams: Stream[] = [];
  for (const entry of xml.split("<entry>").slice(1)) {
    const id = entry.match(new RegExp(`<yt:videoId>(${VIDEO_ID})</yt:videoId>`));
    const title = entry.match(/<title>([^<]*)<\/title>/);
    if (id) {
      streams.push({
        id: id[1],
        title: decodeEntities(title?.[1] ?? "Living Hope message"),
      });
    }
  }
  return streams;
}

// The channel's /live address points at the current broadcast while one is
// running, or at the next scheduled one while it is waiting to start.
async function fetchLivePage(): Promise<{
  id: string | null;
  isLiveNow: boolean;
  title: string | null;
}> {
  const response = await fetch(
    `https://www.youtube.com/channel/${CHANNEL_ID}/live`,
    { headers: BROWSER_HEADERS, next: { revalidate: 60 } }
  );
  if (!response.ok) return { id: null, isLiveNow: false, title: null };

  const html = await response.text();
  const id = html.match(
    new RegExp(
      `<link rel="canonical" href="https://www\\.youtube\\.com/watch\\?v=(${VIDEO_ID})"`
    )
  );
  const title = html.match(/<meta name="title" content="([^"]*)"/);

  return {
    id: id?.[1] ?? null,
    isLiveNow: /"isLiveNow":true/.test(html),
    title: title ? decodeEntities(title[1]) : null,
  };
}

export async function getLiveData(): Promise<LiveData> {
  const [streamsResult, liveResult] = await Promise.allSettled([
    fetchStreams(),
    fetchLivePage(),
  ]);
  const allStreams =
    streamsResult.status === "fulfilled" ? streamsResult.value : [];
  const livePage =
    liveResult.status === "fulfilled"
      ? liveResult.value
      : { id: null, isLiveNow: false, title: null };

  // The video on the /live address is either on air or still waiting to
  // start, so it is never listed as a finished message.
  const streams = allStreams.filter((stream) => stream.id !== livePage.id);

  const live =
    livePage.id && livePage.isLiveNow
      ? {
          id: livePage.id,
          title:
            livePage.title ??
            allStreams.find((stream) => stream.id === livePage.id)?.title ??
            "Living Hope live service",
        }
      : null;

  return { live, streams: streams.slice(0, PREVIOUS_MESSAGE_COUNT + 1) };
}
