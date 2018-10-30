---
title: The Game Screen
---
<!-- <AssetLoader /> -->
# The Game Screen
If you're completely new to Puyo Puyo, you should skim through this page to get familiar with the game interface.

-- img --

## Game Field
The playable area is called the **board** or **game field**. The visible space is 6 columns wide and 12 rows tall. If you listen to people commentate on matches, they'll reference the columns by number from 1 to 6, left to right.

There's a hidden "13th" row above the game field with special properties. Puyos in the 13th row don't connect to the Puyos below, so you can use it to make tricky or sneaky chains.

<ChainImg :importedData="
  [{fieldData: 'R00000R0000GR0000GR000GGJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJ',
    shadowData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
    cursorData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
    arrowData: '0L0000000000000000000000000000000000000000000000000000000000000000000000000000',
    autoDrop: false
  }]" :nextQueue="''" :hasCaption="true">Anything in the 13th row won't connect to stuff below.</ChainImg> 
<ChainImg :importedData="
  [{fieldData: '000GBR000RRR000BBY000BGG000GBY000RYY000BBG000BRR000YGR000GGB000YYYG0RBBBGGGRRR',
    shadowData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
    cursorData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
    arrowData: '00000000R000000000000000000000000000000000000000000000000000D00000000000000000',
    autoDrop: false
  }]" :nextQueue="''" :hasCaption="true">The <RedPuyo /> in the 13th row will connect once it drops down.</ChainImg>

## Active Piece (Pair)
The game will generate pairs of Puyos for you to place on the game field. When you press a rotate button, the pair will rotate around the Puyo with the flashing white outline (the Puyo that starts out on the bottom).
-img rotate-

## Garbage Tray
The **garbage tray** appears over your game field. It tells you how many <GarbagePuyo />Garbage Puyos are about to drop on you.
-- garbagetray crop --

## Score Display
The numbers below the game field show you many points you've earned from chaining and soft-dropping your Puyos. It's mostly visual flair, but it's nice to see if you understand the [scoring formula](https://puyonexus.com/wiki/Scoring)

## NEXT Window
The **NEXT Window** shows you the pairs of Puyos that are coming up next. Modern Puyo games will show you two pairs.
-- img --

#### Note on piece generation
Standard competitive Puyo matches are always played using 4 of the 5 available Puyo colors. One thing to notice, though, is that the first two pairs of Puyos in a game will only draw from 3 of the 5 colors. This can influence how you want to start building your chain.

## The Red X
If anything gets set in the top-most row, column 3, you'll lose the game. Fever mode adds an extra X in the 4th column.



<ChainsimModal />