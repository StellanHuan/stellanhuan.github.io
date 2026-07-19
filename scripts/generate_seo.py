#!/usr/bin/env python3
"""SEO Generator for Stellan Photography — V5.2
从 content/ 自动生成 sitemap.xml + JSON-LD + OG tags
"""

import json, os
from datetime import datetime

BASE = os.path.dirname(__file__) + '/..'
DOMAIN = 'https://stellanhuan.github.io'
TODAY = datetime.now().strftime('%Y-%m-%d')

# Load data
photos = json.load(open(f'{BASE}/content/photos/index.json'))
series = json.load(open(f'{BASE}/content/series/index.json'))
projects = json.load(open(f'{BASE}/content/projects/index.json'))
journal = json.load(open(f'{BASE}/content/journal/index.json'))
site = json.load(open(f'{BASE}/src/data/site.json'))

os.makedirs(f'{BASE}/public', exist_ok=True)

# ═══════════════ 1. SITEMAP.XML ═══════════════
urls = [
    ('/', '1.0', 'daily'),
    ('/series/', '0.9', 'weekly'),
]

for sid, s in series.items():
    urls.append((f'/series/#{sid}', '0.8', 'weekly'))

for proj in projects:
    if proj.get('published'):
        urls.append((f'/src/pages/Projects/Projects.html#{(proj.get("slug") or "")}', '0.7', 'monthly'))

for a in journal:
    if not a.get('draft'):
        urls.append((f'/src/pages/Journal/Journal.html#{(a.get("slug") or "")}', '0.7', 'monthly'))

sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n'
sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n'
for path, priority, freq in urls:
    sitemap += f'  <url>\n    <loc>{DOMAIN}{path}</loc>\n    <lastmod>{TODAY}</lastmod>\n    <changefreq>{freq}</changefreq>\n    <priority>{priority}</priority>\n  </url>\n'
sitemap += '</urlset>'

with open(f'{BASE}/public/sitemap.xml', 'w') as f:
    f.write(sitemap)
print(f'✅ sitemap.xml: {len(urls)} URLs')

# ═══════════════ 2. ROBOTS.TXT ═══════════════
robots = f'''User-agent: *
Allow: /
Sitemap: {DOMAIN}/public/sitemap.xml

# Disallow admin pages from indexing
Disallow: /admin-v2/
Disallow: /admin.html
'''

with open(f'{BASE}/public/robots.txt', 'w') as f:
    f.write(robots)
print('✅ robots.txt')

# ═══════════════ 3. JSON-LD ═══════════════
jsonld = {
    '@context': 'https://schema.org',
    '@graph': [
        # Person
        {
            '@type': 'Person',
            'name': '瓛瓛 Stellan Huan',
            'alternateName': 'Stellan',
            'description': 'Photographer based in Zhengzhou and Tokyo. Student of Arimoto Shinya.',
            'url': DOMAIN,
            'sameAs': [f'https://github.com/{site["social"]["github"]}'],
            'knowsAbout': ['Photography', 'Portrait', 'Street Photography', 'Aerial Photography'],
            'alumniOf': {'@type': 'CollegeOrUniversity', 'name': 'Tokyo TVA'},
            'nationality': {'@type': 'Country', 'name': 'China'}
        },
        # Website
        {
            '@type': 'WebSite',
            'name': site['title'],
            'url': DOMAIN,
            'inLanguage': ['zh', 'ja', 'en'],
            'author': {'@id': '#person'}
        }
    ]
}

# ImageObjects
for photo in photos[:50]:  # Top 50 photos
    jsonld['@graph'].append({
        '@type': 'ImageObject',
        'name': photo['title'],
        'contentUrl': f"{DOMAIN}/images/{photo['file'].split('/')[-1]}",
        'author': {'@id': '#person'},
        'creditText': '瓛瓛 HuanHuan',
        'license': 'https://creativecommons.org/licenses/by-nc-nd/4.0/'
    })

# CreativeWorks (Series/Projects)
for sid, s in series.items():
    jsonld['@graph'].append({
        '@type': 'CreativeWork',
        'name': s['name'].get('zh', sid),
        'description': s.get('description', {}).get('zh', ''),
        'url': f'{DOMAIN}/series/#{sid}',
        'author': {'@id': '#person'}
    })

for proj in projects:
    if proj.get('published'):
        jsonld['@graph'].append({
            '@type': 'CreativeWork',
            'name': proj['name'],
            'description': proj.get('description', ''),
            'dateCreated': proj.get('date', ''),
            'url': f'{DOMAIN}/src/pages/Projects/Projects.html#{proj.get("slug", "")}',
            'author': {'@id': '#person'}
        })

# Articles
for a in journal:
    if not a.get('draft'):
        jsonld['@graph'].append({
            '@type': 'Article',
            'headline': a['title'],
            'description': a.get('excerpt', ''),
            'datePublished': a.get('date', ''),
            'url': f'{DOMAIN}/src/pages/Journal/Journal.html#{a.get("slug", "")}',
            'author': {'@id': '#person'},
            'image': f"{DOMAIN}/images/{a['cover']}" if a.get('cover') else None
        })

with open(f'{BASE}/public/structured-data.json', 'w') as f:
    json.dump(jsonld, f, ensure_ascii=False, indent=2)
print(f'✅ JSON-LD: {len(jsonld["@graph"])} entities (Person + ImageObjects + CreativeWorks + Articles)')

# ═══════════════ 4. OG REPORT ═══════════════
pages_og = {
    'home': {'title': site['title'], 'description': 'Stellan Huan · Nikon Z8 · 郑州与东京之间的光'},
    'series': {sid: {'title': f'{s["name"]["zh"]} — 瓛瓛', 'description': s.get('description', {}).get('zh', '')} for sid, s in series.items()},
}

print(f'\n📊 Summary:')
print(f'  sitemap.xml:   {len(urls)} URLs')
print(f'  robots.txt:    ✓')
print(f'  JSON-LD:       {len(jsonld["@graph"])} entities')
print(f'  OG tags:       {len(pages_og)} pages ready')
