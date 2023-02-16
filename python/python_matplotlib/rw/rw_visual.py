# -*- coding: UTF-8 -*-
import matplotlib.pyplot as plt
from random_walk import RandomWalk as RW

# 只要程序处于活动状态，一直不断运行
while True: 
  # 创建一个RW 实例
  rw = RW(500_000)
  rw.fill_walk()

  # 绘制所有的点
  plt.style.use('classic')
  # figsize 设置尺寸，以适应屏幕
  fig, ax = plt.subplots(figsize=(15, 9))
  point_numbers = range(rw.num_points)
  ax.scatter(rw.x_values, rw.y_values, c=point_numbers, cmap=plt.cm.Blues, edgecolors= 'none',s=1) 

  # 突出起点和终点
  # 重新绘制
  ax.scatter(0,0,c='green',edgecolors='none', s=100)
  ax.scatter(rw.x_values[-1],rw.y_values[-1],c='red',edgecolors='none',s=100)

  # 隐藏坐标轴
  # ax.get_xaxis().set_visible(False)
  # ax.get_yaxis().set_visible(False)

  plt.show()

  # 关闭图像后，会运行米啊面的input 命令
  keep_running = input("Make another wilk?(y/n):")
  if keep_running == 'n':
    break