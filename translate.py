from http.server import BaseHTTPRequestHandler, HTTPServer
import json
import argostranslate.translate


class TranslationHandler(BaseHTTPRequestHandler):

    def send_json(self, status_code, data):
        response = json.dumps(data, ensure_ascii=False).encode("utf-8")

        self.send_response(status_code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(response)))
        self.end_headers()

        self.wfile.write(response)

    def do_POST(self):

        if self.path != "/translate":
            self.send_json(404, {
                "error": "Endpoint not found."
            })
            return

        try:
            content_length = int(
                self.headers.get("Content-Length", 0)
            )

            body = self.rfile.read(content_length)
            data = json.loads(body)

            text = data.get("text", "").strip()
            source = data.get("source")
            target = data.get("target")

            if not text or not source or not target:
                self.send_json(400, {
                    "error": "Text, source language and target language are required."
                })
                return

            if source == target:
                self.send_json(200, {
                    "translatedText": text
                })
                return

            translated_text = argostranslate.translate.translate(
                text,
                source,
                target
            )

            self.send_json(200, {
                "translatedText": translated_text
            })

        except Exception as error:

            print("Translation error:", error)

            self.send_json(500, {
                "error": str(error)
            })

    def log_message(self, format, *args):
        return


server = HTTPServer(
    ("127.0.0.1", 5001),
    TranslationHandler
)

print("Python translation service running at http://127.0.0.1:5001")

server.serve_forever()