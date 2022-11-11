import json

numbers = {'1':1,'2':2}

filename = 'json-1.json'
with open(filename,'w') as f:
  json.dump(numbers,f)
  #json.dump(numbers,f,ensure_ascii=False,indent=2)

#json.dump(numbers,f,ensure_ascii=False,
# {
#   "1": 1,
#   "2": 2
# }

# json.dump(numbers,f)
# {"1": 1, "2": 2}