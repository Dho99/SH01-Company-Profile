"use client";

import { useState } from "react";
import { CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";

import { Reveal } from "@/components/reveal";

type AboutPoint = {
  id: string;
  text: string;
};

const VISIBLE_POINT_COUNT = 5;
const ease = [0.22, 1, 0.36, 1] as const;

export function AboutPointsList({ points }: { points: AboutPoint[] }) {
  const [expanded, setExpanded] = useState(false);
  const visiblePoints = expanded
    ? points
    : points.slice(0, VISIBLE_POINT_COUNT);
  const hasMorePoints = points.length > VISIBLE_POINT_COUNT;

  return (
    <div className="mt-6">
      <ul id="about-points" className="space-y-3">
        {visiblePoints.map((point, index) => (
          <Reveal
            key={point.id}
            as="li"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.45,
              delay: index * 0.08 + 0.1,
              ease,
            }}
            className="flex items-center gap-3 text-sm"
          >
            <span className="inline-flex shrink-0">
              <CheckCircle2 className="size-5 text-brand" />
            </span>
            <span className="text-slate-700">{point.text}</span>
          </Reveal>
        ))}
      </ul>

      {hasMorePoints && (
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls="about-points"
          onClick={() => setExpanded((current) => !current)}
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand transition-colors hover:text-brand/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
        >
          {expanded ? "Tampilkan lebih sedikit" : "Tampilkan lebih banyak"}
          {expanded ? (
            <ChevronUp className="size-4" aria-hidden="true" />
          ) : (
            <ChevronDown className="size-4" aria-hidden="true" />
          )}
        </button>
      )}
    </div>
  );
}
