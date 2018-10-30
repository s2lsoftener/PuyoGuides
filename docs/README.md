---
home: true
actionText: Get Started
actionLink: /tutorial/
features:
- title: Interactive Chainsims
  details: View editable, fancy chainsims right on the same page.
- title: Build-order Slideshows
  details: Understand how chains are made, step-by-step.
- title: Improved Accessibility(?)
  details: This is a WIP, but if you have trouble telling the colors apart, you can edit the hues of the Puyos below.
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
If you have trouble differentiating colors, try changing the settings here. Refresh the page and they should take effect site-wide. (Only the hue setting will do anything because the other filters won't combine without matrix math that I can't be bothered to figure out right now.)
<ColorEdit />

</ClientOnly>