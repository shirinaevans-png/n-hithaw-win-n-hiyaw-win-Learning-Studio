#!/usr/bin/env python3
"""Insert a Woods Cree learning card beside existing How Cree Words Work card.
Does not remove or overwrite any existing homepage card or page.
Run from a copy of the existing website directory. No third-party packages needed.
"""
from pathlib import Path
from html.parser import HTMLParser
import re,sys,shutil
class Anchors(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True);self.rows=[];self.stack=[];self.pos=0
    def handle_starttag(self,tag,attrs):
        raw=self.get_starttag_text()
        if tag.lower()=='a':
            self.stack.append({'start':self.pos,'text':'','attrs':dict(attrs),'open':raw})
        self.pos += len(raw) if False else 0  # positional spans are computed separately below
    def handle_data(self,data):
        for item in self.stack:item['text']+=data
    def handle_endtag(self,tag):
        if tag.lower()=='a' and self.stack:self.rows.append(self.stack.pop())

def patch_index(path):
    original=path.read_text(encoding='utf-8-sig')
    target='how-woodland-cree-words-work.html'
    if target in original: return 'Already present, nothing changed.'
    # Reuse the exact opening tag and surrounding class styling of the existing nav link.
    # This avoids reformatting index.html and preserves other cards.
    pattern=re.compile(r'<a\b(?P<attrs>[^>]*?)>(?P<body>(?:(?!</a\s*>).)*?)</a\s*>',re.I|re.S)
    found=None
    for m in pattern.finditer(original):
        text=re.sub(r'<[^>]+>',' ',m.group('body'))
        text=re.sub(r'\s+',' ',text).strip().lower()
        if 'how cree words work' in text:
            found=m;break
    if found is None:
        # fallback: insert an accessible styled link immediately before closing nav/main/body
        card='\n<a href="'+target+'" style="display:inline-flex;align-items:center;justify-content:center;min-height:112px;padding:22px;border-radius:15px;border:1px solid #dae2dd;background:#fff;color:#203f36;font-weight:700;text-align:center;text-decoration:none;">How Woodland Cree Words Work</a>\n'
        match=re.search(r'</(?:nav|main|body)\s*>',original,re.I)
        if not match: raise RuntimeError('Cannot find a safe homepage insertion point')
        insert_at=match.start()
    else:
        attrs=found.group('attrs')
        attrs=re.sub(r'\bhref\s*=\s*([\"\']).*?\1','href="'+target+'"',attrs,count=1,flags=re.I|re.S)
        if not re.search(r'\bhref\s*=',attrs,re.I):attrs=' href="'+target+'"'+attrs
        # Mirror class and structure, replace only label text: retain classes for homepage grid styling.
        body=found.group('body')
        body=re.sub(r'How\s+Cree\s+Words\s+Work(?:\s*[·•-]\s*Interactive)?','How Woodland Cree Words Work',body,count=1,flags=re.I)
        if 'Woodland' not in body:body='How Woodland Cree Words Work'
        card='\n<a'+attrs+'>'+body+'</a>'
        insert_at=found.end()
    backup=path.with_suffix('.html.before-woodland-cree-backup')
    if not backup.exists():shutil.copy2(path,backup)
    path.write_text(original[:insert_at]+card+original[insert_at:],encoding='utf-8')
    return 'Added homepage button. Backup: '+backup.name

if __name__=='__main__':
    here=Path(__file__).resolve().parent
    # User runs from the original repository folder, with these 3 files copied there.
    index=here/'index.html'
    if not index.exists():
        print('The original index.html is not in this folder. Copy the three supplied files into the same folder as your existing index.html, then run this script.')
        sys.exit(1)
    print(patch_index(index))
