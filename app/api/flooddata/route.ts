import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { address } = await req.json();
  const apiKey = process.env.NATIONAL_FLOOD_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }

  const params = new URLSearchParams({
    searchtype: "addressparcel",
    address,
    elevation: "True",
    property: "True",
  });

  const response = await fetch(`https://api.nationalflooddata.com/v3/data?${params.toString()}`,
    {
      headers: { "x-api-key": apiKey },
    }
  );

  if (!response.ok) {
    return NextResponse.json({ error: "Failed to fetch flood data" }, { status: 500 });
  }

  const data = await response.json();
  return NextResponse.json(data);
} 