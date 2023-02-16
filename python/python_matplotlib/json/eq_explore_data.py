# -*- coding: UTF-8 -*-
import json
import matplotlib.pyplot as plt
import plotly.express as px
import pandas as pd

""" plotly.express """
# 高级库
# 这次使用制作html
# 书： p315

"""plt 图形参数设置"""
# 更新字符集，解决中文label乱码问题

# plt.rcParams['font.sans-serif'] = ['STSong']
# plt.style.use('Solarize_Light2')

# 探索数据结构
filename = 'data/eq_data_1_day_m1.json'
with open(filename) as f:
  all_eq_data = json.load(f) #json.load()解析读取的文件
all_eq_dicts = all_eq_data['features']
# print(len(all_eq_dicts)) # 显示数据行数, 快速查明是否读取到数据
mags, titles, lons, lats = [], [], [], []
for eq_dict in all_eq_dicts:
  mag = eq_dict['properties']['mag']
  title = eq_dict['properties']['title']
  lon = eq_dict['geometry']['coordinates'][0]
  lat = eq_dict['geometry']['coordinates'][1]
  mags.append(mag)
  titles.append(title)
  lons.append(lon)
  lats.append(lat)

# print(mags[:10])
# print(titles[:2])
# print(lons[:2])
# print(lats[:2])

# json 写
# 没有加 'w',报权限错误
# io.UnsupportedOperation: not writable

# readable_file = 'data/readable_eq_data.json'
# with open(readable_file, 'w') as f:
#   json.dump(all_eq_data, f, indent = 4) # json.dump() 写文件

# panda 封装数据
data = pd.DataFrame(data=zip(lons,lats,titles,mags), columns=['经度','维度','位置','震级'])
data.head()
# fig 和下面是等效的
fig = px.scatter(
  data,
  x= '经度',
   y= '维度',
  # x = lons,
  # y = lats,
  # labels = {'x': '经度', 'y': '维度'},
  # range_x= [-200, 200],
  # range_y = [-90,90],
  # width = 800,
  # height = 800,
  # title = '全球地政散点图',
  size = '震级', # 根据 data来设置尺寸
  size_max = 10, # 修改最大显示尺寸
)
# fig = px.scatter(
#   x = lons,
#   y = lats,
#   labels = {'x': '经度', 'y': '维度'},
#   range_x= [-200, 200],
#   range_y = [-90,90],
#   width = 800,
#   height = 800,
#   title = '全球地政散点图',
# )
fig.write_html('global_earthquakes.html') # 写html文件
fig.show() # 展示结果