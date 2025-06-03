from flask import Flask, jsonify
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

def scrape_snapdeal():
    url = "https://www.snapdeal.com/search?keyword=earbuds"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    
    deals = []
    products = soup.find_all("div", {"class": "product-tuple-listing"})
    for product in products[:10]:  # limiting to 10 items for speed
        name = product.find("p", class_="product-title").text.strip() if product.find("p", class_="product-title") else "N/A"
        price = product.find("span", class_="product-price").text.strip() if product.find("span", class_="product-price") else "N/A"
        link_tag = product.find("a", class_="dp-widget-link")
        url = link_tag['href'] if link_tag else "N/A"

        deals.append({
            "platform": "Snapdeal",
            "name": name,
            "price": price,
            "url": url
        })
    return deals

@app.route('/deals')
def get_deals():
    snapdeal_deals = scrape_snapdeal()
    # You can add other platforms scrapers here similarly
    return jsonify(snapdeal_deals)

if __name__ == "__main__":
    app.run(debug=True)
