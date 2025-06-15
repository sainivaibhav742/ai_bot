import os
from gtts import gTTS
from profanity_filter import ProfanityFilter

pf = ProfanityFilter()

def censor_text(text):
    return pf.censor(text)

def generate_tts(text, lang='en'):
    tts = gTTS(text=text, lang=lang)
    filename = f"audio_{abs(hash(text))}.mp3"
    filepath = os.path.join("audio", filename)
    tts.save(filepath)
    return filename
