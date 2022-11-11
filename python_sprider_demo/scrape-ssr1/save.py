import json
from os import makedirs
from os.path import exists

Result_Dir = 'results'
exists(Result_Dir) or makedirs(Result_Dir) # 创建文件夹,如果已经存在,就退出

def save_data(data):
  name = data.get('name')
  data_path = f'{Result_Dir}/{name}.json'
  json.dump(data,open(data_path,'w',encoding='utf-8'),ensure_ascii=False,indent=2)
