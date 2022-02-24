from plotly.graph_objs import Bar, Layout
from plotly import offline

from die import Die

die_1 = Die()
die_2 = Die(10)
# 掷几次骰子，并将结果存储在一个列表里
results = []

for roll_num in range(50_000):
  result = die_1.roll() +  die_2.roll()
  results.append(result)

# 分析结果
frequencies = []
max_result = die_1.num_sides + die_2.num_sides
for value in range(2, max_result + 1):
  frequencie = results.count(value)
  frequencies.append(frequencie)

# print(results)
# print(frequencies)

# 对结果进行可视化
x_values = list(range(2, max_result+1))
data = [Bar(x=x_values, y = frequencies)]

x_axis_config = {'title':'结果', 'dtick': 1}
y_axis_config = {'title':'结果对频率'}
my_layout = Layout(title='掷2个D6,D10 50_000次的结果', xaxis = x_axis_config, yaxis = y_axis_config)

offline.plot({'data':data,'layout':my_layout}, filename='d6_d10.html')
