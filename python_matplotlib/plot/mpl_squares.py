# -*- coding: UTF-8 -*-
import matplotlib.pyplot as plt

"""plt 图形参数设置"""
# 更新字符集，解决中文label乱码问题
plt.rcParams['font.sans-serif'] = ['Arial Unicode MS']
plt.style.use('Solarize_Light2')

input_values = [1, 2, 3, 4, 5]
squares = [1, 4, 9, 16, 25]

# fig 整张图片
# ax  图片中的各个表格
fig, ax = plt.subplots()

# plot 方法,用于画折线图
# 可以设置众多参数，
# 第一是x轴，第二个是y轴，
ax.plot(input_values, squares, linewidth=3)

# 设置图标标题并给坐标轴加标签
ax.set_title("平方数", fontsize=24)
ax.set_xlabel("值", fontsize=14)
ax.set_ylabel("值的平方", fontsize=14)

# 设置刻度标记的大小
# axis 型参，设定是x、y 还是两条
ax.tick_params(axis="both", labelsize=12)

plt.show()