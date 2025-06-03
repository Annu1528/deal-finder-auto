import requests
from bs4 import BeautifulSoup

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
}

def scrape_amazon(query="laptop"):
    url = f"https://www.amazon.in/s?k={query.replace(' ', '+')}"
    res = requests.get(url, headers=HEADERS)
    soup = BeautifulSoup(res.text, 'html.parser')
    products = []

    for div in soup.find_all('div', {'data-component-type': 's-search-result'}):
        try:
            name = div.h2.text.strip()
            link = 'https://www.amazon.in' + div.h2.a['href']
            price = div.find('span', 'a-price-whole')
            price = price.text if price else 'N/A'

            products.append({'platform': 'Amazon', 'name': name, 'price': price, 'url': link})
        except Exception:
            continue

    return products


def scrape_flipkart(query="laptop"):
    url = f"https://www.flipkart.com/search?q={query.replace(' ', '+')}"
    res = requests.get(url, headers=HEADERS)
    soup = BeautifulSoup(res.text, 'html.parser')
    products = []

    for div in soup.find_all('a', {'class': '_1fQZEK'}):  # Flipkart product cards
        try:
            name = div.find('div', {'class': '_4rR01T'}).text
            price = div.find('div', {'class': '_30jeq3 _1_WHN1'}).text
            link = 'https://www.flipkart.com' + div['href']

            products.append({'platform': 'Flipkart', 'name': name, 'price': price, 'url': link})
        except Exception:
            continue

    return products


def scrape_myntra(query="tshirt"):
    url = f"https://www.myntra.com/{query.replace(' ', '-')}"
    res = requests.get(url, headers=HEADERS)
    soup = BeautifulSoup(res.text, 'html.parser')
    products = []

    for li in soup.find_all('li', {'class': 'product-base'}):
        try:
            name = li.find('h4', {'class': 'product-product'}).text.strip()
            price = li.find('div', {'class': 'product-price'}).find('span').text.strip()
            link = 'https://www.myntra.com' + li.find('a')['href']

            products.append({'platform': 'Myntra', 'name': name, 'price': price, 'url': link})
        except Exception:
            continue

    return products


def scrape_snapdeal(query="headphones"):
    url = f"https://www.snapdeal.com/search?keyword={query.replace(' ', '+')}"
    res = requests.get(url, headers=HEADERS)
    soup = BeautifulSoup(res.text, 'html.parser')
    products = []

    for div in soup.find_all('div', {'class': 'product-tuple-description'}):
        try:
            name = div.find('p', {'class': 'product-title'}).text.strip()
            price = div.find('span', {'class': 'lfloat product-price'}).text.strip()
            link = div.find('a')['href']

            products.append({'platform': 'Snapdeal', 'name': name, 'price': price, 'url': link})
        except Exception:
            continue

    return products


if __name__ == "__main__":
    # You can customize the query below or take from user input
    queries = {
        'Amazon': 'laptop',
        'Flipkart': 'laptop',
        'Myntra': 'tshirt',
        'Snapdeal': 'headphones'
    }

    all_products = []
    all_products.extend(scrape_amazon(queries['Amazon']))
    all_products.extend(scrape_flipkart(queries['Flipkart']))
    all_products.extend(scrape_myntra(queries['Myntra']))
    all_products.extend(scrape_snapdeal(queries['Snapdeal']))

    for product in all_products:
        print(product)

import json

all_deals = []

# Instead of printing each deal, append it
# Example, inside your scraping loop:
# all_deals.append({
#     'platform': 'Snapdeal',
#     'name': product_name,
#     'price': product_price,
#     'url': product_url
# })

# After scraping is done:
with open('deals.json', 'w', encoding='utf-8') as f:
    json.dump(all_deals, f, ensure_ascii=False, indent=4)
