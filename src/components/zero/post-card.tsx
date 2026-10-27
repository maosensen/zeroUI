import type { ComponentProps, ReactNode } from "react";
import { EyeIcon } from "@/components/zero/icons/eye";
import { cn } from "@/lib/zero/cn";

/*
 * A post in a community feed, the way a game's board shows one: a picture running edge to edge
 * with how many have seen it in its corner, the author's avatar sitting on the picture's lower
 * edge beside their name, then a leaning title (with its kind, "Question", "Commission", in a
 * small slab before it) and one line of the post. Its height is the picture's plus the text's, so
 * it is a square-cornered box in a thick ink border, like Card. Put a link or a button in the
 * title: it stretches over the whole card, which lifts and frames in the accent when pointed at
 * and in yellow when focused.
 *
 *   <PostCard>
 *     <PostCardCover views={9120}><img … /></PostCardCover>
 *     <PostCardAuthor avatar={<Avatar>…</Avatar>}>flyingsnail</PostCardAuthor>
 *     <PostCardTitle kind="Question"><a href="/post/12">Has anyone seen this cat?</a></PostCardTitle>
 *     <PostCardExcerpt>Orange, one ear notched…</PostCardExcerpt>
 *   </PostCard>
 */

function PostCard({ className, ...props }: ComponentProps<"article">) {
  return (
    <article
      data-slot="post-card"
      className={cn(
        "group/post relative flex flex-col overflow-hidden border-(length:--zero-stroke-thick) border-zero-ink bg-zero-surface text-zero-text",
        "outline-(length:--zero-stroke-thin) outline-transparent outline-offset-2",
        "transition-[translate,outline-color] duration-(--zero-dur-fast) ease-(--zero-ease-out)",
        "has-[a,button]:hover:-translate-y-1 has-[a,button]:hover:outline-solid has-[a,button]:hover:outline-zero-accent motion-reduce:hover:translate-y-0",
        "has-focus-visible:outline-solid has-focus-visible:outline-zero-focus",
        className,
      )}
      {...props}
    />
  );
}

/** The picture, edge to edge, with the view count in its corner. */
function PostCardCover({
  className,
  views,
  viewsLabel = (views) => `Seen ${views} times`,
  children,
  ...props
}: ComponentProps<"div"> & {
  views?: number;
  /** What screen readers hear for the count, given it written out ("1,204"). */
  viewsLabel?: (views: string) => string;
}) {
  return (
    <div
      data-slot="post-card-cover"
      className={cn(
        "relative overflow-hidden bg-zero-void [&>img]:block [&>img]:w-full [&>svg]:block [&>svg]:w-full",
        className,
      )}
      {...props}
    >
      {children}
      {views !== undefined ? (
        <span className="absolute top-2.5 left-3 flex items-center gap-1 font-bold font-zero-text text-zero-sm tabular-nums [text-shadow:0_1px_0_var(--color-zero-ink),0_0_4px_var(--color-zero-ink)]">
          <EyeIcon className="size-4" />
          <span className="sr-only">
            {viewsLabel(views.toLocaleString("en-US"))}
          </span>
          <span aria-hidden>{views.toLocaleString("en-US")}</span>
        </span>
      ) : null}
    </div>
  );
}

/** Who wrote it: the avatar sitting on the picture's lower edge, the name beside it. */
function PostCardAuthor({
  className,
  avatar,
  children,
  ...props
}: ComponentProps<"div"> & { avatar?: ReactNode }) {
  return (
    <div
      data-slot="post-card-author"
      className={cn(
        "flex items-end gap-2.5 border-zero-line border-b-(length:--zero-stroke-thin) px-4 pb-2",
        avatar && "-mt-5",
        className,
      )}
      {...props}
    >
      {avatar ? <span className="relative shrink-0">{avatar}</span> : null}
      <span className="truncate pb-0.5 font-bold font-zero-text text-zero-sm text-zero-text-3">
        {children}
      </span>
    </div>
  );
}

/** The title. A link or button inside it is stretched over the whole card. */
function PostCardTitle({
  className,
  kind,
  children,
  ...props
}: ComponentProps<"h3"> & { kind?: string }) {
  return (
    <h3
      data-slot="post-card-title"
      className={cn(
        "px-4 pt-3 font-black font-zero text-zero-lg italic leading-tight",
        "[&_a]:outline-none [&_a]:after:absolute [&_a]:after:inset-0 [&_button]:text-start [&_button]:outline-none [&_button]:after:absolute [&_button]:after:inset-0",
        className,
      )}
      {...props}
    >
      {kind ? (
        <span className="slab slab-cut-both me-2 inline-flex translate-y-[-0.1em] items-center align-middle font-black text-zero-xs uppercase tracking-[0.06em] [--slab-fill:var(--color-zero-raised)] [--slab-h:1.4rem] [--slab-o:0px] [--slab-px:0.5rem] [--slab-ink:var(--color-zero-text-2)]">
          {kind}
        </span>
      ) : null}
      {children}
    </h3>
  );
}

/** One line of the post, cut off with an ellipsis. */
function PostCardExcerpt({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      data-slot="post-card-excerpt"
      className={cn(
        "truncate px-4 pt-1.5 pb-4 font-semibold font-zero-text text-zero-sm text-zero-text-2",
        className,
      )}
      {...props}
    />
  );
}

export {
  PostCard,
  PostCardAuthor,
  PostCardCover,
  PostCardExcerpt,
  PostCardTitle,
};
