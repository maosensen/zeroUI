"use client";

import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/zero/pagination";

const last = 12;

export default function PaginationBasic() {
  const [page, setPage] = useState(3);
  const go = (to: number) => (event: React.MouseEvent) => {
    event.preventDefault();
    setPage(Math.min(last, Math.max(1, to)));
  };
  const shown = [1, page - 1, page, page + 1, last].filter(
    (n, index, all) => n >= 1 && n <= last && all.indexOf(n) === index,
  );
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" onClick={go(page - 1)} />
        </PaginationItem>
        {shown.map((n, index) => (
          <PaginationItem key={n} className="flex items-center gap-1">
            {index > 0 && n - shown[index - 1] > 1 ? (
              <PaginationEllipsis />
            ) : null}
            <PaginationLink href="#" isActive={n === page} onClick={go(n)}>
              {n}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext href="#" onClick={go(page + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
