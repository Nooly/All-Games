const HeavyBox = [
    { 'horizontal': '\u2501' },         // 2501 ━ HORIZONTAL
    { 'vertical': '\u2503' },           // 2503 ┃ VERTICAL
    { 'downRight': '\u250F' },          // 250F ┏ DOWN AND RIGHT
    { 'downLeft': '\u2513' },           // 2513 ┓ DOWN AND LEFT
    { 'upRight': '\u2517' },            // 2517 ┗ UP AND RIGHT
    { 'upLeft': '\u251B' },             // 251B ┛ UP AND LEFT
    { 'verticalRight': '\u2523' },      // 2523 ┣ VERTICAL AND RIGHT
    { 'verticalLeft': '\u252B' },       // 252B ┫ VERTICAL AND LEFT
    { 'downHorizontal': '\u2533' },     // 2533 ┳ DOWN AND HORIZONTAL
    { 'upHorizontal': '\u253B' },       // 253B ┻ UP AND HORIZONTAL
    { 'verticalHorizontal': '\u254B' }, // 254B ╋ VERTICAL AND HORIZONTAL
    { 'left': '\u2578' },               // 2578 ╸ LEFT
    { 'up': '\u2579' },                 // 2579 ╹ UP
    { 'right': '\u257A' },              // 257A ╺ RIGHT
    { 'down': '\u257B' },               // 257B ╻ DOWN
]

var BoxVisitor = function () {
    this.visit = function (screen) {
        screen.actionsFactory(screen, 'box', HeavyBox);

        screen.box.horizontalLine = (n = 1) => {
            for (let c = 0; c < n; c++)
                screen.write('\u2501');     // Draw Horizontal Line
            return screen;
        };

        screen.box.verticalLine = (n = 1) => {
            for (let r = 0; r < n; r++) {
                screen.write('\x1b[1s');    // Save cursor position
                screen.write('\u2503');     // Draw Vertical Line
                screen.write('\x1b[1u');    // Restore cursor position
                screen.write('\x1b[1B');    // move down
            };
            return screen;
        };

        screen.box.frame = (row, col, hight, width) => {
            screen.goto(row, col).box.downRight().box.horizontalLine(width).box.downLeft();
            screen.goto(row + 1, col).box.verticalLine(hight);
            screen.goto(row + 1, col + width + 1).box.verticalLine(hight);
            screen.goto(row + hight + 1, col).box.upRight().box.horizontalLine(width).box.upLeft();
        };

        screen.box.fullFrame = () => {
            screen.box.frame(1, 1, process.stdout.rows - 2, process.stdout.columns - 2);
        }
    }
}

module.exports = BoxVisitor

/*
    BOX DRAWINGS:
    -------------

    https://unicode-table.com/en/blocks/box-drawing/
    https://www.unicode.org/charts/PDF/U2500.pdf

    Light and heavy solid lines:
    ----------------------------
    2500 ─ LIGHT HORIZONTAL
    2501 ━ HEAVY HORIZONTAL
    2502 │ LIGHT VERTICAL
    2503 ┃ HEAVY VERTICAL

    Light and heavy dashed lines:
    -----------------------------
    2504 ┄ LIGHT TRIPLE DASH HORIZONTAL
    2505 ┅ HEAVY TRIPLE DASH HORIZONTAL
    2506 ┆ LIGHT TRIPLE DASH VERTICAL
    2507 ┇ HEAVY TRIPLE DASH VERTICAL
    2508 ┈ LIGHT QUADRUPLE DASH HORIZONTAL
    2509 ┉ HEAVY QUADRUPLE DASH HORIZONTAL
    250A ┊ LIGHT QUADRUPLE DASH VERTICAL
    250B ┋ HEAVY QUADRUPLE DASH VERTICAL

    Light and heavy line box components:
    ------------------------------------
    250C ┌ LIGHT DOWN AND RIGHT
    250D ┍ DOWN LIGHT AND RIGHT HEAVY
    250E ┎ DOWN HEAVY AND RIGHT LIGHT
    250F ┏ HEAVY DOWN AND RIGHT
    2510 ┐ LIGHT DOWN AND LEFT
    2511 ┑ DOWN LIGHT AND LEFT HEAVY
    2512 ┒ DOWN HEAVY AND LEFT LIGHT
    2513 ┓ HEAVY DOWN AND LEFT
    2514 └ LIGHT UP AND RIGHT
    2515 ┕ UP LIGHT AND RIGHT HEAVY
    2516 ┖ UP HEAVY AND RIGHT LIGHT
    2517 ┗ HEAVY UP AND RIGHT
    2518 ┘ LIGHT UP AND LEFT
    2519 ┙ UP LIGHT AND LEFT HEAVY
    251A ┚ UP HEAVY AND LEFT LIGHT
    251B ┛ HEAVY UP AND LEFT
    251C ├ LIGHT VERTICAL AND RIGHT
    251D ┝ VERTICAL LIGHT AND RIGHT HEAVY
    251E ┞ UP HEAVY AND RIGHT DOWN LIGHT
    251F ┟ DOWN HEAVY AND RIGHT UP LIGHT
    2520 ┠ VERTICAL HEAVY AND RIGHT LIGHT
    2521 ┡ DOWN LIGHT AND RIGHT UP HEAVY
    2522 ┢ UP LIGHT AND RIGHT DOWN HEAVY
    2523 ┣ HEAVY VERTICAL AND RIGHT
    2524 ┤ LIGHT VERTICAL AND LEFT
    2525 ┥ VERTICAL LIGHT AND LEFT HEAVY
    2526 ┦ UP HEAVY AND LEFT DOWN LIGHT
    2527 ┧ DOWN HEAVY AND LEFT UP LIGHT
    2528 ┨ VERTICAL HEAVY AND LEFT LIGHT
    2529 ┩ DOWN LIGHT AND LEFT UP HEAVY
    252A ┪ UP LIGHT AND LEFT DOWN HEAVY
    252B ┫ HEAVY VERTICAL AND LEFT
    252C ┬ LIGHT DOWN AND HORIZONTAL
    252D ┭ LEFT HEAVY AND RIGHT DOWN LIGHT
    252E ┮ RIGHT HEAVY AND LEFT DOWN LIGHT
    252F ┯ DOWN LIGHT AND HORIZONTAL HEAVY
    2530 ┰ DOWN HEAVY AND HORIZONTAL LIGHT
    2531 ┱ RIGHT LIGHT AND LEFT DOWN HEAVY
    2532 ┲ LEFT LIGHT AND RIGHT DOWN HEAVY
    2533 ┳ HEAVY DOWN AND HORIZONTAL
    2534 ┴ LIGHT UP AND HORIZONTAL
    2535 ┵ LEFT HEAVY AND RIGHT UP LIGHT
    2536 ┶ RIGHT HEAVY AND LEFT UP LIGHT
    2537 ┷ UP LIGHT AND HORIZONTAL HEAVY
    2538 ┸ UP HEAVY AND HORIZONTAL LIGHT
    2539 ┹ RIGHT LIGHT AND LEFT UP HEAVY
    253A ┺ LEFT LIGHT AND RIGHT UP HEAVY
    253B ┻ HEAVY UP AND HORIZONTAL
    253C ┼ LIGHT VERTICAL AND HORIZONTAL
    253D ┽ LEFT HEAVY AND RIGHT VERTICAL LIGHT
    253E ┾ RIGHT HEAVY AND LEFT VERTICAL LIGHT
    253F ┿ VERTICAL LIGHT AND HORIZONTAL HEAVY
    2540 ╀ UP HEAVY AND DOWN HORIZONTAL LIGHT
    2541 ╁ DOWN HEAVY AND UP HORIZONTAL LIGHT
    2542 ╂ VERTICAL HEAVY AND HORIZONTAL LIGHT
    2543 ╃ LEFT UP HEAVY AND RIGHT DOWN LIGHT
    2544 ╄ RIGHT UP HEAVY AND LEFT DOWN LIGHT
    2545 ╅ LEFT DOWN HEAVY AND RIGHT UP LIGHT
    2546 ╆ RIGHT DOWN HEAVY AND LEFT UP LIGHT
    2547 ╇ DOWN LIGHT AND UP HORIZONTAL HEAVY
    2548 ╈ UP LIGHT AND DOWN HORIZONTAL HEAVY
    2549 ╉ RIGHT LIGHT AND LEFT VERTICAL HEAVY
    254A ╊ LEFT LIGHT AND RIGHT VERTICAL HEAVY
    254B ╋ HEAVY VERTICAL AND HORIZONTAL
    254C ╌ LIGHT DOUBLE DASH HORIZONTAL
    254D ╍ HEAVY DOUBLE DASH HORIZONTAL
    254E ╎ LIGHT DOUBLE DASH VERTICAL
    254F ╏ HEAVY DOUBLE DASH VERTICAL

    Double lines
    ------------
    2550 ═ DOUBLE HORIZONTAL
    2551 ║ DOUBLE VERTICAL

    Light and double line box components:
    -------------------------------------
    2552 ╒ DOWN SINGLE AND RIGHT DOUBLE
    2553 ╓ DOWN DOUBLE AND RIGHT SINGLE
    2554 ╔ DOUBLE DOWN AND RIGHT
    2555 ╕ DOWN SINGLE AND LEFT DOUBLE
    2556 ╖ DOWN DOUBLE AND LEFT SINGLE
    2557 ╗ DOUBLE DOWN AND LEFT
    2558 ╘ UP SINGLE AND RIGHT DOUBLE
    2559 ╙ UP DOUBLE AND RIGHT SINGLE
    255A ╚ DOUBLE UP AND RIGHT
    255B ╛ UP SINGLE AND LEFT DOUBLE
    255C ╜ UP DOUBLE AND LEFT SINGLE
    255D ╝ DOUBLE UP AND LEFT
    255E ╞ VERTICAL SINGLE AND RIGHT DOUBLE
    255F ╟ VERTICAL DOUBLE AND RIGHT SINGLE
    2560 ╠ DOUBLE VERTICAL AND RIGHT
    2561 ╡ VERTICAL SINGLE AND LEFT DOUBLE
    2562 ╢ VERTICAL DOUBLE AND LEFT SINGLE
    2563 ╣ DOUBLE VERTICAL AND LEFT
    2564 ╤ DOWN SINGLE AND HORIZONTAL DOUBLE
    2565 ╥ DOWN DOUBLE AND HORIZONTAL SINGLE
    2566 ╦ DOUBLE DOWN AND HORIZONTAL
    2567 ╧ UP SINGLE AND HORIZONTAL DOUBLE
    2568 ╨ UP DOUBLE AND HORIZONTAL SINGLE
    2569 ╩ DOUBLE UP AND HORIZONTAL
    256A ╪ VERTICAL SINGLE AND HORIZONTAL DOUBLE
    256B ╫ VERTICAL DOUBLE AND HORIZONTAL SINGLE
    256C ╬ DOUBLE VERTICAL AND HORIZONTAL

    Character cell arcs:
    --------------------
    256D ╭ LIGHT ARC DOWN AND RIGHT
    256E ╮ LIGHT ARC DOWN AND LEFT
    256F ╯ LIGHT ARC UP AND LEFT
    2570 ╰ LIGHT ARC UP AND RIGHT

    Character cell diagonals:
    -------------------------
    2571 ╱ LIGHT DIAGONAL UPPER RIGHT TO LOWER LEFT
    2572 ╲ LIGHT DIAGONAL UPPER LEFT TO LOWER RIGHT
    2573 ╳ LIGHT DIAGONAL CROSS 

    Light and heavy half lines:
    ---------------------------
    2574 ╴ LIGHT LEFT
    2575 ╵ LIGHT UP
    2576 ╶ LIGHT RIGHT
    2577 ╷ LIGHT DOWN
    2578 ╸ HEAVY LEFT
    2579 ╹ HEAVY UP
    257A ╺ HEAVY RIGHT
    257B ╻ HEAVY DOWN

    Mixed light and heavy lines:
    ----------------------------
    257C ╼ LIGHT LEFT AND HEAVY RIGHT
    257D ╽ LIGHT UP AND HEAVY DOWN
    257E ╾ HEAVY LEFT AND LIGHT RIGHT
    257F ╿ HEAVY UP AND LIGHT DOWN
*/