import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize, sent_tokenize
from nltk.stem import PorterStemmer

# Function to preprocess the text
stop_words = {}


def preprocess_text(text):
    stop_words = set(stopwords.words('english'))

    ps = PorterStemmer()
    words = word_tokenize(text)
    words = [word.lower() for word in words if word.isalpha()
             and word.lower() not in stop_words]
    stemmed_words = [ps.stem(word) for word in words]
    return ' '.join(stemmed_words)

# Function to generate summary


def generate_summary(text, num_sentences=3):
    stop_words = set(stopwords.words('english'))
    sentences = sent_tokenize(text)
    cleaned_text = preprocess_text(text)
    cleaned_sentences = sent_tokenize(cleaned_text)
    word_frequencies = {}

    for word in nltk.word_tokenize(cleaned_text):
        if word not in stop_words:
            if word not in word_frequencies:
                word_frequencies[word] = 1
            else:
                word_frequencies[word] += 1
    maximum_frequency = max(word_frequencies.values())
    for word in word_frequencies.keys():
        word_frequencies[word] = (word_frequencies[word] / maximum_frequency)
    sentence_scores = {}
    for i, sentence in enumerate(cleaned_sentences):
        for word in nltk.word_tokenize(sentence.lower()):
            if word in word_frequencies.keys():
                if len(sentence.split(' ')) < 30:
                    if i not in sentence_scores.keys():
                        sentence_scores[i] = word_frequencies[word]
                    else:
                        sentence_scores[i] += word_frequencies[word]
    summary_sentences = sorted(
        sentence_scores, key=sentence_scores.get, reverse=True)[:num_sentences]
    print(word_frequencies)
    summary = [sentences[j] for j in summary_sentences]
    return ' '.join(summary)

# Main function to process file and generate summary


def process_file(filename):
    with open(filename, 'r') as file:
        text = file.read()

    summary = generate_summary(text)
    return summary


# Sample usage
filename = "sample.txt"  # Replace with your actual file name
summary = process_file(filename)
print(summary)  # Replace with code to return the summary via the ChatGPT API
