---
home: true
actionText: Get Started
actionLink: /tutorial/
features:
- title: Interactive Chainsims
  details: View editable, fancy chainsims right on the same page.
- title: Slideshows & Drills
  details: Understand how chains are made, step-by-step.
- title: Improved Accessibility (WIP)
  details: Puyos across the site have adjustable color settings.
footer: Thank you to everyone supporting the Puyo Nexus Patreon.
---
<ClientOnly>
<AssetLoader />
<!-- <AssetLoader></AssetLoader>
This site makes heavy use of WebGL to render the chainsims and other content. If your browser doesn't have it enabled, or if it's not very fast, then you're going to have a... bad time. -->

<!-- # Recent Content
| Tutorials          | News               | Blog               |
|--------------------|--------------------|--------------------|
| <RecentArticles /> | <RecentArticles /> | <RecentArticles /> | -->

# Color Edit
If you have difficulty differentiating colors, you can change the hue filter of the Puyos here. **NOTE:** Filters are currently disabled on the editable chainsim and chaining drills because of poor performance. Better color vision accomodations are being worked on, so please stay tuned!
<ColorEdit />

</ClientOnly>