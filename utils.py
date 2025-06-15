from better_profanity import profanity

# Initialize the censor
profanity.load_censor_words()

def censor_text(text):
    return profanity.censor(text)

def generate_tts(text, output_path='static/tts_output.mp3'):
    from gtts import gTTS
    tts = gTTS(text)
    tts.save(output_path)
    return output_path
