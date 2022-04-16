<script setup lang="ts">
import { computed, Ref, ref, StyleValue } from "vue";
const foldingFrameCount=300

const viewHeight = ref(document.body.clientHeight)
const viewWidth = ref(document.body.clientWidth)
window.addEventListener('resize',()=>{
  viewHeight.value=document.body.clientHeight
  viewWidth.value=document.body.clientWidth
})

const animate_progress = ref(0);
const foldingProgress = ref(0);
let folding = true;
const eazing_function=(x:number)=>(x<0.5)?2*x*x:(-1+4*x-2*x*x);
const eaze_in_out=computed(()=>eazing_function(animate_progress.value))
const moveUp:Ref<StyleValue>=computed(()=>({
  position: "fixed",
  top: ((viewHeight.value/2-100)*(1-eaze_in_out.value)+100)+"px",
  left: (viewWidth.value/2)+"px",
  transform: "translate(-50%,-50%)",
  fontSize: (100-eaze_in_out.value*20)+"px"
}))
const contentStyle:Ref<StyleValue>=computed(()=>({
  position: "fixed",
  top: viewHeight.value/2+'px',
  left: viewWidth.value/2+'px',
  transform: "translate(-50%,-50%)",
  opacity: eazing_function(foldingProgress.value/foldingFrameCount)*100+'%'
}))
const moveDown:Ref<StyleValue>=computed(()=>({
  position: "fixed",
  bottom: ((viewHeight.value/2-100)*(1-eaze_in_out.value)+100)+"px",
  left: (viewWidth.value/2)+"px",
  transform: "translate(-50%,50%)",
  fontSize: (100-eaze_in_out.value*20)+"px"
}))
const fadeOut:Ref<StyleValue>=computed(()=>({
  opacity: (1-eaze_in_out.value)*100+'%'
}))
const fadeIn:Ref<StyleValue>=computed(()=>({
  opacity: eaze_in_out.value*100+'%'
}))
const foldingAnimation=()=>{
  if(foldingProgress.value>0 && folding){
    foldingProgress.value--;
    window.requestAnimationFrame(foldingAnimation);
  } else if(foldingProgress.value<foldingFrameCount && !folding){
    foldingProgress.value++;
    window.requestAnimationFrame(foldingAnimation);
  }
}

let tickingScroll = false;
const handleScroll=()=>{
  animate_progress.value = window.scrollY/viewHeight.value;
  folding=animate_progress.value<=0.8;
  foldingAnimation();
  tickingScroll=false
}
window.addEventListener('scroll',()=>{
  if (!tickingScroll) {
    window.requestAnimationFrame(handleScroll);
    tickingScroll = true;
  }
});


const contentCanvas=ref<HTMLCanvasElement>()
const drawCanvas=()=>{
  if(contentCanvas.value){

  }
}

</script>

<template>
  <div class="scroll-view">
    <div :style="moveUp">
      <div>
        <span :style="fadeOut">ww</span>wulongcha<span :style="fadeOut">aa</span>
      </div>
    </div>
    <div :style="contentStyle">
      <canvas ref="contentCanvas"/>
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
</style>
