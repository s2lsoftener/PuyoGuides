---
title: The Basics of Chaining
---
<AssetLoader />
# The Basics of Chaining
## Overview
In **Puyo Puyo**, the goal of the game is to connect 4+ Puyos of the same color, which causes them to pop and disappear. Hover over the chainsim below to see it in action.

<ChainImg :importedData="
  [{fieldData: '000000000000000000000000000000000000000000000000000000000000000B0RGG0B0RGGGBRR',
    shadowData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
    cursorData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
    arrowData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
    autoDrop: false
  }]" :nextQueue="''" :hasCaption="true">The blue Puyos won't pop because there's only three of them.</ChainImg>

Once the Puyos finish popping, gravity can cause other Puyos to fall down.
....

If the falling Puyos end up forming more groups of four, they'll pop too.
...

Setting up the Puyos so they fall and pop automatically is the basic idea behind  **Chains**.
-- 19 Chain --

## Your First Chain
Now that you've seen what chains are supposed to be like, let's try to make one on our own.

<Slideshow :importedData="
  [{fieldData: '0000000000000000000000000000000000000000000000000000000000000000000000R0000RR0',
    shadowData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
    cursorData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
    arrowData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
    autoDrop: false,
    advanceNext: true,
    slideText: 'Imagine you\'re starting with this, three Red Puyos. You have Red and Blue Puyos coming up.'
  },
  {
    fieldData: '0000000000000000000000000000000000000000000000000000000000000000000000R0000RR0',
    shadowData: '000000000000000000000000000000000000000000000000000000000000000B00000R00000000',
    cursorData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
    arrowData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
    autoDrop: false,
    advanceNext: false,
    slideText: 'You could pop the Red Puyos right now if you wanted, but that\'s just a 1 Chain. (Hover over the chainsim to see the 1 Chain).'
  },
  {
    fieldData: '000000000000000000000000000000000000000000000000000000000000000R00000BR0000RR0',
    shadowData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
    cursorData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
    arrowData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
    autoDrop: false,
    advanceNext: true,
    slideText: 'Instead of popping the Reds right away, use the Blue Puyo to separate the Reds for now.'
  },
  {
    fieldData: '000000000000000000000000000000000000000000000000000000000000000R0000BBR000BRR0',
    shadowData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
    cursorData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
    arrowData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
    autoDrop: false,
    advanceNext: true,
    slideText: 'Let\'s say we want to trigger our chain now. Add more pieces so we can pop the blues and...'
  },
  {
    fieldData: '000000000000000000000000000000000000000000000000000000000000000R000GBBR00BBRR0',
    shadowData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
    cursorData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
    arrowData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
    autoDrop: false,
    advanceNext: true,
    slideText: 'We have a 2 Chain! (Hover over tha chainsim to watch it play.)'
  }]" :nextQueue="'RBBBGB'" />

If you keep separating the colors, one at a time, you can make even longer chains.

<Slideshow :importedData="
  [{fieldData: '000000000000000000000000000000000000000000000000000000000000000R0000BBR000BRR0',
    shadowData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
    cursorData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
    arrowData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
    autoDrop: false,
    advanceNext: true,
    slideText: 'I\'m not satisfied with just a 2 Chain. Let\'s go for more!'
  },
  {
    fieldData: '00000000000000000000000000000000000000000000000000000000B00000GR0000BBR000BRR0',
    shadowData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
    cursorData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
    arrowData: '0000000000000000000000000000000000000000000000000000000000000R0000000000000000',
    autoDrop: false,
    advanceNext: true,
    slideText: 'Instead of popping the Blues right away, separate it with Greens.'
  },
  {
    fieldData: '00000000000000000000000000000000000000000000000000000000B00000GR000GBBR00GBRR0',
    shadowData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
    cursorData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
    arrowData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
    autoDrop: false,
    advanceNext: true,
    slideText: 'The Greens are the trigger for your chain now. If you pop it, you\'ll get a 3 Chain. (Try it out by clicking Edit).'
  },
  {
    fieldData: '0000000000000000000000000000000000000000000000000000000GB0000YGR000GBBR00GBRR0',
    shadowData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
    cursorData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
    arrowData: '000000000000000000000000000000000000000000000000000000000000R00000000000000000',
    autoDrop: false,
    advanceNext: true,
    slideText: 'Let\'s keep going higher. Instead of popping the Greens, separate it with Yellows.'
  },
  {
    fieldData: '0000000000000000000000000000000000000000000000000000000GB0000YGR00YGBBR0YGBRR0',
    shadowData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
    cursorData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
    arrowData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
    autoDrop: false,
    advanceNext: true,
    slideText: 'Now, the Yellow Puyos are the trigger for your chain. If you pop it, you\'ll get a 4 Chain. Let\'s do that.'
  },
  {
    fieldData: '000000000000000000000000000000000000000000000000000000YGB000YYGR00YGBBR0YGBRR0',
    shadowData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
    cursorData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
    arrowData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
    autoDrop: false,
    advanceNext: true,
    slideText: 'Now, the Yellow Puyos are the trigger for your chain. If you pop it, you\'ll get a 4 Chain. Let\'s do that.'
  }]" :nextQueue="'GBGGYGYYYY'" />

## Planning Ahead
Think back on the chains above. Did you notice anything about their general structure? When we were making each **link**, we focused on making a group of three first; worrying about the fourth Puyo came after.
-- x2 Chainsim --

Unless you're really lucky, making chains won't always be this straightforward. Sometimes, you'll only get two of the Puyos you'll need.
-- Chainsim --

Or maybe you'll only get one of the color you want.
-- Chainsim --

Or, maybe, the game will hand you colors you don't even "need" right now.
-- Chainsim --

Maybe you'll get loads of a color you already have?
-- Chainsim --

You'll need to know how to handle each of these **color distributions** if you want to make consistent chains.

### A. Visualize Potential Shapes
Remember, the goal of Puyo Puyo is to make four of the same color connect. So actually, it doesn't really matter how you group things as long as you can make the groups of four happen eventually.

-- a group of three and a group of 1 --
-- a group of two and a group of two --
-- a group of 1 and a group of three --
-- three more --

### B. Visualize Future Links
It's very easy to get tunnel visioned on the link you're currently working on.
-- where does this go?? --

It also doesn't help that, in a real match, you're going to feel pressure to play fast. If the Puyos you're holding don't have an obvious use, it's easy to get in the habit of throwing them off to the side.
-- NoHOHO Stacking, disappointed emoji.--

You should try your best to have some sort of plan though. In the chainsim below, the immediate link needs Blues and Reds.
-- from the earlier chain --

But if you look at the NEXT Window, only Greens and Yellows are available. How do we begin to use these colors? 
-- 4 chain from the beginning --

Let's start by revisiting the 4 Chain we made at the beginning of this page. 



<ChainImg :importedData="
  [{fieldData: '00000000000000000000000000000000000000000000000000000000B00000GR0000BBR000BRR0',
    shadowData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
    cursorData: '000000000000000000000000000000000000000000000000000000000000000000001100001000',
    arrowData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
    autoDrop: false
  }]" :nextQueue="''" :hasCaption="true">The blue Puyos won't pop because there's only three of them.</ChainImg>

However, you won't always get to finish the group of three first. 

<ChainsimModal />