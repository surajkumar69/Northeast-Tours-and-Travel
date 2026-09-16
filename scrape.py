import urllib.request
import re

url = "https://www.thedivinetravel.com/package/details/38"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    print(len(html))
    print(html[html.find('tour-details-section'):html.find('tour-details-section')+2000])
except Exception as e:
    print(e)
