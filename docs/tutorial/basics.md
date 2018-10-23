---
title: The Basics of Chaining
---
<AssetLoader />
# The Basics of Chaining
## Overview
In **Puyo Puyo**, the goal of the game is to connect 4+ Puyos of the same color. If you do that, they'll pop and disappear. Hover over the chainsim below to see it in action.

<ChainImg :importedData="
  [{fieldData: '00000000000000000000000000000000000000000000000000000000000000000RGG000RGGG0RR',
    shadowData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
    cursorData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
    arrowData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
    autoDrop: false
  }]" :nextQueue="''" />

Once the Puyos finish popping, gravity can cause other Puyos to fall down.
....

If the falling Puyos end up forming more groups of four, they'll pop too.
...

Setting up the Puyos so they fall and pop automatically is the basic idea behind  **Chains**.
-- 19 Chain --

## Triggers, Trigger Groups, Key Puyos
Let's break down the concept of chaining into simpler parts. A Puyo chain can have multiple links, and each link can usually be broken down again into a **trigger group** and **key puyos**.
-- 2 images with caption --





## Chain Building Approaches
In Puyo Puyo, I'd say there's two kinds of "approaches" to building a chain: **direct chaining**, and **disjointed chaining**.

With a direct chaining approach, you focus on using your immediate Puyos

<ChainsimModal />