import trafilatura
from newspaper import Article


def extract_article_text(url: str):
    try:
        downloaded = trafilatura.fetch_url(url)

        if downloaded:
            text = trafilatura.extract(downloaded)
            if text and len(text.split()) > 100:
                return text[:5000]

        # 🔁 fallback to newspaper3k
        article = Article(url)
        article.download()
        article.parse()

        return article.text[:5000]

    except Exception as e:
        print("Scraper error:", e)
        return ""