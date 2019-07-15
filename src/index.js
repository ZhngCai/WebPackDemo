import _ from 'lodash';
import './js/swiper/idangerous.swiper.css';
// import Swiper from './js/swiper/idangerous.swiper.js';
import Swiper from 'swiper';
import './style/index.scss';
import './style/main.scss';
import axios from 'axios';


// function createDomElement() {
//   let dom = document.createElement('div');
//   dom.innerHTML = _.join(['aicoder.com','好!','线下实习'],'');
//   // dom.className = 'box';
//   dom.classList.add('box');
//   return dom;
// }

// let divDom = createDomElement();

// document.body.appendChild(divDom);

// console.log("aaa")


var mySwiper = new Swiper ('.slideBox', {
  loop:true,
  autoplay : 2000,
});


var CITY_ID = {
  sh: 2,
  sz: 28,
  hz: 44,
  nj: 125,
  wh: 154,
  bj: 62
}


!function () {
  var city = "sz"
  var metroId = 1;
  var cityId = CITY_ID[city];
  var o = {
      cityId: cityId,
      villageId: 27329,
      roomState: 0,
      curPage: 1,
      pageSize: 9
  };

  axios({
    method: 'post',
    url: 'https://www.qk365.com/qkkx/room/queryRoomList.room',
    data:JSON.stringify(o),
    responseType: "json",
    headers:{'Content-Type': 'application/json'}
  }).then(res => {
    console.log(res)
  })
  .catch(error => {
    console.log(error)
  });

}()


class Demo{
  show(){
    console.log('this.Age :',this.Age)
  }

  get Age(){
    return this._age;
  }

  set Age(val) {
    this._age = val + 1;
  }
}

let d = new Demo();
d.Age = 19;
d.show();

let [a,b,c] = [1,2,3];
console.log("a:",a);
console.log("b:",b);
console.log("c:",c);
