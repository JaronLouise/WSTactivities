const textInput = document.getElementById('textInput');
const wordCount = document.getElementById('wordCount');
const sentenceCount = document.getElementById('sentenceCount');

function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

function updateCounts() {
  const text = textInput.value.trim();
  
  const words = text === '' ? 0 : text
    .split(/\s+/)
    .filter(word => /\w/.test(word)) 
    .length;

  const sentences = text === '' ? 0 : text
    .split(/(?<=[.!?])\s+/) 
    .filter(sentence => sentence.trim().length > 0)
    .length;

  wordCount.textContent = words || '---';
  sentenceCount.textContent = sentences || '---';
}

textInput.addEventListener('input', debounce(updateCounts, 300));
