'use client';
"use strict";

import { useEffect } from 'react';

export function LoadPuzzle() {
    useEffect(() => {
        console.log('typeof window:', typeof window);
        if (typeof window !== 'undefined') {
            "use strict";
            const $ = require('jquery');

            // clear out old text fields
            $("#puzNotepad, .clue").hide();
            $("#puzAuthor, #puzCopy, #across, #down").html("");
            $("#puzTitle").html("Fetching data...");

            // delete old table
            var tbl = $("#puzTable")[0];
            var n = tbl.rows.length;
            while (n > 0) {
                tbl.deleteRow(--n);
            }

            // make the JSONP call and send result to ShowPuzzle()

            $.getJSON("https://www.xwordinfo.com/JSON/Data.ashx?callback=?", { date: 'current' }, ShowPuzzle);

            $(() => {
                console.log('jQuery is working 1!');
            });
        }
    }, []);
}

export function ShowPuzzle(puzzle) {
    console.log(puzzle);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            "use strict";
            const $ = require('jquery');

            // Fill in text fields
            $("#puzTitle").html(puzzle.title);
            $("#puzAuthor").html("by " + puzzle.author);
            $("#puzCopy").html("&copy; " + puzzle.copyright);

            // Create the puzzle dynamically and fill in grid numbers and answers
            var pt = $("#puzTable")[0];
            var n = 0;
            var i;

            var row, thisRow, col, cell, grid, val;

            for (row = 0; row < puzzle.size.rows; row += 1) {
                thisRow = pt.insertRow(row);
                for (col = 0; col < puzzle.size.cols; col += 1) {
                    cell = thisRow.insertCell(col);
                    grid = puzzle.gridnums[n];
                    if (grid === 0) { // 0 means no grid number at this location
                        grid = " ";
                    }
                    val = puzzle.grid[n];
                    if (val === ".") {
                        cell.className = "black";
                    }
                    else {
                        cell.innerHTML = "<div class='grid'>" + grid + "</div>" + "<div class='letter'>" + val + "</div>";
                        if (puzzle.circles && puzzle.circles[n] === 1) {
                            cell.className = puzzle.shadecircles ? "shade" : "circle";
                        }
                    }
                    n += 1;
                }
            }

            if (puzzle.notepad) {
                $("#puzNotepad").show().html("<b>Notepad:</b> " + puzzle.notepad);
                var w = document.getElementById("puzTable").clientWidth;
                document.getElementById("puzNotepad").style.width = (w - 10) + "px";
            }

            // Fill in clues
            $(".clue").show();

            for (i in puzzle.clues.across) {
                $("#across").append(puzzle.clues.across[i] + "<br>");
            }

            for (i in puzzle.clues.down) {
                $("#down").append(puzzle.clues.down[i] + "<br>");
            }

            $(() => {
                console.log('jQuery is working 2!');
            });
        }
    }, []);
}
