"use client";

import { type ComponentType, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/zero/avatar";
import { CellIcon } from "@/components/zero/icons/cell";
import { CrateIcon } from "@/components/zero/icons/crate";
import { FlareIcon } from "@/components/zero/icons/flare";
import { KeyIcon } from "@/components/zero/icons/key";
import { KitIcon } from "@/components/zero/icons/kit";
import { Masonry } from "@/components/zero/masonry";
import {
  PostCard,
  PostCardAuthor,
  PostCardCover,
  PostCardExcerpt,
  PostCardTitle,
} from "@/components/zero/post-card";

/** A poster for a cover: a ground, a big leaning headline, an item icon. */
function Poster({
  tone,
  ink,
  icon: Icon,
  line,
  tall,
}: {
  tone: string;
  ink: string;
  icon: ComponentType<{ className?: string }>;
  line: string;
  tall?: boolean;
}) {
  return (
    <div
      className={`grid grid-rows-[auto_1fr] justify-items-center gap-2 overflow-hidden bg-(image:--zero-hatch) px-4 pt-10 pb-7 ${tall ? "aspect-[4/5]" : "aspect-[16/10]"}`}
      style={{ backgroundColor: tone, color: ink }}
    >
      <span className="justify-self-stretch origin-left rotate-(--zero-tilt) font-black font-zero text-zero-xl uppercase italic leading-none">
        {line}
      </span>
      <Icon className="size-16 self-center opacity-90" />
    </div>
  );
}

const posts = [
  {
    id: 1,
    kind: "Question",
    title: "Has anyone seen this crate?",
    excerpt: "Grey, sealed, one corner dented. Last seen at the rail yards.",
    author: "Juniper",
    views: 5150,
    poster: {
      tone: "var(--color-zero-rarity-legendary)",
      ink: "var(--color-zero-ink)",
      icon: CrateIcon,
      line: "Lost",
      tall: true,
    },
  },
  {
    id: 2,
    kind: "Commission",
    title: "Need a courier: one box, two streets, no questions",
    excerpt: "Pays well. Leave before midnight.",
    author: "B-Side",
    views: 3301,
    poster: {
      tone: "var(--color-zero-rarity-rare)",
      ink: "var(--color-zero-ink)",
      icon: KeyIcon,
      line: "Two streets",
    },
  },
  {
    id: 3,
    kind: "Notice",
    title: "The north gate shuts at two tonight",
    excerpt: "Anything not through by then waits until morning.",
    author: "Dispatch",
    views: 199861,
    poster: {
      tone: "var(--color-zero-accent)",
      ink: "var(--color-zero-ink)",
      icon: FlareIcon,
      line: "Gate shuts",
      tall: true,
    },
  },
  {
    id: 4,
    kind: "Post",
    title: "Every power cell vendor after midnight, ranked",
    excerpt: "Thirty-one stalls, eleven nights, one map.",
    author: "NoodleCartographer",
    views: 27014,
    poster: {
      tone: "var(--color-zero-raised)",
      ink: "var(--color-zero-rarity-uncommon)",
      icon: CellIcon,
      line: "Ranked",
    },
  },
  {
    id: 5,
    kind: "Post",
    title: "Kit swap at the old market, Thursday",
    excerpt: "Bring two, take two. No spares, no trades.",
    author: "Rook",
    views: 880,
    poster: {
      tone: "var(--color-zero-rarity-epic)",
      ink: "var(--color-zero-ink)",
      icon: KitIcon,
      line: "Swap",
    },
  },
];

export default function PostCardFeed() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="grid w-full gap-4">
      <Masonry columnWidth="15rem">
        {posts.map((post) => (
          <PostCard key={post.id}>
            <PostCardCover views={post.views}>
              <Poster {...post.poster} />
            </PostCardCover>
            <PostCardAuthor
              avatar={
                <Avatar>
                  <AvatarFallback>
                    {post.author.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              }
            >
              {post.author}
            </PostCardAuthor>
            <PostCardTitle kind={post.kind}>
              <button type="button" onClick={() => setOpen(post.title)}>
                {post.title}
              </button>
            </PostCardTitle>
            <PostCardExcerpt>{post.excerpt}</PostCardExcerpt>
          </PostCard>
        ))}
      </Masonry>
      <p className="font-medium font-zero-text text-zero-sm text-zero-text-2">
        {open ? `Opened: ${open}` : "Pick a post."}
      </p>
    </div>
  );
}
