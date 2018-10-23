---
title: The Game Screen
---
<AssetLoader />
# The Game Screen
If you're completely new to Puyo Puyo, you should skim through this to familiarize yourself with the game interface.

-- img --

## Game Field
Puyo players usually refer to the playable area as the **board** or **game field**. The visible area is 6 columns wide and 12 rows tall.

There's a hidden "13th" row above the game field with special properties. Puyos in the 13th row don't connect to the Puyos below, so you can use it to make tricky or sneaky chains.

<ChainImg :importedData="
  [{fieldData: 'R00000R0000GR0000GR000GGJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJ',
    shadowData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
    cursorData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
    arrowData: '0L0000000000000000000000000000000000000000000000000000000000000000000000000000',
    autoDrop: false
  }]" :nextQueue="'RRBGYYPPRBGYPYPGBG'" :caption="'Anything in the 13th row doesn\'t connect to stuff below.'" /> 
<ChainImg :importedData="
  [{fieldData: '000GBR000RRR000BBY000BGG000GBY000RYY000BBG000BRR000YGR000GGB000YYYG0RBBBGGGRRR',
    shadowData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
    cursorData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
    arrowData: '00000000R000000000000000000000000000000000000000000000000000D00000000000000000',
    autoDrop: false
  }]" :nextQueue="'RRBGYYPPRBGYPYPGBG'" :caption="'Puyos in the 13th row can connect if they drop down into the visible area first.'"/>

## Active Piece (Pair)
The game will generate pairs of Puyos for you to place on the game field. When you press a rotate button, the pair will rotate around the Puyo with the flashing white outline (the Puyo that starts out on the bottom).
-img rotate-

## Garbage Tray



<ChainsimModal />