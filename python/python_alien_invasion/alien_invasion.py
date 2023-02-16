# -*- coding: UTF-8 -*-

from scoreboard import Scoreboard
import sys
import pygame
from time import sleep

from settings import Settings
from ship import Ship
from bullet import Bullet
from alien import Alien
from game_stats import GameStats
from button import Button
from scoreboard import Scoreboard
class AlienInvasion:
  """管理游戏资源和行为的类"""

  def __init__(self):
    """初始化游戏并创建游戏资源"""
    pygame.init()
    self.settings = Settings()
    self.screen = pygame.display.set_mode((0,0), pygame.FULLSCREEN)
    self.settings.screen_width = self.screen.get_rect().width
    self.settings.screen_height = self.screen.get_rect().height
    pygame.display.set_caption("Alien Invasion")
    
    # 创建一个用于存储游戏统计信息的实例
    #   并创建计分牌
    self.stats = GameStats(self)
    self.sb = Scoreboard(self)

    self.ship = Ship(self)
    self.bullets = pygame.sprite.Group()
    self.aliens = pygame.sprite.Group()
    
    self._create_fleet()

    # 创建按钮
    self.play_button = Button(self, "Play")

  def run_game(self):
    """开始游戏的主循环"""
    while True:
      # 监视鼠标和键盘事件
      self._check_events()
      if self.stats.game_active:
        # 飞船实时更新
        self.ship.update()
        # 删除消失的子弹
        self._update_bullets()
        # 刷新外星人
        self._update_aliens()
      
      # 每次循环时都会重绘屏幕
      self._update_screen()

  def _check_events(self):  # _ 表示只在类内部使用的方法
    """响应按键和鼠标事件"""
    for event in pygame.event.get():
      if event.type == pygame.QUIT:
        sys.exit()
      elif event.type == pygame.MOUSEBUTTONDOWN:
        mouse_pos = pygame.mouse.get_pos()
        self._check_play_button(mouse_pos)
      elif event.type == pygame.KEYDOWN:
        self._check_keydown_events(event)
      elif event.type == pygame.KEYUP:
        self._check_keyup_events(event)                                               
      
  def _check_keydown_events(self, event):
    if event.key == pygame.K_RIGHT:
      # 向右移动飞船
      self.ship.moving_right = True
    elif event.key == pygame.K_LEFT:
      self.ship.moving_left = True
    elif event.key == pygame.K_SPACE:
      self._fire_bullet()
    elif event.key == pygame.K_q:
      # q键 退出游戏
      sys.exit()
  
  def _check_keyup_events(self, event):
    if event.key == pygame.K_RIGHT:
      self.ship.moving_right = False
    elif event.key == pygame.K_LEFT:
      self.ship.moving_left = False

  def _check_bullet_alien_collisions(self):
    """相应子弹和外星人的碰撞"""
    # 删除发生碰撞的子弹和外星人
    # 检查是否有子弹击中外星人
    # 如果是，就删除相应的子弹和外星人
    collisions = pygame.sprite.groupcollide(self.bullets, self.aliens,True,True)
    if collisions:
      for aliens in collisions.values():
        self.stats.score += self.settings.alien_points * len(aliens)
      self.sb.prep_score()
      self.sb.check_high_score()
    # 检查是否还有外星人
    if not self.aliens:
      self.bullets.empty()
      self._create_fleet()
      self.settings.increase_speed()

      #提高等级
      self.stats.level += 1
      self.sb.prep_level()

  def _check_aliens_bottom(self):
    """检查是否有外星人到达了屏幕低端"""
    screen_rect = self.screen.get_rect()
    for alien in self.aliens.sprites():
      if alien.rect.bottom >= screen_rect.bottom:
        #  像飞船被撞一样处理
        self._ship_hit()
        break

  def _check_play_button(self, mouse_pos):
    """在玩家单击play 按钮时开始游戏"""
    button_clicked = self.play_button.rect.collidepoint(mouse_pos)
    if button_clicked and not self.stats.game_active:
      # 重置游戏设定
      self.settings.initialize_dynamic_settings()

      # 重置游戏统计信息
      self.stats.reset_stats()
      self.stats.game_active = True
      self.sb.prep_score()
      self.sb.prep_level()
      self.sb.prep_ships()

      # 清空鱼虾的外星人和子弹
      self.aliens.empty()
      self.bullets.empty()

      # 创建一群新的外星人并飞船居中
      self._create_fleet()
      self.ship.center_ship()

      # 隐藏鼠标光标
      pygame.mouse.set_visible(False)

    
  def _fire_bullet(self):
    """创建一颗子弹，并切换到新屏幕"""
    if len(self.bullets) < self.settings.bullet_allowed:
      new_bullet = Bullet(self)
      self.bullets.add(new_bullet)

  def _update_bullets(self):
    for bullet in self.bullets.copy():
      if bullet.rect.bottom < 0:
        self.bullets.remove(bullet)
        # print(len(self.bullets))
    self.bullets.update()
    self._check_bullet_alien_collisions()

  def _update_aliens(self):
    """检查是否有外星人位于屏幕边缘"""
    self._check_fleet_edges()
    """更新外星人群中所有外星人的位置"""
    self.aliens.update()

    # 检查外星人和飞船之间的碰撞
    if pygame.sprite.spritecollideany(self.ship, self.aliens):
      self._ship_hit()
    # 检查是否有外星人到达底部
    self._check_aliens_bottom()

  def _update_screen(self):
    self.screen.fill(self.settings.bg_color)
    self.ship.blitme()
    for bullet in self.bullets.sprites():
      bullet.draw_bullet()
    self.aliens.draw(self.screen)

    # 显示得分
    self.sb.show_score()

    # 如果游戏处于非活动状态，就绘制Play按钮
    if not self.stats.game_active:
      self.play_button.draw_button()
    # 让最近绘制的屏幕可见
    pygame.display.flip()

  def _create_fleet(self):
    """创建外星人群"""
    # fleet a group of ships, or all of the ships in a country's navy
    # 船隊；（一國的）全部艦隊，海軍
    
    alien = Alien(self)
    alien_width, alien_height = alien.rect.size
    # 计算一行可容纳多少个外星人
    # 外星人的间距为外星人宽度
    available_space_x = self.settings.screen_width - (2*alien_width)
    number_aliens_x = available_space_x // (2*alien_width)
    # 计算屏幕可以容纳多少行外星人
    ship_height = self.ship.rect.height
    available_space_y = (self.settings.screen_height - (3*alien_height) - ship_height)
    number_rows = available_space_y // (2*alien_height)
    
    # 创建外星人群
    for row_number in range(number_rows):
      for alien_number in range(number_aliens_x):
        # 创建一个外星人并将其加入当前行
        self._create_alien(alien_number, row_number)
  
  def _create_alien(self, alien_number, row_number):
    """创建一个外星人并将其放在当前行"""
    alien = Alien(self)
    alien_width, alien_height = alien.rect.size
    alien.x = alien_width + 2*alien_width*alien_number
    alien.rect.x = alien.x
    alien.rect.y = alien.rect.height + 2 * alien.rect.height * row_number
    self.aliens .add(alien)
  
  def _check_fleet_edges(self):
    """有外星人到达边缘时，采取相应的措施"""
    for alien in self.aliens.sprites():
      if alien.check_edges():
        self._change_fleet_direction()
        break
  
  def _change_fleet_direction(self):
    """将外星人下移，并改变移动方向"""
    for alien in self.aliens.sprites():
      alien.rect.y += self.settings.fleet_drop_speed
    self.settings.fleet_direction *= -1

  def _ship_hit(self):
    """相应飞船被外星人撞到"""
    if self.stats.ships_left > 0:
      # 将ships_left 减一
      self.stats.ships_left -= 1
      self.sb.prep_ships()
      # 清空雨下的外星人和子弹
      self.aliens.empty()
      self.bullets.empty()

      # 创建一群新的外星人，并将飞船放到屏幕底端的中央
      self._create_fleet()
      self.ship.center_ship()

      # 暂停
      sleep(0.5)
    else:
      self.stats.game_active = False
      pygame.mouse.set_visible(True)

if __name__ == '__main__':
  # 创建游戏实例并运行游戏
  ai = AlienInvasion()
  ai.run_game()

