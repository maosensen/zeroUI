import { serialize } from "./schema";

/**
 * 一页的 JSON-LD。放在服务端组件里(page 或 layout),原生 `<script>`,不用 next/script ——
 * 它是数据,不是要执行的代码(Next.js 文档 guides/json-ld)。
 */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: serialize() 已把 < 转义,内容是我们自己的数据
      dangerouslySetInnerHTML={{ __html: serialize(data) }}
    />
  );
}
