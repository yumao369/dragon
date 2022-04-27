## 1. 何时显示登录
1. 点击登录
2. 点击提示登录面板的确认
3. 何时提示登录面板？
   1. 点击购买龙
   2. 点击My Dragonaire
   3. 点击购买盲盒


职业类型
1.战士(勇猛)
2.刺客(迅捷)
3.法师(亲魔)
4.牧师(仁慈)
阵营类型
0.无阵营
1.地
2.水
3.火
4.风
5.光
6.暗
7.异界
品质 
3.史诗
4.传说
@黄成林 


一些疑问
1. 开盲盒，出售，质押龙的状态变更都比较慢，这时候如何显示和处理？
2. SS，S, A, B, C, D -> S A B C D
3. 算力grade随机变化


### 关于claim 和 extract

claim :: game -> chain  
extract :: chain -> game

**claim分两种**
1. 从`extrac_pool`提取
2. 从`release_pool`提取

**`extract_pool`**
1. extract可以**增大**该pool的值
2. 从`extract_pool`claim减少该pool的值

**`release_pool`**
1. 按着计划，定时release
2. 每次根据用户claim的量($Amount_{user}$)和所有用户claim的总量($Amount_{total}$)比($\frac{Amount_{user}}{Amount_{total}}$)，  
   分配本次release($r_{era}$)，用户获得 $r_{era}\frac{Amount_{user}}{Amount_{total}}$



### 更新算力
1. 更新NFT的算力
2. 更新指定的