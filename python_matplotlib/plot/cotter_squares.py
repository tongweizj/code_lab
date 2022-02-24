# -*- coding: UTF-8 -*-
import matplotlib.pyplot as plt
"""
plt 折线图函数
"""

"""plt 图形参数设置"""
# 更新字符集，解决中文label乱码问题
plt.rcParams['font.sans-serif'] = ['Arial Unicode MS']
plt.style.use('Solarize_Light2')

"""散点图参数设置"""
# x_values = [1, 2, 3, 4, 5]
#y_values = [1, 4, 9, 16, 25]
x_values = range(1,101)
y_values = [x**2 for x in x_values]

fig, ax = plt.subplots()
# s 圆点的半径or直径长度
# c 折线的颜色，支持RGB颜色(0, 0.8, 0); 'red'
# ax.scatter(x_values, y_values, c=(0, 0.8, 0), s=1)
# c=y_values 指定x或y，效果一样，但是如果不指定，就没有渐变的效果
# cmap=plt.cm.Blues 指定颜色
ax.scatter(x_values,y_values, c=y_values, cmap=plt.cm.Blues, s=1)

# 设置图标标题并给坐标轴加标签
ax.set_title("平方数", fontsize=24)
ax.set_xlabel("值", fontsize=14)
ax.set_ylabel("值的平方", fontsize=14)

# 设置每个坐标轴的取值范围
ax.axis([0, 110, 0, 11000])

# 设置刻度标记的大小
# axis 型参，设定是x、y 还是两条
ax.tick_params(axis="both",which = 'major', labelsize=12)

# 直接显示图形
plt.show()

# 自动保存图形
# bbox_inches = 'tight' 紧凑型，把图形外空白都裁剪掉
# plt.savefig('squares_plot.png')