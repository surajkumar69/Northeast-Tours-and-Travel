import urllib.request
from bs4 import BeautifulSoup

url = "https://www.thedivinetravel.com/package/details/38"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    soup = BeautifulSoup(html, 'html.parser')
    
    text = soup.get_text(separator='\n', strip=True)
    text = text.encode('ascii', 'ignore').decode('ascii')
    
    with open('divine_travel.txt', 'w', encoding='utf-8') as f:
        f.write(text)
    print("Saved to divine_travel.txt")
except Exception as e:
    print(e)
