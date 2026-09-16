import urllib.request

urls = [
    'https://images.unsplash.com/photo-1616012480717-fd9867059ca0?q=80&w=2670&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1596788067883-9114f17f4611?q=80&w=2670&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1587399881881-8b0653d4c3f5?q=80&w=2670&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1611082260714-f06b47c0b0ee?q=80&w=2670&auto=format&fit=crop'
]

for url in urls:
    try:
        urllib.request.urlopen(url)
        print("OK: " + url)
    except Exception as e:
        print("FAIL: " + url + " - " + str(e))

