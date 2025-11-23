const form = document.getElementById("scriptForm");
const outputDiv = document.getElementById("output");
const loadingDiv = document.getElementById("loading");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const topic = document.getElementById("topic").value.trim();
  const tone = document.querySelector('input[name="tone"]:checked').value;

  if (!topic) return;

  outputDiv.textContent = "";
  loadingDiv.classList.remove("hidden");

  try {
    const response = await fetch("/.netlify/functions/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, tone })
    });

    const data = await response.json();
    loadingDiv.classList.add("hidden");

    if (data.script) {
      typeEffect(data.script);
    } else {
      outputDiv.textContent = "❌ Error: " + (data.error || "Unknown error");
    }
  } catch (err) {
    loadingDiv.classList.add("hidden");
    outputDiv.textContent = "❌ Request failed: " + err.message;
  }
});

function typeEffect(text) {
  let index = 0;
  outputDiv.textContent = "";
  const interval = setInterval(() => {
    if (index < text.length) {
      outputDiv.textContent += text.charAt(index);
      index++;
      outputDiv.scrollTop = outputDiv.scrollHeight;
    } else {
      clearInterval(interval);
    }
  }, 20);
}
