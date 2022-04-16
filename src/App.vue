<script setup lang="ts">
import avatarImg from "/src/assets/avatar.jpg"
import { computed, ComputedRef, ref, StyleValue } from "vue";
const eazing_function=(x:number)=>(x<0.5)?2*x*x:(-1+4*x-2*x*x);

const viewHeight = ref(document.body.clientHeight)
const viewWidth = ref(document.body.clientWidth)
window.addEventListener('resize',()=>{
  viewHeight.value=document.body.clientHeight
  viewWidth.value=document.body.clientWidth
})

const foldingBorderIncrease=200
const foldingHeightIncrease=100
const foldingWidthIncrease=100
const foldingFadeIn=200
const foldingFrameCount=foldingBorderIncrease+foldingHeightIncrease+foldingWidthIncrease+foldingFadeIn
const foldingProgress = ref(0);
let folding = true;
const foldingBorderIncreaseProgress=computed(()=>
  Math.min(1,foldingProgress.value/foldingBorderIncrease)
)
const foldingHeightIncreaseProgress=computed(()=>
  Math.max(0,Math.min(1,(foldingProgress.value-foldingBorderIncrease)/foldingHeightIncrease))
)
const foldingWidthIncreaseProgress=computed(()=>
  Math.max(0,Math.min(1,(foldingProgress.value-foldingBorderIncrease-foldingHeightIncrease)/foldingWidthIncrease))
)
const foldingFadeInProgress=computed(()=>
  Math.max(0,foldingProgress.value-(foldingBorderIncrease+foldingHeightIncrease+foldingWidthIncrease))/foldingFadeIn
)
const foldingBorderWidth=computed(()=>
  (foldingProgress.value<foldingBorderIncrease?eazing_function(foldingBorderIncreaseProgress.value)*10:(1-foldingWidthIncreaseProgress.value)*10)+'px'
)
const foldingInner:ComputedRef<StyleValue>=computed(()=>({
  opacity: eazing_function(foldingFadeInProgress.value)*100+'%'
}))
const foldingAnimations:ComputedRef<StyleValue>=computed(()=>({
  position: "fixed",
  top: viewHeight.value/2+'px',
  left: viewWidth.value/2+'px',
  transform: "translate(-50%,-50%)",
  width: foldingWidthIncreaseProgress.value*600+'px',
  overflow: 'hidden',
  border: '0px solid black',
  borderLeftWidth: foldingBorderWidth.value,
  borderRightWidth: foldingBorderWidth.value,
  height: foldingHeightIncreaseProgress.value*viewHeight.value*0.4+10+'px',
  borderRadius: '10px',
  boxShadow: "0px 0px 20px #888888"
}))
let lastStamp:number | undefined=undefined;
const foldingTime=(timeStamp:number)=>{
  const elapsed=lastStamp?timeStamp-lastStamp:0
  if(foldingProgress.value>0 && folding){
    foldingProgress.value=Math.max(foldingProgress.value-elapsed,0);
    window.requestAnimationFrame(foldingTime);
    lastStamp=timeStamp
  } else if(foldingProgress.value<foldingFrameCount && !folding){
    foldingProgress.value=Math.min(foldingProgress.value+elapsed,foldingFrameCount);
    window.requestAnimationFrame(foldingTime);
    lastStamp=timeStamp
  } else
    lastStamp=undefined
}

const animate_progress = ref(0);
const eaze_in_out=computed(()=>eazing_function(animate_progress.value))
const moveUp:ComputedRef<StyleValue>=computed(()=>({
  position: "fixed",
  top: ((viewHeight.value/2-100)*(1-eaze_in_out.value)+100)+"px",
  left: (viewWidth.value/2)+"px",
  transform: "translate(-50%,-50%)",
  fontSize: (100-eaze_in_out.value*20)+"px"
}))
const moveDown:ComputedRef<StyleValue>=computed(()=>({
  position: "fixed",
  bottom: ((viewHeight.value/2-100)*(1-eaze_in_out.value)+100)+"px",
  left: (viewWidth.value/2)+"px",
  transform: "translate(-50%,50%)",
  fontSize: (100-eaze_in_out.value*20)+"px"
}))
const fadeOut:ComputedRef<StyleValue>=computed(()=>({
  opacity: (1-eaze_in_out.value)*100+'%'
}))
const fadeIn:ComputedRef<StyleValue>=computed(()=>({
  opacity: eaze_in_out.value*100+'%'
}))

let tickingScroll = false;
const handleScroll=()=>{
  animate_progress.value = window.scrollY/viewHeight.value;
  folding=animate_progress.value<=0.8;
  window.requestAnimationFrame(foldingTime);
  tickingScroll=false
}
window.addEventListener('scroll',()=>{
  if (!tickingScroll) {
    window.requestAnimationFrame(handleScroll);
    tickingScroll = true;
  }
});

</script>

<template>
  <div class="scroll-view">
    <div :style="moveUp">
      <div>
        <span :style="fadeOut">ww</span>wulongcha<span :style="fadeOut">aa</span>
      </div>
    </div>
    <div :style="foldingAnimations">
      <div class="row-flex" :style="foldingInner">
        <div class="col-flex" style="width: 40%;">
          <div class="row-flex">
            <img :src="avatarImg" class="avatar"/>
            <span style="font-size: 60px;">欢迎</span>
          </div>
          <span>&ensp;</span>
          <span>这里似乎本应该是个登录页</span>
          <span>但好像没必要了￣へ￣</span>
        </div>
        <div class="col-line"/>
        <div class="col-flex">
          <div class="button">
            润
          </div>
        </div>
      </div>
    </div>
    <div :style="{...moveDown,...fadeIn}">
      <div class="same-width">
        a&ensp;&ensp;a
      </div>
      <div class="same-width">
        ww
      </div>
      <div class="same-width" style="position:relative;top: -90px;">
        (&ensp;&ensp;&ensp;&ensp;)
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.same-width{
  font-family:Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New, monospace;
  line-height: 60px;
}
html,body,#app {
  //background-color: gray;
  //color: white;
  height: 100%;
  margin: 0;
  scrollbar-width:none;
  ::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
}
.scroll-view {
  height: 200%;
}
.col-flex {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.row-flex {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  width: 100%
}
.col-line {
  width: 0px;
  box-sizing: border-box;
  border: 2px black solid;
  border-radius: 2px;
  box-shadow: 0px 0px 20px #888888;
  height: 70%;
}
.avatar {
  width: 80px;
  height: 80px;
  border-radius: 40px;
  box-shadow: 5px 5px 5px #888888;
}
.button {
  width: 100px;
  height: 100px;
  border-radius: 50px;
  border: 2px white solid;
  line-height: 100px;
  font-size: 50px;
  color: white;
  background-color: lightgray;
  box-shadow: 0px 0px 20px #888888;
  margin-right: 30px;
  user-select: none;
}
</style>
