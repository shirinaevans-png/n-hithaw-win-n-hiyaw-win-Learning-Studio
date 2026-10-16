#!/usr/bin/env python3
"""Minimal GiellaLT/HFST bridge for a separate HTTPS host.
Requires a licensed, compiled lang-crk generator and hfst-lookup installed on host.
Do NOT run this service publicly without HTTPS, authentication/rate limiting and deployment hardening.
"""
import json, os, re, subprocess
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

GENERATOR = os.environ.get('CRK_GENERATOR', '')
HFST = os.environ.get('HFST_LOOKUP', 'hfst-lookup')
ORIGIN = os.environ.get('CREE_SITE_ORIGIN', 'https://shirinaevans-png.github.io')
HOST = os.environ.get('HOST', '127.0.0.1')
PORT = int(os.environ.get('PORT', '8765'))
MAX_SIZE = 2048
ANALYSIS = re.compile(r"^[\w\u00c0-\u024f\u1e00-\u1eff'’+\-]{2,180}$", re.UNICODE)

class Handler(BaseHTTPRequestHandler):
    def headers(self, code, content='application/json'):
        self.send_response(code)
        self.send_header('Content-Type', content+'; charset=utf-8')
        self.send_header('Access-Control-Allow-Origin', ORIGIN)
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS, GET')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Cache-Control','no-store')
        self.end_headers()
    def reply(self, status, payload):
        self.headers(status)
        self.wfile.write(json.dumps(payload, ensure_ascii=False).encode('utf-8'))
    def do_OPTIONS(self):
        self.headers(204)
    def do_GET(self):
        if self.path != '/health':
            return self.reply(404, {'error':'Not found'})
        ready = bool(GENERATOR and os.path.isfile(GENERATOR) and os.access(GENERATOR,os.R_OK))
        return self.reply(200, {'model':'GiellaLT lang-crk','dialect':'plains', 'ready':ready})
    def do_POST(self):
        if self.path != '/generate':
            return self.reply(404, {'error':'Not found'})
        try:
            size = int(self.headers.get('Content-Length','0'))
            if not 1 <= size <= MAX_SIZE: return self.reply(413, {'error':'Invalid request size'})
            args=json.loads(self.rfile.read(size))
            analysis=str(args.get('analysis','')).strip()
            if args.get('dialect')!='plains' or not ANALYSIS.fullmatch(analysis):
                return self.reply(400, {'error':'Expected valid Plains Cree lemma+grammatical tags; Woodland is unsupported'})
            if not GENERATOR or not os.path.isfile(GENERATOR):
                return self.reply(503,{'error':'Compiled Plains Cree generator is not installed on this service'})
            try:
                p=subprocess.run([HFST,'-q',GENERATOR],input=analysis+'\n',text=True,capture_output=True,timeout=8,check=False)
            except (FileNotFoundError, subprocess.TimeoutExpired) as exc:
                return self.reply(503,{'error':'HFST runtime unavailable or timed out'})
            if p.returncode!=0: return self.reply(502,{'error':'HFST lookup failed'})
            forms=[]
            for line in p.stdout.splitlines():
                bits=line.split('\t')
                if len(bits)>1 and bits[1] and bits[1]!='+?' and bits[1] not in forms:
                    forms.append(bits[1])
            self.reply(200,{'dialect':'plains','analysis':analysis,'forms':forms[:30], 'model':'GiellaLT lang-crk (compiled HFST)', 'caution':'Experimental model output; verify with Cree speakers and published paradigms.'})
        except (ValueError,UnicodeDecodeError): self.reply(400,{'error':'Invalid JSON'})

if __name__=='__main__':
    print(f'GiellaLT bridge on http://{HOST}:{PORT}; model installed: {bool(GENERATOR and os.path.isfile(GENERATOR))}',flush=True)
    ThreadingHTTPServer((HOST,PORT),Handler).serve_forever()
