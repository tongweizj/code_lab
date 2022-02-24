import csv
import csv
import matplotlib.pyplot as plt
from datetime import datetime

# 更新字符集，解决中文label乱码问题
plt.rcParams['font.sans-serif'] = ['STSong']
plt.style.use('Solarize_Light2')

filename = 'data\\death_valley_2018_simple.csv' 
with open(filename) as f:
    reader = csv.reader(f)
    header_row = next(reader)

    for index, column_header in enumerate(header_row):
        print(index, column_header) 
    
    # 从文件中获取最高温度
    dates, highs, lows = [], [], []
    for row in reader:
      current_date = datetime.strptime(row[2],'%Y-%m-%d')
      try:
        high = int(row[4])
        low = int(row[5])
      except ValueError:
        print(f'Missing data for {current_date}')
      else:  
        dates.append(current_date)
        highs.append(high)
        lows.append(low)

print(highs)

"""根据最高温度绘制图形"""
fig, ax = plt.subplots()
ax.plot(dates, highs, c='red', alpha=0.5) # 折线1
ax.plot(dates, lows, c='blue', alpha=0.5) # 折线2
ax.fill_between(dates, highs, lows, facecolor='blue', alpha=0.5)
# 设置图形的格式
title = '2018年每日最高温度和最低温度\n 美国加利福尼亚州死亡谷'
ax.set_title(title, fontsize=20)
ax.set_xlabel('', fontsize=16)
ax.set_ylabel("温度 (F)",fontsize=16)
fig.autofmt_xdate() 
# 自动格式化x轴的日期，斜着显示，这个函数名nb，一看就知道什么意思
# 不用，日期是相互叠在一起的
ax.tick_params(axis='both',which='major', labelsize=16)
plt.show()