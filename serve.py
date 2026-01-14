import http.server
import socketserver
import os

PORT = 8000

class CleanURLHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Remove trailing slash for comparison
        path = self.path.split('?')[0].split('#')[0]
        
        # If path is just /en/ or /ru/ or /, serve index.html from that dir
        if path.endswith('/'):
            return super().do_GET()
            
        # Check if the path exists as is
        full_path = self.translate_path(self.path)
        if os.path.exists(full_path):
            return super().do_GET()
            
        # Try appending .html
        if not path.endswith('.html'):
            html_path = full_path + '.html'
            if os.path.exists(html_path):
                self.path += '.html'
                return super().do_GET()
                
        return super().do_GET()

print(f"Serving at http://localhost:{PORT}")
print("Clean URLs enabled (e.g., /hakkimizda will serve hakkimizda.html)")

with socketserver.TCPServer(("", PORT), CleanURLHandler) as httpd:
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
