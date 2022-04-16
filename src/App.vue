<script setup lang="ts">
import { computed, Ref, ref, StyleValue } from "vue";
const animate_progress = ref(0);
const eaze_in_out = ref(0);
const foldingProgress = ref(0);
const eazing_function=(x:number)=>(x<0.5)?2*x*x:(-1+4*x-2*x*x);
const foldingFrameCount=300
let folding = true;
let ticking = false;
const titleStyle:Ref<StyleValue>=computed(()=>({
  position: "fixed",
  top: ((document.body.clientHeight/2-100)*(1-eaze_in_out.value)+100)+"px",
  left: (document.body.clientWidth/2)+"px",
  transform: "translate(-50%,-50%)",
  fontSize: (100-eaze_in_out.value*20)+"px"
}))
const contentStyle:Ref<StyleValue>=computed(()=>({
  position: "fixed",
  top: document.body.clientHeight/2+'px',
  left: document.body.clientWidth/2+'px',
  transform: "translate(-50%,-50%)",
  opacity: eazing_function(foldingProgress.value/foldingFrameCount)*100+'%'
}))
const bottomStyle:Ref<StyleValue>=computed(()=>({
  position: "fixed",
  bottom: ((document.body.clientHeight/2-100)*(1-eaze_in_out.value)+100)+"px",
  left: (document.body.clientWidth/2)+"px",
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

const handleScroll=()=>{
  animate_progress.value = window.scrollY/document.body.clientHeight;
  folding=animate_progress.value<=0.8;
  foldingAnimation();
  eaze_in_out.value=eazing_function(animate_progress.value)
  ticking=false
}


window.addEventListener('scroll', function(e) {
  if (!ticking) {
    window.requestAnimationFrame(handleScroll);
    ticking = true;
  }
});
</script>

<template>
  <div class="scroll-view">
    <div :style="titleStyle">
      <div>
        <span :style="fadeOut">ww</span>wulongcha<span :style="fadeOut">aa</span>
      </div>
    </div>
    <div :style="contentStyle">
      <div>
        wow
      </div>
    </div>
    <div :style="{...bottomStyle,...fadeIn}">
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
