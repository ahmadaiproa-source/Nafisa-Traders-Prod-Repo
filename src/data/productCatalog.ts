import productsData from './allProducts.json';

export interface ProductItem {
  id: number;
  code: string;
  name: string;
  rawName: string;
  company: string;
  unit: string;
  categoryTag?: string;
  isMedicine?: boolean;
  searchIndex?: string;
}

// 2,000+ Complete Products Catalog from Nafisa Traders
export const ALL_PRODUCTS: ProductItem[] = productsData as ProductItem[];

// Helper to extract search token groups with punctuation removal, stemming, and unit variants
export function extractQueryTokenGroups(query: string): string[][] {
  const raw = query.toLowerCase().trim();
  if (!raw) return [];

  // Split query into words/tokens
  const rawWords = raw.split(/[\s,+/()#*]+/).filter(Boolean);
  
  return rawWords.map((word) => {
    const variants = new Set<string>([word]);
    
    // Strip dots e.g. i.v. -> iv, b.t. -> bt, b.p. -> bp
    const noDots = word.replace(/\./g, '');
    if (noDots && noDots !== word) {
      variants.add(noDots);
    }

    // If word contains hyphen e.g. accu-chek -> accu, chek, accuchek
    if (word.includes('-')) {
      word.split('-').filter(Boolean).forEach((part) => variants.add(part));
      variants.add(word.replace(/-/g, ''));
    }

    // Dosage unit split: e.g. '500mg' -> '500' and 'mg', '5cc' -> '5' and 'cc'
    const unitMatch = word.match(/^(\d+)(mg|ml|cc|g|iu|l|mcg|gm|kg)$/);
    if (unitMatch) {
      variants.add(unitMatch[1]);
      variants.add(unitMatch[2]);
      variants.add(unitMatch[1] + unitMatch[2]);
    }

    // Stemming (plurals to singulars)
    if (word.endsWith('es') && word.length > 4) {
      variants.add(word.slice(0, -2));
    } else if (word.endsWith('s') && word.length > 3 && !word.endsWith('ss')) {
      variants.add(word.slice(0, -1));
    }

    return Array.from(variants);
  });
}

// Calculate relevance score for instant sorting
export function getProductRelevanceScore(item: ProductItem, term: string): number {
  if (!term) return 0;
  const lowerTerm = term.toLowerCase().trim();
  const name = item.name.toLowerCase();
  const rawName = (item.rawName || '').toLowerCase();
  const code = (item.code || '').toLowerCase();
  const company = (item.company || '').toLowerCase();

  let score = 0;

  // 1. Exact full name match
  if (name === lowerTerm || rawName === lowerTerm) {
    return 300;
  }

  // 2. Name starts with full query
  if (name.startsWith(lowerTerm)) {
    score += 160;
  } else if (name.includes(' ' + lowerTerm) || name.includes('(' + lowerTerm)) {
    // 3. Word boundary start (e.g. "PANADOL" in name)
    score += 140;
  } else if (name.includes(lowerTerm)) {
    score += 110;
  }

  // 4. Exact code match
  if (code === lowerTerm) {
    score += 150;
  } else if (code.startsWith(lowerTerm)) {
    score += 100;
  } else if (code.includes(lowerTerm)) {
    score += 80;
  }

  // 5. Company match
  if (company.startsWith(lowerTerm)) {
    score += 70;
  } else if (company.includes(lowerTerm)) {
    score += 50;
  }

  // 6. Match query words in product name
  const words = lowerTerm.split(/[\s,+/()#*]+/).filter((w) => w.length > 1);
  let wordsInName = 0;
  for (const w of words) {
    if (name.includes(w)) {
      wordsInName++;
      score += 20;
    }
  }
  if (words.length > 1 && wordsInName === words.length) {
    score += 40;
  }

  // 7. Base score from search index
  const index = item.searchIndex || '';
  if (index.includes(lowerTerm)) {
    score += 15;
  }

  return score;
}

// Fast search function across all products supporting multi-token groups, generic names, item codes, and relevance ranking
export function searchCatalog(query: string): ProductItem[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return ALL_PRODUCTS;

  const groups = extractQueryTokenGroups(trimmed);
  if (groups.length === 0) return ALL_PRODUCTS;

  // 1. Strict match: every token group must have at least one variant matching
  const strictMatched = ALL_PRODUCTS.filter((product) => {
    const index = product.searchIndex || `${product.name} ${product.code} ${product.company} ${product.unit} ${product.categoryTag || ''}`.toLowerCase();
    const matchesAll = groups.every((variants) => variants.some((v) => index.includes(v)));
    const matchesId = product.id.toString() === trimmed;
    const matchesCode = (product.code || '').toLowerCase() === trimmed;
    return matchesAll || matchesId || matchesCode;
  });

  if (strictMatched.length > 0) {
    return strictMatched.sort((a, b) => {
      const scoreB = getProductRelevanceScore(b, trimmed);
      const scoreA = getProductRelevanceScore(a, trimmed);
      if (scoreB !== scoreA) {
        return scoreB - scoreA;
      }
      return a.name.localeCompare(b.name);
    });
  }

  // 2. Fallback fuzzy/partial match: match items that match as many token groups as possible (at least 1)
  const scored = ALL_PRODUCTS.map((product) => {
    const index = product.searchIndex || `${product.name} ${product.code} ${product.company} ${product.unit}`.toLowerCase();
    let matchedGroups = 0;
    for (const variants of groups) {
      if (variants.some((v) => index.includes(v))) {
        matchedGroups++;
      }
    }
    const relScore = getProductRelevanceScore(product, trimmed);
    return {
      product,
      matchedGroups,
      totalScore: matchedGroups * 100 + relScore
    };
  }).filter((item) => item.matchedGroups > 0);

  scored.sort((a, b) => b.totalScore - a.totalScore);
  return scored.slice(0, 100).map((s) => s.product);
}

// Extract unique companies / manufacturers sorted alphabetically
export const UNIQUE_COMPANIES: string[] = Array.from(
  new Set(ALL_PRODUCTS.map((p) => p.company).filter((c) => c && c !== 'General Supply'))
).sort((a, b) => a.localeCompare(b));

// Extract unique unit packaging
export const UNIQUE_UNITS: string[] = Array.from(
  new Set(ALL_PRODUCTS.map((p) => p.unit).filter(Boolean))
).sort((a, b) => a.localeCompare(b));

// Extract unique category tags
export const UNIQUE_CATEGORIES: string[] = Array.from(
  new Set(ALL_PRODUCTS.map((p) => p.categoryTag).filter(Boolean) as string[])
).sort((a, b) => a.localeCompare(b));

