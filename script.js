const inputText = document.getElementById("inputText");
const translatedText = document.getElementById("translatedText");

const sourceLanguage = document.getElementById("sourceLanguage");
const targetLanguage = document.getElementById("targetLanguage");

const translateButton = document.getElementById("translateButton");
const copyButton = document.getElementById("copyButton");
const speakButton = document.getElementById("speakButton");
const swapButton = document.getElementById("swapButton");

const characterCount = document.getElementById("characterCount");
const statusMessage = document.getElementById("statusMessage");


// Character counter
inputText.addEventListener("input", () => {
    characterCount.textContent = inputText.value.length;
});


// Swap languages and text
swapButton.addEventListener("click", () => {
    const oldSource = sourceLanguage.value;

    sourceLanguage.value = targetLanguage.value;
    targetLanguage.value = oldSource;

    const oldText = inputText.value;

    inputText.value = translatedText.value;
    translatedText.value = oldText;

    characterCount.textContent = inputText.value.length;
});


// Translate text
translateButton.addEventListener("click", async () => {
    const text = inputText.value.trim();
    const source = sourceLanguage.value;
    const target = targetLanguage.value;

    if (!text) {
        statusMessage.textContent = "Please enter some text to translate.";
        return;
    }

    if (source === target) {
        translatedText.value = text;
        statusMessage.textContent = "Source and target languages are the same.";
        return;
    }

    translateButton.disabled = true;
    translateButton.textContent = "Translating...";
    statusMessage.textContent = "Translating your text...";

    try {
        const response = await fetch("http://localhost:3000/translate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: text,
                source: source,
                target: target
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Translation failed.");
        }

        translatedText.value = data.translatedText;
        statusMessage.textContent = "Translation completed successfully.";

    } catch (error) {
        console.error(error);

        translatedText.value = "";
        statusMessage.textContent =
            "Unable to translate. Please check that the server is running.";

    } finally {
        translateButton.disabled = false;
        translateButton.textContent = "Translate";
    }
});


// Copy translated text
copyButton.addEventListener("click", async () => {
    const text = translatedText.value.trim();

    if (!text) {
        statusMessage.textContent = "There is no translated text to copy.";
        return;
    }

    try {
        await navigator.clipboard.writeText(text);
        statusMessage.textContent = "Translated text copied successfully.";

        setTimeout(() => {
            statusMessage.textContent = "";
        }, 2000);

    } catch (error) {
        statusMessage.textContent = "Unable to copy the text.";
    }
});


// Text-to-speech
speakButton.addEventListener("click", () => {
    const text = translatedText.value.trim();

    if (!text) {
        statusMessage.textContent = "There is no translated text to speak.";
        return;
    }

    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = getSpeechLanguage(targetLanguage.value);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
});


// Speech language mapping
function getSpeechLanguage(language) {
    const languages = {
        en: "en-US",
        hi: "hi-IN",
        es: "es-ES",
        fr: "fr-FR",
        de: "de-DE",
        it: "it-IT",
        pt: "pt-PT",
        ja: "ja-JP",
        ko: "ko-KR",
        zh: "zh-CN"
    };

    return languages[language] || "en-US";
}