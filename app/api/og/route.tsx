import { client } from "@/sanity/lib/client";
import { urlFor } from "@/components/sanity-image/url"
import { OgImageQuery, SiteQuery } from "@/sanity/queries/documents/site-query"
import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";

export const runtime = "edge";

async function loadGoogleFont(font: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/
  );

  if (resource) {
    const response = await fetch(resource[1]);
    if (response.status == 200) {
      return await response.arrayBuffer();
    }
  }

  throw new Error("failed to load font data");
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    notFound();
  }

  const defaultData = await client.fetch(SiteQuery);
  const data = await client.fetch(OgImageQuery, { id });

  if (!data) {
    notFound();
  }


  const iconUrl = data.seo.metaIcon || defaultData[0].seo.metaIcon;
  const text = data.seo.metaTitle || data.title || "";

  const iconHeight = iconUrl?.asset?.metadata?.dimensions?.height;
  const iconWidth = iconUrl?.asset?.metadata?.dimensions?.width;

  const maxWidth = 320;
  const maxHeight = 80;

  const width = iconWidth > maxWidth ? maxWidth : iconWidth;
  const height = iconHeight > maxHeight ? maxHeight : iconHeight;

  return new ImageResponse(
    (
      <div
        tw="relative flex flex-col justify-between w-full h-full py-12"
        style={{ backgroundColor: "#eeeeee" }}
      >
        {/* Logo top-left */}
        <div tw="flex align-self-start pl-20">
          <img
            src={urlFor(iconUrl?.asset?.url).width(width).url()}
            alt="Logo"
            width={width}
            height={height}
            style={{ objectFit: "contain" }}
          />
        </div>

        {/* Title bottom-right */}
        <div tw="flex align-self-end justify-end pr-20">
          <h1 tw="text-9xl leading-tight tracking-tight">{text}</h1>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Inknut Antiqua",
          data: await loadGoogleFont("Inknut Antiqua", text),
          weight: 400,
          style: "normal",
        },
      ],
    }
  );
}