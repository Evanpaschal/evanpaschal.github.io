function redactText() {
    const originalText = document.getElementById("originalText").value;
    const wordsToRedact = document
      .getElementById("wordsToRedact")
      .value.split(" ");
    const replacementChar = document.getElementById("replacementChar").value;
  
    if (replacementChar === "") {
      alert("Please specify a replacement character.");
      return;
    }
  
    const redactedText = redactWords(
      originalText,
      wordsToRedact,
      replacementChar
    );
  
    document.getElementById("result").textContent = redactedText;
  
    const stats = calculateStats(originalText, redactedText, wordsToRedact);
    displayStats(stats);
  }
  
  function redactWords(text, wordsToRedact, replacement) {
    wordsToRedact.forEach((word) => {
      const regex = new RegExp(`\\b${word}\\b`, "gi");
      text = text.replace(regex, replacement.repeat(word.length));
    });
    return text;
  }
  
  function calculateStats(originalText, redactedText, wordsToRedact) {
    const wordsScanned = originalText.split(/\s+/).length;
    const wordsRedacted = wordsToRedact.length;
    const charactersRedacted = redactedText.length - originalText.length;
    const timeTaken = new Date() - startTime;
  
    return {
      wordsScanned,
      wordsRedacted,
      charactersRedacted,
      timeTaken: (timeTaken / 1000).toFixed(2)
    };
  }
  
  function displayStats(stats) {
    const statsElement = document.getElementById("stats");
    statsElement.innerHTML = `Words Scanned: ${stats.wordsScanned}<br>
                            Words Redacted: ${stats.wordsRedacted}<br>
                            Characters Redacted: ${stats.charactersRedacted}<br>
                            Time Taken: ${stats.timeTaken} seconds`;
  }
  
  let startTime;
  document.getElementById("redactButton").addEventListener("click", () => {
    startTime = new Date();
    redactText();
  });
  