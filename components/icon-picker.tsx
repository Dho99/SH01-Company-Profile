"use client";

import { useState, useMemo, useCallback } from "react";
import { iconNames } from "lucide-react/dynamic";
import { CmsIcon } from "@/components/cms-icon";
import { normalizeIconName } from "@/lib/icon";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const PAGE_SIZE = 60;

function getAllIconNames(): string[] {
  try {
    return (iconNames as unknown as string[]) ?? [];
  } catch {
    return [];
  }
}

const ALL_ICONS = getAllIconNames();

type IconPickerProps = {
  value?: string | null;
  onChange?: (name: string) => void;
};

export function IconPicker({ value = null, onChange }: IconPickerProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let list = ALL_ICONS;
    const q = search.toLowerCase().trim();
    if (q) {
      list = list.filter(
        (name) =>
          name.includes(q) ||
          name.replace(/-/g, "").includes(q.replace(/-/g, "")),
      );
    }
    return [...list].sort();
  }, [search]);

  const displayIcons = useMemo(
    () => filtered.slice(0, page * PAGE_SIZE),
    [filtered, page],
  );

  const hasMore = displayIcons.length < filtered.length;

  const selected = normalizeIconName(value);

  const handleSelect = useCallback(
    (name: string) => {
      onChange?.(name);
    },
    [onChange],
  );

  const handleClear = useCallback(() => {
    onChange?.("");
  }, [onChange]);

  if (ALL_ICONS.length === 0) {
    return (
      <div className="space-y-3">
        <div className="h-9 animate-pulse rounded-md bg-slate-100" />
        <div className="grid grid-cols-6 gap-2 sm:grid-cols-8 md:grid-cols-10">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square animate-pulse rounded-lg bg-slate-100"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
        <Input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Search icons..."
          className="pl-8"
          aria-label="Search icons"
        />
      </div>

      {selected ? (
        <div className="flex items-center gap-3 rounded-md border bg-slate-50 p-2">
          <CmsIcon name={selected} size={20} className="text-slate-700" />
          <span className="text-sm font-medium text-slate-700">{selected}</span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="ml-auto size-6 text-slate-400 hover:text-red-500"
            onClick={handleClear}
            aria-label="Clear icon selection"
          >
            <X className="size-4" />
          </Button>
        </div>
      ) : null}

      {filtered.length === 0 ? (
        <div className="flex h-24 items-center justify-center rounded-md border border-dashed text-sm text-slate-400">
          {search ? "No icons match your search" : "Type to search icons"}
        </div>
      ) : (
        <>
          <div
            className="grid max-h-80 gap-2 overflow-y-auto pr-1"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(48px, 1fr))",
            }}
            role="listbox"
            aria-label="Available icons"
          >
            {displayIcons.map((name) => {
              const isSelected = selected === name;
              return (
                <button
                  key={name}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(name)}
                  className={`group relative flex aspect-square items-center justify-center rounded-lg border text-slate-600 transition-all hover:border-brand hover:text-brand focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:outline-none ${
                    isSelected
                      ? "border-brand bg-brand/5 text-brand ring-1 ring-brand"
                      : "border-slate-200 bg-white"
                  }`}
                  title={name}
                >
                  <CmsIcon name={name} size={18} />
                  <span className="sr-only">{name}</span>
                </button>
              );
            })}
          </div>

          {hasMore && (
            <div className="flex justify-center pt-1">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setPage((p) => p + 1)}
                className="text-xs text-slate-500"
              >
                Show more ({filtered.length - displayIcons.length} remaining)
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
