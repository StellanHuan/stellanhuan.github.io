#!/usr/bin/env python3
"""Release QA Checker — V6.4"""
import json, os, sys

BASE = os.path.dirname(__file__) + '/..'
errors = []
warnings = []
ok = []

def check(condition, msg, level='error'):
    if condition: ok.append(msg)
    else: (errors if level=='error' else warnings).append(f'  [{level.upper()}] {msg}')

# 1. JSON validity
for name, path in [('photos','content/photos/index.json'),('series','content/series/index.json'),('projects','content/projects/index.json'),('journal','content/journal/index.json'),('prints','content/prints/index.json'),('services','content/services/index.json'),('site','src/data/site.json')]:
    fp = f'{BASE}/{path}'
    if not os.path.exists(fp): errors.append(f'  MISSING: {path}'); continue
    try:
        with open(fp) as f: json.load(f)
        ok.append(f'  ✓ {name}.json valid')
    except Exception as e: errors.append(f'  INVALID: {path} — {e}')

# 2. Images
with open(f'{BASE}/content/photos/index.json') as f: photos = json.load(f)
missing_imgs = [p['file'] for p in photos if not os.path.exists(f'{BASE}/{p["file"]}')]
check(not missing_imgs, f'All {len(photos)} images present')
if missing_imgs: errors.append(f'  Missing {len(missing_imgs)} images: {missing_imgs[:5]}...')

# 3. Empty metadata
empty_title = [p['file'] for p in photos if not p.get('title')]
empty_series = [p['file'] for p in photos if not p.get('series')]
check(not empty_title, f'All photos have titles', 'warn' if empty_title else 'ok')
check(not empty_series, f'All photos have series', 'warn' if empty_series else 'ok')
if empty_title: warnings.append(f'  {len(empty_title)} photos missing title')
if empty_series: warnings.append(f'  {len(empty_series)} photos missing series')

# 4. Sections
with open(f'{BASE}/src/data/site.json') as f: site = json.load(f)
sections = site.get('sections', {})
for key, files in sections.items():
    missing = [f for f in files if not any(p['file'].endswith(f) for p in photos)]
    check(not missing, f'Section {key}: {len(files)} photos all exist', 'warn')
    if missing: warnings.append(f'  Section {key}: {len(missing)} photos not found')

# 5. SEO files
for f in ['public/sitemap.xml', 'public/robots.txt', 'public/structured-data.json']:
    check(os.path.exists(f'{BASE}/{f}'), f'{f} exists')

# 6. HTML pages
pages = ['index.html', 'series/index.html', 'admin-v2/index.html',
         'src/pages/Home/Home.html', 'src/pages/Series/Series.html',
         'src/pages/Projects/Projects.html', 'src/pages/Journal/Journal.html',
         'src/pages/Services/Services.html', 'src/pages/Inquiry/Inquiry.html']
for p in pages:
    check(os.path.exists(f'{BASE}/{p}'), f'Page: {p}')

# Report
print(f'✅ Passed: {len(ok)}')
if warnings: print(f'\n⚠ Warnings ({len(warnings)}):')
for w in warnings: print(w)
if errors: print(f'\n❌ Errors ({len(errors)}):')
for e in errors: print(e)

if errors: sys.exit(1)
print('\n🎉 All checks passed!')
