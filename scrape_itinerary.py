import urllib.request
from bs4 import BeautifulSoup

url = "https://www.thedivinetravel.com/package/details/38"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    soup = BeautifulSoup(html, 'html.parser')
    
    # Find itinerary items
    items = soup.find_all(lambda tag: tag.name == 'div' and tag.has_attr('class') and 'accordion' in str(tag.get('class')))
    for item in items:
        text = item.get_text(separator=' ', strip=True).encode('ascii', 'ignore').decode('ascii')
        if 'Day' in text:
            print(text[:200])
except Exception as e:
    print(e)
