export function jsonLdWebsite(locale: 'zh'|'en', siteTitle: string, description: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteTitle,
    description,
    url,
    inLanguage: locale==='zh' ? 'zh-CN' : 'en-US',
  };
}

export function jsonLdPerson(name: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    url,
  };
}
