# Analytics Layer

## Quick Start
```html
<script src="src/analytics/config.js"></script>
<script src="src/analytics/analytics.js"></script>
<script src="src/analytics/events.js"></script>
```

## API
```js
Analytics.track('series_view', { series: 'portrait' })
Analytics.track('lightbox_open', { photo: 'web_001', index: 0 })
Analytics.track('wechat_copy')
```

## Add Custom Adapter
```js
Analytics.registerAdapter({
  name: 'ga4',
  send: (event, data) => gtag('event', event, data)
});
```

## Events
See config.js for full event definitions.
