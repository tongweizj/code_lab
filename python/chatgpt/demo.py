import openai
# 将YOUR_API_KEY替换为您的API密钥
openai.api_key = "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"

# 读取新闻报道文件
with open("sample.txt", "r") as f:
    news_text = f.read()

# 调用ChatGPT API生成报告
response = openai.Completion.create(
    engine="davinci",
    prompt=(f"根据这篇文章，生成一份总结：\n\n{news_text}\n\n以下是总结内容：\n\n"),
    temperature=0.5,
    max_tokens=2048,
    n=1,
    stop=None
)

# 将生成的报告写入文件
with open("report.txt", "w") as f:
    f.write(response.choices[0].text)
