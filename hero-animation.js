// Hero Typing Animation
(function() {
  const statusData = [
    { symbol: "✽", message: "Doodling..." },
    { symbol: "◐", message: "Thinking..." },
    { symbol: "◑", message: "Processing..." },
    { symbol: "◒", message: "Computing..." },
    { symbol: "◓", message: "Analyzing..." },
    { symbol: "●", message: "Synthesizing..." },
    { symbol: "◯", message: "Optimizing..." },
    { symbol: "◈", message: "Debugging..." },
    { symbol: "◇", message: "Refactoring..." },
    { symbol: "◆", message: "Compiling..." },
    { symbol: "▲", message: "Iterating..." },
    { symbol: "▼", message: "Innovating..." }
  ];
  
  const words = [
    "Chaos into Automation",
    "Ideas into Infrastructure",
    "Code into Production",
    "Manual into Automated",
    "Complexity into Simplicity",
    "Problems into Solutions",
    "Downtime into Uptime",
    "Costs into Savings"
  ];
  
  const statusSymbol = document.getElementById('hero-status-symbol');
  const statusText = document.getElementById('hero-status-text');
  const typedWord = document.getElementById('hero-typed-word');
  
  if (statusSymbol && statusText && typedWord) {
    let currentWordIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    
    typedWord.innerHTML = '&nbsp;';
    
    function typeWriter() {
      const currentWord = words[currentWordIndex];
      
      if (!isDeleting) {
        if (currentCharIndex < currentWord.length) {
          typedWord.innerHTML = currentWord.substring(0, currentCharIndex + 1) || '&nbsp;';
          currentCharIndex++;
          setTimeout(typeWriter, 80);
        } else {
          setTimeout(() => {
            isDeleting = true;
            typeWriter();
          }, 2500);
        }
      } else {
        if (currentCharIndex > 0) {
          typedWord.innerHTML = currentWord.substring(0, currentCharIndex - 1) || '&nbsp;';
          currentCharIndex--;
          setTimeout(typeWriter, 40);
        } else {
          isDeleting = false;
          currentWordIndex = (currentWordIndex + 1) % words.length;
          const messageIndex = currentWordIndex % statusData.length;
          statusSymbol.textContent = statusData[messageIndex].symbol;
          statusText.textContent = statusData[messageIndex].message;
          setTimeout(typeWriter, 500);
        }
      }
    }
    
    setTimeout(typeWriter, 1000);
  }
})();
