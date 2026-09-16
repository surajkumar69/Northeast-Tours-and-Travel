import urllib.request
from bs4 import BeautifulSoup
import re

url = "https://www.thedivinetravel.com/package/details/38"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    soup = BeautifulSoup(html, 'html.parser')
    
    # Just print elements containing 'Day'
    for tag in soup.find_all(['h3', 'h4', 'h5', 'strong', 'b', 'button', 'span']):
        text = tag.get_text().strip()
        if re.search(r'Day\s*\d+', text, re.IGNORECASE):
            parent = tag.find_parent('div')
            if parent:
                print("---")
                print(parent.get_text(separator='\n', strip=True).encode('ascii', 'ignore').decode('ascii')[:500])
except Exception as e:
    print(e)
