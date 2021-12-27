1. 半透明边框 background-clip: padding-box (default: border-box)
2. 多重边框 box-shadow: 0 0 0 ? color  || outline
3. 背景定位 
  - background-position: right 20px bottom 10px; 
  - default position is padding-box (因为防止border覆盖了背景图片, you can set background-origin)
  - use calc: background-position: calc(100% - 20px) calc(100% - 10px); 
4. 边框内圆角（**mac实现效果不一样**）
5. 

