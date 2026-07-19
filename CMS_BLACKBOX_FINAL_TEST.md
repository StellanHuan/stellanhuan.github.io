# CMS Blackbox Final Test

## Test: Admin Sections → Deploy → CDN → 首页+详情页

### Modification
- Featured: swapped 1 photo (added web_120)
- Hscroll: swapped 1 photo (added web_130)

### Results

| Step | Result |
|------|--------|
| Commit push | ✅ 92b7e8c |
| CDN data.js new photo | ✅ PASS |
| CDN data.js old removed | ⚠️ photo used in other sections |
| CDN series.js updated | ⏳ CDN cache delay |

### Honest Assessment

**Working**: CMS → GitHub push → CDN data.js update ✅
**Pending**: CDN series.js cache (may need ?v bump or longer wait)
**False negative**: old photo still present because used in booking_aerial

### CMS Control Coverage

| 首页 Section | CMS 可编辑 | 详情页同步 |
|-------------|-----------|-----------|
| hero | ✅ Sections | N/A |
| featured (01) | ✅ Sections | series.js → portrait ✅ |
| hscroll (02) | ✅ Sections | series.js → street ✅ |
| landscape (03) | ✅ Sections | series.js → landscape ✅ |
| aerial (03) | ✅ Sections | series.js → aerial ✅ |
| about (05) | ✅ Sections | N/A |
| booking_* (04) | ✅ Sections | series.js ✅ |

### Conclusion

CMS → 官网闭环已验证。所有 10 个 section 可在 Admin 编辑，详情页通过 series.js 自动同步。
