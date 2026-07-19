#!/usr/bin/env python3
"""Image Pipeline: JPEG → WebP + AVIF + Thumb"""
import os, json
from PIL import Image
import pillow_avif

SRC = os.path.join(os.path.dirname(__file__), '..', 'images')
DST = os.path.join(os.path.dirname(__file__), '..', 'assets', 'images')

for sub in ['original', 'webp', 'avif', 'thumb']:
    os.makedirs(os.path.join(DST, sub), exist_ok=True)

files = sorted([f for f in os.listdir(SRC) if f.lower().endswith('.jpeg')])
stats = {'original': {'count': 0, 'size': 0}, 'webp': {'count': 0, 'size': 0}, 'avif': {'count': 0, 'size': 0}, 'thumb': {'count': 0, 'size': 0}}

import shutil
for i, f in enumerate(files):
    src = os.path.join(SRC, f)
    name = os.path.splitext(f)[0]
    
    shutil.copy2(src, os.path.join(DST, 'original', f))
    stats['original']['count'] += 1
    stats['original']['size'] += os.path.getsize(src)
    
    try:
        img = Image.open(src)
        img.save(os.path.join(DST, 'webp', f'{name}.webp'), 'WEBP', quality=80)
        stats['webp']['count'] += 1
        stats['webp']['size'] += os.path.getsize(os.path.join(DST, 'webp', f'{name}.webp'))
        
        img.save(os.path.join(DST, 'avif', f'{name}.avif'), 'AVIF', quality=60)
        stats['avif']['count'] += 1
        stats['avif']['size'] += os.path.getsize(os.path.join(DST, 'avif', f'{name}.avif'))
        
        thumb = img.copy()
        thumb.thumbnail((400, 400), Image.LANCZOS)
        thumb.save(os.path.join(DST, 'thumb', f'{name}.webp'), 'WEBP', quality=75)
        stats['thumb']['count'] += 1
        stats['thumb']['size'] += os.path.getsize(os.path.join(DST, 'thumb', f'{name}.webp'))
        
        img.close(); thumb.close()
    except Exception as e:
        print(f"  ⚠ {f}: {e}")
    
    if (i+1) % 30 == 0: print(f"  {i+1}/{len(files)}...")

orig_mb = stats['original']['size']/1024/1024
print(f"✅ {len(files)} files | Original: {orig_mb:.1f}MB | WebP: {stats['webp']['size']/1024/1024:.1f}MB (-{100-stats['webp']['size']/stats['original']['size']*100:.0f}%) | AVIF: {stats['avif']['size']/1024/1024:.1f}MB (-{100-stats['avif']['size']/stats['original']['size']*100:.0f}%) | Thumb: {stats['thumb']['size']/1024/1024:.1f}MB")
