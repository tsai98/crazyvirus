let gameScreen=0;      //定义游戏界面的变量，并设置初始值为0
function initScreen() {               //游戏开始界面
  background(255);
  imageMode(CENTER);
  image(imgstart,width/2,height/2);
    // background(236, 240, 241);         //设置背景色为白灰色
    // textAlign(CENTER);                 //设置文本对齐方式为居中对齐
    // fill(52, 73, 94);                  //设置文本颜色
    // textSize(100);                     //设置字体大小
    // text("病毒之路", width/2, height/2); //输出文字，并设置文字的位置
 
    // fill(92,167,182);                   //填充长方形按钮的颜色
    // noStroke();                         //设置长方形的外边框为无
    // rectMode(CENTER);                   //设置画长方形的模式为正中心
    // rect(width/2, height-40, 200,60,5); //设置长方形的长宽和位置，圆角的大小
    // fill(236,240,241);                  //设置文本颜色
    // textSize(30);                       //设置字体大小
    // text("开始", width/2, height-30);   //输出文字，并设置文字的位置
}
function gameOverScreen() {  //游戏结束界面

    background(23, 24, 24,3);     //设置背景颜色，通过不断重复绘制，实现画面减隐的效果
    textAlign(CENTER);            //设置文本对齐方式为居中对齐
    fill(255, 227, 132);                     //设置文本颜色
    textSize(30);                            //设置字体大小
 
    fill(230, 180, 80);                      //设置文本颜色
    textSize(30);                            //设置字体大小
    text("感染人数", width/2, height/2-250);     //输出文字，并设置文字的位置
    textSize(150);                           //设置字体大小
    text(score, width/2, height/2-90);       //输出文字并设置文字的位置

    fill(230, 180, 80);                      //设置文本颜色
    textSize(30);                            //设置字体大小
    text("感染能力", width/2, height/2+50);     //输出文字，并设置文字的位置
    textSize(150);                           //设置字体大小
    text(infect, width/2, height/2+200);       //输出文字并设置文字的位置

 
    fill(92,167,182);                        //填充长方形按钮颜色
    rectMode(CENTER);                        //设置画长方形的模式为正中心
    noStroke();                              //设置长方形的外边框为无
    rect(width/2, height-40, 200,60,5);      //设置长方形的长宽和位置，圆角的大小
    fill(236,240,241);                       //设置文本颜色
    textSize(30);                            //设置字体大小
    text("重新开始", width/2, height-30);     //输出文字并设置文字的位置
  }  
function gamePlayScreen() {               //游戏中的界面
    background(255);  
s.move();
s.show();
// if(infect>1){
//  s2.move();
//  s2.show();
// }

let interval=random(700,2000);           //设置前后两个障碍物出现的时间间隔是700到5000毫秒中的一个随机数  
if (millis()-lastAddTime > interval) {   //如果当前时间与上次添加障碍物类的时间，相差超过一个时间间隔，就增加一个新的障碍物类
    pipes.push(new Pipe());         //将这个新的障碍物类添加到障碍物类的数组中
    pipes=pipes.splice(-4,4);
    //s.len+=1;                        //病毒长度增加1
    lastAddTime = millis();              //将上次增加障碍物的时间设置为当前的时间
 }
if (frameCount%20==0){
    evolves.push(new Evolve());
    evolves=evolves.splice(-10,10);
    slavers.push(new Slaver());
    slavers=slavers.splice(-10,10);
} 
  for(let a of slavers){
    a.move();
    a.show();
  }
  for(let d of evolves){
    d.move();
    if(d.flag==0){
      d.show();
    }
      if(s.hits3(d)){      //判断病毒是否与对象发生碰撞，如果发生碰撞
       d.hiden();
       s.addInfect(d); 
       //s2.addInfect(d);
       d.flag=1;
      }
  printScore(); 
  printInfect();    
  }
  for(let c of pipes){                //使用for循环，使障碍物类数组中的每一个障碍物对象移动和显示
    c.move();                            //调用障碍物类的移动方法
    c.show();                            //调用障碍物类的显示方法
    s.addScore(c);
    if(s.hits1(c)||s.hits2(c)){      //判断病毒是否与对象发生碰撞，如果发生碰撞
      flag=1; 
      gameOver();
    }
  }
}
function startGame() {   //游戏开始函数
    gameScreen=1;          //设置当前界面状态为游戏界面
    } 
  
function gameOver() {    //游戏结束界面
     gameScreen=2;         //设置当前界面状态为游戏结束界面
   } 
  
function restart() {     //游戏重新开始的方法
     gameScreen= 1;        //使当前界面为游戏界面
     lastAddTime= 0;       //重置增加障碍物的时间
     pipes=[];           
     evolves=[];         
     score=0;
     flag=0;              //判断是否碰撞
     infect=1;
     s.len=2;
   }  

function keyPressed(){        //定义一个按键的事件，如果按下键盘的键，就调用此函数
  if (key ==" ") {
    s.jump();
    // s2.jump();
  }
}
function mouseClicked() { //定义一个鼠标点击事件，如果点击鼠标，就调用此函数
     if(gameScreen==0){     //按下鼠标时,如果当前界面是游戏准备开始界面
       startGame();         //调用游戏开始方法，来开始游戏
      } 
     if(gameScreen==2){     //按下鼠标时,如果当前界面是游戏结束界面
       restart();           //调用游戏重新开始函数，来重新开始游戏
      } 
     if(gameScreen==1){     //按下鼠标时,如果当前界面是游戏中的界面
       s.jump();    
      }
  }