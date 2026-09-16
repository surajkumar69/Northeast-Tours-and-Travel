import urllib.request
import json
import urllib.parse

def search_wikimedia(query):
    url = f"https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch={urllib.parse.quote(query)}&gsrnamespace=6&gsrlimit=5&prop=imageinfo&iiprop=url&format=json"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    response = urllib.request.urlopen(req)
    data = json.loads(response.read().decode('utf-8'))
    
    urls = []
    if 'query' in data and 'pages' in data['query']:
        pages = data['query']['pages']
        for page_id in pages:
            if 'imageinfo' in pages[page_id]:
                img_url = pages[page_id]['imageinfo'][0]['url']
                urls.append(img_url)
    return urls

print("Kaziranga:")
print(search_wikimedia('Kaziranga National Park rhino'))

print("Arunachal:")
print(search_wikimedia('Tawang Monastery Arunachal'))
