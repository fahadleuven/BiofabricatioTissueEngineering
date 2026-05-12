import fs from "fs";
import axios from "axios";
import * as cheerio from "cheerio";

const LIRIAS_URL = "https://lirias.kuleuven.be/cv?Username=u0072541";
const CACHE_FILE = "lirias.html";

/**
 * Fetch HTML from Lirias or use cached version
 */
export async function fetchHTML(useCache = true) {
  if (useCache && fs.existsSync(CACHE_FILE)) {
    return fs.readFileSync(CACHE_FILE, "utf-8");
  } else {
    const { data } = await axios.get(LIRIAS_URL);
    fs.writeFileSync(CACHE_FILE, data, "utf-8");
    return data;
  }
}

/**
 * Parse HTML and extract publications
 */
export function parseHTML(html) {
  const $ = cheerio.load(html);
  const publications = [];

  $("tr").each((_, tr) => {
    const td = $(tr).find("td");
    if (!td.length) return;

    const spans = td.find("span");
    if (spans.length < 2) return;

    const authorTitle = $(spans[0]).text().trim();
    const journal = $(spans[1]).text().trim();
    const volume = spans.length > 2 ? $(spans[2]).text().trim() : "";

    // DOI
    const doiEl = td.find('a[href*="doi.org"]').first();
    const doiLink = doiEl.length ? doiEl.attr("href") : "";

    // Repository
    const repoEl = td.find('a img[alt*="repository"]').parent();
    const repositoryLink = repoEl.length ? repoEl.attr("href") : "";

    const match = authorTitle.match(/^(.+?)\s\((\d{4})\)\.\s(.+)$/);
    if (!match) return;

    const authors = match[1].trim();
    const year = match[2];
    const title = match[3].trim();

    if (!publications.some(p => p.title === title && p.authors === authors)) {
      publications.push({
        authors,
        year,
        title,
        journal,
        volume,
        doiLink,
        repositoryLink
      });
    }
  });

  return publications;
}



/**
 * Fetch publications from Lirias
 */
export async function fetchPublications(useCache = true) {
  const html = await fetchHTML(useCache);
  return parseHTML(html);
}
