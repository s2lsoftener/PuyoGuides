---
title: Basic Mechanics
---
<AssetLoader />
# Basic Mechanics

Let's review how Puyo Puyo works. The game starts off by giving you **pairs** of Puyos to place around the game field.
-gif-

If you connect **four** or more Puyos of the **same color** together, they’ll pop and disappear.
<ChainImg :importedData="
  [{fieldData: '00000000000000000000000000000000000000000000000000000000000000000RGG000RGGG0RR',
    shadowData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
    cursorData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
    arrowData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
    autoDrop: false
  }]" :nextQueue="'RRBGYYPPRBGYPYPGBG'" />

Gravity constantly affects Puyos, so popping one group of Puyos can cause more groups to start popping too. This is called a **Chain**.
<!-- <ChainImg :importedData="
  [{fieldData: '0000000000000000000000000000000000000000000000000000000RG000RGB000RGB000RGBB00',
    shadowData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
    cursorData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
    arrowData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
    autoDrop: false
  }]" :nextQueue="'RRBGYYPPRBGYPYPGBG'" /> -->



When you make a chain, you’ll send <GarbagePuyo />Garbage Puyos to your opponent. <GarbagePuyo />Garbage Puyos don't disappear when four of them are connected. Instead, you have to clear them by popping colored Puyos **next** to them.

Big chains send a lot of <GarbagePuyo />Garbage Puyo all at once. Overpowering your opponent with a much larger chain is a surefire way to win.
[6 chain vs 2 chain]

There's more to Puyo Puyo than pooping out your biggest combos as fast as possible though. A big chain won't always lead to victory if you're not careful. For example, here's a cool chain I almost made in a match once. Click Play/Edit to view it in the simulator -- it's a 13 Chain!
-sim-