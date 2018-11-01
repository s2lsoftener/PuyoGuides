---
home: true
actionText: Get Started
actionLink: /tutorial/
features:
- title: Interactive Chainsims
  details: View editable, fancy chainsims right on the same page.
- title: Slideshows & Drills
  details: Understand how chains are made, step-by-step.
- title: (WIP) Accessibility
  details: Puyos across the site will eventually have adjustable color settings.
footer: Thank you to everyone supporting the Puyo Nexus Patreon.
---
<ClientOnly>
<AssetLoader />
This site makes heavy use of WebGL to render the chainsims and other content. If your browser doesn't have hardware acceleration enabled, or if it's not very fast, then you're going to have a... bad time.

# Recent Content
| Tutorials                                  | Drills                                | Streamers                                |
|--------------------------------------------|---------------------------------------|------------------------------------------|
| <RecentArticles :path="'/tutorial/'" />    | <RecentArticles :path="'/drills/'" /> | <RecentArticles :path="'/streamers/'" /> |

</ClientOnly>