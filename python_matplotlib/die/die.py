from random import randint

class Die:
  """ 表示一个骰子的类"""

  def __init__(self, num_sides = 6):
    """骰子默认为6个面"""
    self.num_sides = num_sides

  def roll(self):
    """返回一个1-6之间的随机值"""
    # randint 随机整数
    return randint(1, self.num_sides)