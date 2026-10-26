import { enter, type LangProps, pick } from "@/lib/i18n/server";
import { JsonLd } from "@/lib/seo/json-ld";
import { docGraph } from "@/seo/graph";
import { metadataFor } from "@/seo/site";
import { Demo } from "../_components/demo";
import { DocHeader, DocSection, PropsTable, Prose } from "../_components/doc";
import { Install } from "../_components/install";
import TableJobs from "../_demos/table-jobs";

export const generateMetadata = metadataFor("/docs/table");

export default async function TablePage({ params }: LangProps) {
  await enter(params);
  return (
    <>
      <JsonLd data={docGraph("/docs/table")} />
      <DocHeader
        title="Table"
        lead={pick({
          en: "Rows of data in a square-cornered box: column heads on a black bar in small leaning capitals, cells in the text face, quiet lines between rows.",
          zh: "置于直角方框中的数据行：列标题位于黑色横条上，用倾斜的小号大写字母；单元格使用正文字体；行与行之间以暗色细线分隔。",
        })}
      />
      <DocSection id="install">
        <Install item="table" />
      </DocSection>
      <DocSection id="examples">
        <Demo
          file="table-jobs"
          title={pick({ en: "Jobs with a total", zh: "委托列表与合计" })}
        >
          <TableJobs />
        </Demo>
      </DocSection>
      <DocSection id="behaviour">
        <Prose>
          {pick({
            en: (
              <>
                <p>
                  A row lights under the pointer. Mark a selected row with{" "}
                  <code>data-state="selected"</code> or{" "}
                  <code>aria-selected</code>: it keeps the light and carries the
                  accent on its start edge.
                </p>
                <p>
                  The box scrolls sideways when the table is wider than it. Give
                  figures <code>text-right tabular-nums</code> so they line up.
                  It is a plain HTML table: sorting and selection are yours to
                  wire.
                </p>
              </>
            ),
            zh: (
              <>
                <p>
                  指针悬停的行会高亮。以 <code>data-state="selected"</code> 或{" "}
                  <code>aria-selected</code>{" "}
                  标记选中行：该行保持高亮，并在起始端显示强调色。
                </p>
                <p>
                  表格宽于外框时，外框可横向滚动。数字列请加上{" "}
                  <code>text-right tabular-nums</code>，使数字对齐。组件即普通的
                  HTML 表格，排序与选择需自行实现。
                </p>
              </>
            ),
          })}
        </Prose>
      </DocSection>
      <DocSection id="props">
        <PropsTable
          part="Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption"
          rows={[]}
        />
      </DocSection>
    </>
  );
}
