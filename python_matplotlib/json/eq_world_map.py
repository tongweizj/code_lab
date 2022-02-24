import json
import matplotlib.pyplot as plt
import plotly.express as px
import pandas as pd

# 探索数据的结构

# 读取json
filename = 'data\\eq_data_30_day_m1.json'
with open(filename) as f:
    all_eq_data = json.load(f)

# 写入
# 没有加 'w',报权限错误
# io.UnsupportedOperation: not writable
# readable_file = 'data\\readable_eq_data_2021_1110.json'
# with open(readable_file,'w') as f:
#     json.dump(all_eq_data, f, indent=4)

# 从原始数据中，提取自己需要的参数来组装自己数据
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

# 设置数据显示
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
  range_x= [-200, 200],
  range_y = [-90,90],
#   width = 800,
#   height = 800,
  title = '全球地政散点图',
  size = '震级', # 根据 data来设置尺寸
  size_max = 10, # 修改最大显示尺寸
  color= '震级', # 不同震级用不同颜色标记，但之前没有一个说明
  hover_name='位置', # 增加点上的悬浮效果，显示位置字段
)


fig.write_html('global_earthquakes2.html') # 写html文件
fig.show() # 展示结果