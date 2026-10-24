/**
 * IndexNow(yPulse docs/seo-geo.md §8):发版部署成功后,把站点的地址推给 api.indexnow.org,
 * Bing、Yandex、Naver、Seznam 共用这一个入口(Google 不参与)。
 *
 * key 不是密钥:它要以 `/<key>.txt` 公开放在站点根目录,证明这个站归提交者所有。
 * 不 import 别的文件,node 脚本直接读。
 */

export const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

/** 一次最多 10 000 个地址(协议上限)。 */
const BATCH = 10_000;

export async function submitIndexNow({
  siteUrl,
  key,
  urls,
  endpoint = INDEXNOW_ENDPOINT,
}: {
  siteUrl: string;
  key: string;
  urls: readonly string[];
  endpoint?: string;
}) {
  const host = new URL(siteUrl).host;
  const results: { count: number; status: number }[] = [];
  for (let i = 0; i < urls.length; i += BATCH) {
    const urlList = urls.slice(i, i + BATCH);
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "content-type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host,
        key,
        keyLocation: `${siteUrl}/${key}.txt`,
        urlList,
      }),
    });
    results.push({ count: urlList.length, status: res.status });
  }
  return results;
}
