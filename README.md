# Yabla Complete

> BY USING THIS EXTENSION, YOU ARE AGREEING THAT I AM NOT TO BE HELD ACCOUNTABLE FOR ANY TROUBLE CAUSED FOR YOU BY YOUR MISUSE OF THIS EXTENSION. IF YOU DO NOT AGREE, DO NOT PROCEED TO DOWNLOAD THIS EXTENSION.

### Installation

1. Download the zip file by clicking, `Code` at the top, and clicking, `Download ZIP`.
2. Unzip the downloaded file.
3. Go to `chrome://extensions` in the URL bar.
4. Check the developer mode option, or skip if it is already enabled.
5. Select, "Load unpacked", and select the directory of the unzipped folder.

## How to Use for Multiple Choice

Go to a Yabla video player page. The URL should look something similar to `https://<your lang>.yabla.com/multiple_choice.php<metadata>`.

Press `Command` + `Ctrl` + `A` to trigger active mode. This will keep automatically answering questions until the score reaches 200 points or more. If the limit for you is lower, you may press, "Quit game", in the top right after a round has been completed. If the limit is higher, you will have to trigger active mode for every new round that you start, as the extension will quit the game after completing ONE round. If you wish to configure the limit manually, you will have to open the developer tools. This can be done by right-clicking anywhere on the page, and clicking `Inspect`. Go to the `Console`, and type `mclimit = <your limit>`, and press enter. Now you can start the game via the shortcut and it will quit when it reaches the limit.

## How to Use for Fill in the Blank

Go to a Yabla video player page. The URL should look something similar to `https://<your lang>.yabla.com/fill_in_the_blank.php<metadata>`.

Press `Command` + `Ctrl` + `Z` to trigger active mode. This will keep automatically filling in the correct answer to the input field until the score reaches 100 points or more. If the limit for you is lower, you may press, "Quit game", in the top right after a round has been completed. If the limit is higher, you will have to ttrigger active mode for every new round that you start, as the extension will quit the game after completing ONE round. If you wish to configure the limit manually, you will have to open the developer tools. This can be done by right-clicking anywhere on the page, and clicking `Inspect`. Go to the `Console`, and type `fitblimit = <your limit>`, and press enter. Now you can start the game via the shortcut and it will quit when it reaches the limit.

## Notes
* If you start the game by manually selecting the "Start game" button, it will be on normal mode.
* Be careful, and do not click anything besides the "Quit game" button in the top right, or you may cause the extension to crash. If this does happen, simply go to your yabla assignments panel, and select the video again.
* Autocompletion may not work on some videos or may require you to refresh the page and trigger active mode again. If the game is going smoothly, and it stopped answer all of a sudden, there may be an internal error. You can fix this by refreshing the page and triggering active mode again.