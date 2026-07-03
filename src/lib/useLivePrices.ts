"use client";

import { useEffect, useState } from "react";
import { parseLivePricesCsv, type LivePrices } from "./livePrices";

const SHEET_CSV_URL = process.env.NEXT_PUBLIC_PRICE_SHEET_CSV_URL;

/** Fetches today's prices from the published Google Sheet. Falls back silently to {} (hardcoded prices) on any failure. */
export function useLivePrices(): LivePrices {
  const [prices, setPrices] = useState<LivePrices>({});

  useEffect(() => {
    if (!SHEET_CSV_URL) return;
    let cancelled = false;

    fetch(SHEET_CSV_URL, { cache: "no-store" })
      .then((res) => (res.ok ? res.text() : Promise.reject(res.statusText)))
      .then((text) => {
        if (!cancelled) setPrices(parseLivePricesCsv(text));
      })
      .catch(() => {
        /* sheet unreachable — site keeps working with hardcoded prices */
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return prices;
}
