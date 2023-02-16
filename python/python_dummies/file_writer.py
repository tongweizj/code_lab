filename = 'programming.txt'

with open(filename, 'w') as file_object:
  file_object.write('I love programming.\n')
  file_object.write('I love swimming too.') #实现写入多行

with open(filename, 'a') as file_object:
  file_object.write('\nI love jumpping.\n')
  file_object.write('I love playing football too.') #实现写入多行

