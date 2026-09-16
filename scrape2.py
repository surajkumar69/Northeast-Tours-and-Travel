import urllib.request
from bs4 import BeautifulSoup

url = "https://www.thedivinetravel.com/package/details/38"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    soup = BeautifulSoup(html, 'html.parser')
    
    # print main text to understand structure
    print(soup.get_text()[:3000].strip())
except Exception as e:
    print(e)
