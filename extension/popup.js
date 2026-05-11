document.getElementById("analyzeBtn").addEventListener("click", async () => {

    const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => document.body.innerText.slice(0, 5000)
    }, async (results) => {

        const text = results[0].result;

        const res = await fetch("http://127.0.0.1:8000/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text })
        });

        const data = await res.json();

        document.getElementById("result").innerHTML = `
            <h3>Bias: ${data.bias}</h3>
            <p>Sentiment: ${data.sentiment}</p>
            <p>Confidence: ${data.confidence}%</p>
        `;
    });
});