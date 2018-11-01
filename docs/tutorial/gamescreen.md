---
title: The Game Screen
---
<ClientOnly>
<AssetLoader />
# The Game Screen
If you're completely new to Puyo Puyo, you should skim through this page to get familiar with the game interface.

<Figure :imgUrl="'/img/guides/gamefield.jpg'" :big="true" />

## Game Field
The playable area is called the **board** or **game field**. The visible space is 6 columns wide and 12 rows tall. If you listen to any Puyo match commentary, the commentators will reference the columns by number.

<Figure :imgUrl="'/img/guides/column_numbers.jpg'" />

<br>
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
The game will generate pairs of Puyos for you to place on the game field. When you press a rotate button, the pair will rotate around the Puyo with the flashing white outline.

<Figure :imgUrl="'/img/guides/activepair.gif'" />

## Garbage Tray
The **garbage tray** appears over your game field. It indicates how many Garbage Puyos are about to drop on your field.

<Figure :imgUrl="'/img/guides/garbage_tray.jpg'" />

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
</ClientOnly>