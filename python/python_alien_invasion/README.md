# README

## 关键词

- pygame库
## 项目目标

- python 编程技能
  - 熟悉 Pygame
  - 管理项目
  - 重构项目
- 项目本身
  - 用户控制的飞船
  - 射杀目标：外星人
  - 玩家的飞船数
  - 玩家计分牌

```bash
alien_invasion 外星人入侵，整个游戏的核心代码 
alien  外星人class
bullet 子弹class
game_stats 游戏统计
settings  游戏设置参数
ship  飞船class
```

1. 命名
   1. 文件命名清晰，不模棱两可
   2. 长单词时，使用前4个字符，比如prepare - prep
2. 游戏中的每个对象，都有自己独立的文件，便于查找代码
3. 仅在当前模块使用的方法，使用·_·标出
4. 在一个文件中，每个方法都保持功能的清晰，一般就一个功能
5. 注释 在方法名下用 """做注释"""
6. 代码行的注释，用 #注释