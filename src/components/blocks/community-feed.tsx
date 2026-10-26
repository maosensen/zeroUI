"use client";

import { type ComponentType, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/zero/avatar";
import { Button } from "@/components/zero/button";
import { CellIcon } from "@/components/zero/icons/cell";
import { ChipIcon } from "@/components/zero/icons/chip";
import { CrateIcon } from "@/components/zero/icons/crate";
import { EyeIcon } from "@/components/zero/icons/eye";
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
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/zero/sheet";
import { ToggleGroup, ToggleGroupItem } from "@/components/zero/toggle-group";

/*
 * A community board: posts of every height packed into columns, a filter by kind, and a post
 * opening in a sheet with its body, its replies, and, for a commission, a way to take it. The
 * covers are posters drawn from zzzUI's own pieces (a token colour, an item icon, a leaning
 * word); put your pictures in their place. The posts are made up; feed your own.
 */

type Kind = "Question" | "Commission" | "Notice" | "Post";

type Post = {
  id: number;
  kind: Kind;
  title: string;
  excerpt: string;
  body: string;
  author: string;
  views: number;
  replies: [string, string][];
  poster: {
    tone: string;
    ink: string;
    icon: ComponentType<{ className?: string }>;
    word: string;
    tall?: boolean;
  };
};

const ink = "var(--color-zero-ink)";

const posts: Post[] = [
  {
    id: 1,
    kind: "Notice",
    title: "The north gate shuts at two tonight",
    excerpt: "Anything not through by then waits until morning.",
    body: "Works on the gate run from two until six. Plan your last runs for the river road, or wait it out at the market.",
    author: "Dispatch",
    views: 199861,
    replies: [["Rook", "Again? That's three nights this week."]],
    poster: {
      tone: "var(--color-zero-accent)",
      ink,
      icon: FlareIcon,
      word: "Gate shuts",
      tall: true,
    },
  },
  {
    id: 2,
    kind: "Question",
    title: "Has anyone seen this crate?",
    excerpt: "Grey, sealed, one corner dented. Last seen at the rail yards.",
    body: "It fell off the back of my rig somewhere between the yards and the canal. The seal is intact as far as I know. Reward if it turns up unopened.",
    author: "Juniper",
    views: 5150,
    replies: [
      ["Sable-9", "Saw a dented one by gate 4 around midnight."],
      ["Juniper", "On my way. Thank you!"],
    ],
    poster: {
      tone: "var(--color-zero-rarity-legendary)",
      ink,
      icon: CrateIcon,
      word: "Lost",
      tall: true,
    },
  },
  {
    id: 3,
    kind: "Commission",
    title: "One box, two streets, no questions",
    excerpt: "Pays well. Leave before midnight.",
    body: "Pick up from the old market, drop at the canal docks. The box stays shut. 1,800 cr on delivery.",
    author: "B-Side",
    views: 3301,
    replies: [],
    poster: {
      tone: "var(--color-zero-rarity-rare)",
      ink,
      icon: KeyIcon,
      word: "Two streets",
    },
  },
  {
    id: 4,
    kind: "Post",
    title: "Every power cell vendor after midnight, ranked",
    excerpt: "Thirty-one stalls, eleven nights, one map.",
    body: "I went to all of them so you don't have to. The best three are all on the east side of the canal; the worst is right outside the yards.",
    author: "NoodleCartographer",
    views: 27014,
    replies: [["Tallow", "You forgot the one under the bridge."]],
    poster: {
      tone: "var(--color-zero-raised)",
      ink: "var(--color-zero-rarity-uncommon)",
      icon: CellIcon,
      word: "Ranked",
    },
  },
  {
    id: 5,
    kind: "Question",
    title: "Which route chip do you trust?",
    excerpt: "Mine sent me through a patrol twice.",
    body: "Bought a chip at the market and it walked me straight into two patrols. Is there a seller people trust?",
    author: "Quill",
    views: 1778,
    replies: [],
    poster: {
      tone: "var(--color-zero-rarity-epic)",
      ink,
      icon: ChipIcon,
      word: "Trust?",
    },
  },
  {
    id: 6,
    kind: "Post",
    title: "Kit swap at the old market, Thursday",
    excerpt: "Bring two, take two. No spares, no trades.",
    body: "Thursday from ten. Bring two repair kits you don't need, take two you do.",
    author: "Rook",
    views: 880,
    replies: [],
    poster: {
      tone: "var(--color-zero-rarity-uncommon)",
      ink,
      icon: KitIcon,
      word: "Swap",
    },
  },
];

function Poster({ poster }: { poster: Post["poster"] }) {
  const Icon = poster.icon;
  return (
    <div
      aria-hidden
      className={`grid grid-rows-[auto_1fr] justify-items-center gap-2 overflow-hidden bg-(image:--zero-hatch) px-4 pt-10 pb-7 ${poster.tall ? "aspect-[4/5]" : "aspect-[16/10]"}`}
      style={{ backgroundColor: poster.tone, color: poster.ink }}
    >
      <span className="justify-self-stretch origin-left rotate-(--zero-tilt) font-black font-zero text-zero-xl uppercase italic leading-none">
        {poster.word}
      </span>
      <Icon className="size-16 self-center opacity-90" />
    </div>
  );
}

const initials = (name: string) => name.slice(0, 2).toUpperCase();

export function CommunityFeed() {
  const [filter, setFilter] = useState<string[]>(["all"]);
  // the post stays after closing, so the sheet keeps its content while it leaves
  const [open, setOpen] = useState<Post | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [taken, setTaken] = useState<number[]>([]);
  const shown = posts.filter(
    (post) => filter[0] === "all" || post.kind === filter[0],
  );

  return (
    <section
      aria-labelledby="board-title"
      className="grid w-full max-w-6xl gap-6"
    >
      <h2 id="board-title" className="sr-only">
        Board
      </h2>
      <ToggleGroup
        value={filter}
        onValueChange={(value) => value.length && setFilter(value)}
        size="sm"
        variant="secondary"
        aria-label="Show"
      >
        <ToggleGroupItem value="all">All</ToggleGroupItem>
        <ToggleGroupItem value="Question">Questions</ToggleGroupItem>
        <ToggleGroupItem value="Commission">Commissions</ToggleGroupItem>
        <ToggleGroupItem value="Notice">Notices</ToggleGroupItem>
      </ToggleGroup>

      <Masonry columnWidth="15rem">
        {shown.map((post) => (
          <PostCard key={post.id}>
            <PostCardCover views={post.views}>
              <Poster poster={post.poster} />
            </PostCardCover>
            <PostCardAuthor
              avatar={
                <Avatar>
                  <AvatarFallback>{initials(post.author)}</AvatarFallback>
                </Avatar>
              }
            >
              {post.author}
            </PostCardAuthor>
            <PostCardTitle kind={post.kind}>
              <button
                type="button"
                onClick={() => {
                  setOpen(post);
                  setIsOpen(true);
                }}
              >
                {post.title}
              </button>
            </PostCardTitle>
            <PostCardExcerpt>{post.excerpt}</PostCardExcerpt>
          </PostCard>
        ))}
      </Masonry>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent>
          {open ? (
            <>
              <SheetHeader>
                <SheetTitle>{open.title}</SheetTitle>
                <SheetDescription className="flex items-center gap-3">
                  <span>
                    {open.kind} · {open.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <EyeIcon className="size-4" />
                    {open.views.toLocaleString("en-US")}
                  </span>
                </SheetDescription>
              </SheetHeader>
              <SheetBody>
                <Poster poster={open.poster} />
                <p className="text-zero-text-2">{open.body}</p>
                <div className="grid gap-3">
                  <h3 className="font-black font-zero text-zero-sm uppercase italic tracking-[0.06em]">
                    Replies
                  </h3>
                  {open.replies.length === 0 ? (
                    <p className="text-zero-sm text-zero-text-3">Nobody yet.</p>
                  ) : (
                    <ul className="grid gap-3">
                      {open.replies.map(([who, said]) => (
                        <li key={said} className="flex items-start gap-3">
                          <Avatar size="sm">
                            <AvatarFallback>{initials(who)}</AvatarFallback>
                          </Avatar>
                          <span className="grid">
                            <span className="font-bold font-zero text-zero-sm italic">
                              {who}
                            </span>
                            <span className="text-zero-sm text-zero-text-2">
                              {said}
                            </span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </SheetBody>
              {open.kind === "Commission" ? (
                <SheetFooter>
                  <Button
                    disabled={taken.includes(open.id)}
                    onClick={() => setTaken((list) => [...list, open.id])}
                  >
                    {taken.includes(open.id)
                      ? "Commission taken"
                      : "Take the commission"}
                  </Button>
                </SheetFooter>
              ) : null}
            </>
          ) : null}
        </SheetContent>
      </Sheet>
    </section>
  );
}
