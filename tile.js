var colors2 = "ff99c8-fcf6bd-d0f4de-a9def9-e4c1f9".split("-").map(a=>"#"+a)
// 定義一個tile物件的class

class Tiles{
    constructor(args){ //預設值，基本資料(物件的顏色，移動的速度，大小，初始顯示位置...)
      this.r = args.r || 10 //設計的飛彈有大有小時，就傳參數args.r來設定飛彈大小
      // this.p = args.p || createVector(width/2,height/2) //建立一個向量，{x:width/2,y:height/2} 
      this.v = args.v || createVector(0, 5);
      this.p = args.p || createVector(0, 0);
      this.color = random(colors2)
      this.a = args.a || random(0,width)
      this.b = args.b || 0
    }
    
    draw(){ //繪出物件程式碼
        push() //
        translate(this.p.x, this.p.y); //以該物件位置為原點
        this.color = random(colors2); // 隨機生成新的顏色
        fill(this.color)
        rect(this.a,this.b,100,50)
        pop()
    
  
  
}
update() {
  this.p.y = this.p.y+this.v.y


}
isBallinranger(x,y){ //功能:判斷滑鼠按下的位置是否在物件的範圍內
  let d = dist(x,y,this.p.x,this.p.y) //計算兩點(滑鼠按下與物件中心點)之間的距離，放到d變數內
  if(d<this.a/2.1){
    return true //滑鼠與物件的距離小於物件的寬度，代表碰觸了，則傳回true的值(碰觸)
  }else{
    return false //滑鼠與物件的距離大於物件的寬度，代表未碰觸，則傳回false的值(未碰觸)
  }

}

}