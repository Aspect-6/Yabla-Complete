let mclimit, fitblimit, punctuation
;(function () {
    if (
        location.pathname !== "/multiple_choice.php" &&
        location.pathname !== "/fill_in_the_blank.php" &&
        location.pathname !== "/player_cdn.php"
    )
        return

    function start(type) {
        // Start the game
        ;(type === "mc" && selectAnswer()) || (type === "fitb" && fillInBlank())
        // Decide whether to go to next question, start next round, or quit the game
        setTimeout(() => {
            const totalPoints =
                document.getElementsByClassName("total_points")[0]
            const allTimePoints = document
                .getElementsByClassName("score_history_link")[0]
                .innerText.split(" ")[0]

            if (
                totalPoints.innerText !== "" &&
                ((type === "mc" &&
                    allTimePoints >= (mclimit ? mclimit : 200)) ||
                    (type === "fitb" &&
                        allTimePoints >= (fitblimit ? fitblimit : 100)))
            ) {
                document.getElementsByClassName("quitgame")[0].click()
                return
            }
            if (totalPoints.innerText !== "") {
                document.getElementsByClassName("play_again")[0].click()
                totalPoints.innerText = ""
                setTimeout(
                    () =>
                        (type === "mc" && start("mc")) ||
                        (type === "fitb" && start("fitb")),
                    2000
                )
                return
            }
            type === "mc" ? start("mc") : start("fitb")
        }, 4200)
    }

    document.addEventListener("keydown", (e) => {
        if (
            e.key === "a" &&
            e.metaKey &&
            e.ctrlKey &&
            location.pathname === "/multiple_choice.php"
        ) {
            document.getElementsByClassName("blue button start_game")[0].click() // Start the game
            setTimeout(() => start("mc"), 2000) // Call for first time to start the loop
        }
        if (
            e.key === "z" &&
            e.metaKey &&
            e.ctrlKey &&
            location.pathname === "/fill_in_the_blank.php"
        ) {
            document.getElementsByClassName("blue button start_game")[0].click() // Start the game
            setTimeout(() => start("fitb"), 2000) // Call for first time to start the loop
        }
        if (
            e.key === "x" &&
            e.metaKey &&
            e.ctrlKey &&
            (location.pathname === "/multiple_choice.php" ||
                location.pathname === "/fill_in_the_blank.php" ||
                location.pathname === "/player_cdn.php")
        ) {
            downloadTranscript(
                `${location.host.charAt(0).toUpperCase()}${location.host
                    .split(".")[0]
                    .slice(1)} - ${document
                    .getElementById("episode_name")
                    .innerText.trim()} transcript.txt`
            )
        }
    })

    function generateTranscript() {
        return location.pathname === "/player_cdn.php"
            ? punctuation
                ? CAPTIONS.map((item) => item.transcript).join(" ")
                : CAPTIONS.map((item) =>
                      item.transcript_words.map(({ word }) => word)
                  )
                      .map((arr) => arr.join(" "))
                      .join(" ")
            : Array.from(document.getElementsByTagName("script"))
                  .map(
                      (script) =>
                          script.innerText.includes("var captions") &&
                          JSON.parse(
                              script.innerText
                                  .split("\t")[3]
                                  .split("var captions = $.extend(")
                                  .join("")
                                  .split(", PlayerCommon.Mixins.Captions),\n")
                                  .join("")
                                  .replace(/(\r\n|\n|\r)/gm, "")
                          )
                  )
                  .filter((item) => item)[0]
                  .map((item) => item.transcript_words.map(({ word }) => word))
                  .map((arr) => arr.join(" "))
                  .join(" ")
    }
    function selectAnswer() {
        const transcript = generateTranscript()

        let words = document.getElementsByClassName("question")[0].children

        let options =
            document.getElementsByClassName("choice_buttons")[0].children

        let underlineIndex, correctAnswerIndex

        // Get index of the underline in the question div
        for (let i = 0; i < words.length; i++)
            if (words[i].classList.contains("underline")) underlineIndex = i

        // If the underline is the first word
        if (underlineIndex === 0) {
            let wordsAfterUnderline = ""

            // Find the words after the underline
            for (let i = 1; i < words.length; i++)
                wordsAfterUnderline += `${words[i].innerText} `
            // Find the correct word
            Array.from(options).forEach((option, i) => {
                transcript.includes(
                    `${option.innerText} ${wordsAfterUnderline}`
                ) && (correctAnswerIndex = i)
            })
        } else {
            let wordsBeforeUnderline = ""

            // Find the words before the underline
            for (let i = 0; i < underlineIndex; i++)
                wordsBeforeUnderline += `${words[i].innerText} `

            // Find the correct word
            Array.from(options).forEach((option, i) => {
                transcript.includes(
                    `${wordsBeforeUnderline}${option.innerText}`
                ) && (correctAnswerIndex = i)
            })
        }

        // Select the correct option
        options[correctAnswerIndex].click()
    }
    function fillInBlank() {
        const transcript = generateTranscript()

        let words = document.getElementsByClassName("question")[0].children

        let inputIndex, correctAnswer

        // Get index of the input in the question div
        for (let i = 0; i < words.length; i++)
            if (words[i].classList.contains("underline")) inputIndex = i

        // If the input is the first word
        if (inputIndex === 0) {
            let wordsAfterInput = ""

            // Find the words after the underline
            for (let i = 1; i < words.length; i++)
                wordsAfterInput += `${words[i].innerText} `

            // Find the correct word
            correctAnswer = transcript.match(
                new RegExp(
                    "(\\p{L}+)(?=\\s" + wordsAfterInput.trim() + "\\b)",
                    "gui"
                )
            )[0]
        } else {
            let wordsBeforeInput = ""

            // Find the words before the underline
            for (let i = 0; i < inputIndex; i++)
                wordsBeforeInput += `${words[i].innerText} `

            // Find the correct word
            correctAnswer = transcript.match(
                new RegExp(
                    "(?<=\\b" + wordsBeforeInput.trim() + "\\s)(\\p{L}+)",
                    "gui"
                )
            )[0]
        }

        // Submit the answer
        document.getElementsByClassName("answer")[0].value = correctAnswer
        document.getElementById("submit_answer").click()
        setTimeout(() => {
            document.getElementsByClassName("next")[0].click()
        }, 2000)
    }
    function downloadTranscript(filename) {
        const blob = new Blob([generateTranscript()], { type: "text/plain" })
        const url = URL.createObjectURL(blob)

        // Create temporary <a> element
        const a = document.createElement("a")
        a.href = url
        a.download = filename

        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }
})()
