let points = [[21.6,3.3],[20.7,2.4],[18.8,3.3],[18.0,6.0],[15.6,8.2],[11.5,19.7],[15.6,29.3],[11.5,19.7],[15.6,8.2],
[12.5,7.8],[6.2,17.1],[9.1,27.7],[6.2,17.1],[12.5,7.8],[9.8,7.0],[4.0,12.7],[3.0,16.4],[3.3,21.3],[9.1,27.7],[11.8,29.6],
[15.6,29.3],[19.4,30.1],[23.2,29.5],[26.9,29.5],[29.3,27.9],[35.3,21.6],[35.4,16.3],[33.9,10.8],[28.5,7.0],[26.1,7.8],
[32.3,17.7],[29.5,27.9],[32.3,17.7],[26.1,7.8],[22.6,8.4],[27.5,19.7],[23.2,29.3],[27.5,19.7],[22.6,8.4],[20.5,5.9],[20.6,4.4],[21.6,3.3],[20.7,2.4]]; //list資料，
var fill_colors = "ff6d00-ff7900-ff8500-ff9100-ff9e00-ffaa00".split("-").map(a=>"#"+a)
var line_colors = "352208-685634-806443".split("-").map(a=>"#"+a)
//class::類別，例子

//+++++++++++++++畫points所有點的物件定義
var ball //目前要處理的物件，暫時放在ball變數內
var balls =[] //把產生的"所有"的物件，為物件的倉庫，所有的物件資料都在此

//+++++++++++設定飛彈物件的變數
var bullet //"目前要處理"的物件，暫時放在bullet變數內
var bullets = [] //把產生"所有的物件，為物件的倉庫，所有的物件皆在此

//+++++++++++設定物件的變數
var monster //"目前要處理"的物件，暫時放在bullet變數內
var monsters = [] //把產生"所有的物件，為物件的倉庫，所有的物件皆在此

//+++++++++++++++++++++++++++++++
var tile //"目前要處理"的物件，暫時放在tile變數內
var tiles = [] //把產生"所有的物件，為物件的倉庫，所有的物件皆在此


//+++++++++設定砲台位置
var shipP

//++++++++++++++++++++++++++++++++
var score=0




function setup() {
  createCanvas(windowWidth, windowHeight);
  shipP=createVector(width/2,height/1.2) //預設砲台位置為(width/2,height/2)
    //產生南瓜
    for(var i=0;i<20;i=i+1){
      ball = new obj({}) //產生一個obj class元件
      balls.push(ball) //把ball的物件放到balls陣列內
    }

    //產生鬼
    for(var i=0;i<20;i=i+1){
      monster = new Monster({}) //產生一個monster class元件
      monsters.push(monster) //把monster的物件放到monsters陣列內
    }
    
     //產生磚塊
     for(var i=0;i<20;i=i+1){
    tile = new Tiles({}) //產生一個tile class元件
    tiles.push(tile) //把tile的物件放到tiles陣列內
     }
    }

function draw() {
  background(220);
  // for(var j=0;j<balls.length;j++){
  //   ball = balls[j]
  //   ball.draw()
  //   ball.update()
  // }

  if (monsters.length == 0) { //如果怪物數量=0
    background(220) //清空畫面
    fill("#eddea4")
    rect(width/2-220,height/2-200,420,200)
    fill("#e9c46a")
    textSize(30)
    text("你的分數是:",width/2-100,height/2-60)//顯示分數
    text(score,width/2+60,height/2-60)  
    textSize(50)
    text("Win",width/2-200,height/2-120)//顯示分數
    //禁止按鍵和滑鼠
  
    noLoop();
    noCursor();
    } else if (score>=60) { //如果score<-20
      background(220) //清空畫面
      fill("#ff7900")
      rect(width/2-200,height/2-200,400,200)
      fill("#b1a7a6")
      textSize(30)
      text("你的分數是:",width/2-100,height/2-60)//顯示分數
      text(score,width/2+60,height/2-60)
      textSize(50)
      text("Lose",width/2-180,height/2-120)//顯示分數  
      //禁止按鍵和滑鼠
      noLoop();
      noCursor();
      }
    
    

  if(keyIsPressed){
    if(key=="ArrowLeft" || key=="a"){ //按下鍵盤左鍵
      shipP.x=shipP.x-30
    }
    if(key=="ArrowRight" || key=="d"){ //按下鍵盤右鍵
      shipP.x=shipP.x+30
    }
    // if(key=="ArrowUp" || key=="w"){ //按下鍵盤上鍵
    //   shipP.y=shipP.y-5
    // }
    // if(key=="ArrowDown" || key=="s"){ //按下鍵盤下鍵
    //   shipP.y=shipP.y+5
    // }
  }
  


  //南瓜的顯示
  for(let ball of balls) //只要是陣列的方式，都可以用此方式處理
  {
    ball.draw()
    ball.update()
      for(let bullet of bullets){ //檢查每一個物件
        if(ball.isBallinranger(bullet.p.x,bullet.p.y)){ //inranger，判斷有無碰到
        balls.splice(balls.indexOf(ball),1) //從倉庫balls取出被滑鼠按到的物件編號(balls.lastIndexOf(ball))，只取1個
        bullets.splice(bullets.indexOf(bullet),1)
        score=score - 1
       }
    }
  }

 
//飛彈的顯示
for(let bullet of bullets) //只要是陣列的方式，都可以用此方式處理
  {
    bullet.draw()
    bullet.update()
  }

  // 鬼的顯示
  for(let monster of monsters) //只要是陣列的方式，都可以用此方式處理
  {
    if(monster.dead == true && monster.timenumber>4){
    monsters.splice(monsters.indexOf(monster),1)
    }
    monster.draw()
    monster.update()
    for(let bullet of bullets){ //檢查每一個物件
      if(monster.isBallinranger(bullet.p.x,bullet.p.y)){ //inranger，判斷有無碰到
      // monsters.splice(monsters.indexOf(monster),1) //從倉庫monsters取出被滑鼠按到的物件編號(balls.lastIndexOf(ball))，只取1個
      bullets.splice(bullets.indexOf(bullet),1)
      score=score + 1
      monster.dead = true //代表怪物死亡
     }
  }
  }
  

  push() //重新規劃原點(0,0)，在視窗的中間
  textSize(50)
  text(score,50,50) //在座標為(50,50)上顯示score分數內容
  let dx=mouseX-width/2
  let dy=mouseY-height/2
  let angle=atan2(dy,dx) //dy分子，dx分母
  // translate(width/2,height/2) //把砲台中心點放在視窗中間
  translate(shipP.x,shipP.y)
  fill("#ffa5ab")
  noStroke()
  rotate(angle)
  triangle(50,0,-25,25,-25,-25)
  fill("ffd6ba")
  ellipse(0,0,25)
  pop()  //恢復原本設定，原點(0,0)在視窗左上角



 //磚塊的顯示
    for(let tile of tiles) //只要是陣列的方式，都可以用此方式處理
    {
      tile.draw()
      tile.update()
      for(let bullet of bullets){ //檢查每一個物件
        if(tile.isBallinranger(bullet.p.x,bullet.p.y)){ //inranger，判斷有無碰到
        tiles.splice(tiles.indexOf(ball),1) //從倉庫balls取出被滑鼠按到的物件編號(balls.lastIndexOf(ball))，只取1個
        bullets.splice(bullets.indexOf(bullet),1)
        score=score + 4
      }
    }
    }
  }

function mousePressed(){
  //++++++++++++++++產生一個物件+++++++++++++++
  // ball = new obj({  //產生一個obj class元件
  //   p:{x:mouseX,y:mouseY}
  // }) //在滑鼠按下的地方產生一個新的obj class元件
  // balls.push(ball) //把ball的物件放到balls陣列內
  //++++++++++++++++++++++++++++++++++++++++++++

  //+++++在物件上按下滑鼠，物件消失不見，分數加1分++++++++++++++++

  // for(let ball of balls){ //檢查每一個物件
  //   if(ball.isBallinranger(mouseX,mouseY)){
  //     balls.splice(balls.indexOf(ball),1) //從倉庫balls取出被滑鼠按到的物件編號(balls.lastIndexOf(ball))，只取1個
  //     score=score + 1
  //   }
  // }
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  //+++++++++++++++++++++按一下產生一個飛彈+++++++++++++++++++++++
  bullet = new Bullet({
    r:20 //可以自己加參數color,v...
  }) //在滑鼠按下的地方，產生一個新的bullet class元件
  bullets.push(bullet) //把bullet的物件放入到bullet陣列內(丟到倉庫)
  
}

function keyPressed(){
  if(key==" "){ //按下空白建，發射飛彈，跟按下滑鼠功能一樣
    bullet = new Bullet({
      r:20 //可以自己加參數color,v...
    }) //在滑鼠按下的地方，產生一個新的bullet class元件
    bullets.push(bullet) //把bullet的物件放入到bullet陣列內(丟到倉庫)
    
  }
}

