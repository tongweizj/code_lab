filename = './pi_digits.txt'
with open(filename) as file_object:
  #contents = file_object.read()
  contents_lines = file_object.readlines()
#print(contents)

for line in contents_lines:
  print(line.strip())