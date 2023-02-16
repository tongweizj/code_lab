# -*- coding: UTF-8 -*-
from random import choice

class RandomWalk:
  """一个生产随机漫步的属性"""

  def __init__(self, num_points=5000):
    """初始化随机漫步的属性"""
    self.num_points = num_points

    # 所有随机漫步都始于（0，0）
    self.x_values=[0]
    self.y_values=[0]

  def fill_walk(self):
    """计算随机漫步包含的所有点"""

    # 不断漫步， 执导列表达到指定的长度
    while len(self.x_values) < self.num_points:
 
      # 决定前进方向以及沿这个方向前进的距离
      x_direction = choice([1,0])
      x_distance = choice([0,1,2,3,4,5,6,7,8])
      x_setp = x_distance * x_direction

      y_direction = choice([1,0])
      y_distance = choice([0,1,2,3,4,5,6,7,8])
      y_setp = y_distance * y_direction

      # 拒绝原地踏步
      # 如果0，就跳过下面的代码，直接进入循环，因为x_values队列没有增长，所以相当于重新做一次随机
      if x_setp == 0 and y_setp == 0:
        continue

      # 计算下一个点的x值和y值
      x = self.x_values[-1] + x_setp
      y = self.y_values[-1] + y_setp

      self.x_values.append(x)
      self.y_values.append(y) 
    
