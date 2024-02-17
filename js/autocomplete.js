;(function () {
    function start() {
        answerQuestion()
        // Decide whether to go to next question, start next round, or quit the game
        setTimeout(() => {
            const totalPoints =
                document.getElementsByClassName("total_points")[0]
            console.log("Total points: ", totalPoints.innerText)
            if (totalPoints.innerText >= 200) {
                document.getElementsByClassName("quitgame")[0].click()
                return
            } else if (totalPoints.innerText !== "") {
                document.getElementsByClassName("play_again")[0].click()
                totalPoints.innerText = ""
                setTimeout(start, 2000)
            } else start()
        }, 4200)
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "a" && e.metaKey && e.ctrlKey) {
            document.getElementsByClassName("blue button start_game")[0].click() // Start the game
            setTimeout(start, 2000) // Call for first time to start the loop
        }
    })

    let transcript = ""

    // Get transcript
    for (let i = 0; i < document.getElementsByTagName("script").length; i++) {
        document
            .getElementsByTagName("script")
            [i].innerText.includes("var captions") && // If the scipt contains the transcript, continue
            JSON.parse(
                document
                    .getElementsByTagName("script")
                    [i].innerText.split("\t")[3]
                    .split("var captions = $.extend(")
                    .join("")
                    .split(", PlayerCommon.Mixins.Captions),\n")
                    .join("")
                    .replace(/(\r\n|\n|\r)/gm, "")
            ).forEach((item) =>
                item.transcript_words.forEach(
                    (word_obj) => (transcript += word_obj.word + " ")
                )
            )
    }

    function answerQuestion() {
        let words = document.getElementsByClassName("question")[0].children

        let options =
            document.getElementsByClassName("choice_buttons")[0].children

        let underlineIndex
        let correctAnswerIndex

        // Get index of the underline in the question div
        for (let i = 0; i < words.length; i++)
            if (words[i].classList.contains("underline")) underlineIndex = i

        // If the underline is not the first word
        if (underlineIndex !== 0) {
            let wordsBeforeUnderline = ""

            // Find the words before the underline
            for (let i = 0; i < underlineIndex; i++)
                wordsBeforeUnderline += words[i].innerText + " "

            // Find the correct word
            for (let i = 0; i < options.length; i++)
                if (
                    transcript.includes(
                        wordsBeforeUnderline + options[i].innerText + " "
                    )
                )
                    correctAnswerIndex = i
        } else {
            // If the underline is the first word
            let wordsAfterUnderline = ""

            // Find the words after the underline
            for (let i = 1; i < words.length; i++)
                wordsAfterUnderline += words[i].innerText
            // Find the correct word
            for (let i = 0; i < options.length; i++)
                if (
                    transcript.includes(
                        " " + options[i].innerText + wordsAfterUnderline
                    )
                )
                    correctAnswerIndex = i
        }

        // Select the correct option
        options[correctAnswerIndex].click()
    }
})()
