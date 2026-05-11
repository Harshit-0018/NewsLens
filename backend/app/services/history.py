from datetime import datetime

history_store = []


def add_history(item):
    history_store.insert(0, {
        **item,
        "timestamp": datetime.now().strftime("%d %b %Y, %I:%M %p")
    })

    if len(history_store) > 20:
        history_store.pop()


def get_history():
    return history_store