import re
import spacy

nlp = spacy.load("en_core_web_sm")


def extract_entities(text: str):
    doc = nlp(text)

    entities = []
    seen = set()

    ignore = {
        "preceded",
        "succeeded",
        "website",
        "signature",
        "party",
        "children",
        "parents",
        "relatives",
        "personal details",
        "44th",
        "january 20, 2009",
        "january 20, 2017",
    }

    for ent in doc.ents:
        value = ent.text.strip()

        value = re.sub(r'\s+', ' ', value)

        words = value.split()

        if len(words) >= 2 and words[: len(words)//2] == words[len(words)//2 :]:
            value = " ".join(words[: len(words)//2])

        if len(value) < 3:
            continue

        if value.lower() in ignore:
            continue

        if value.lower() in seen:
            continue

        seen.add(value.lower())
        entities.append(value)

    return entities[:10] 