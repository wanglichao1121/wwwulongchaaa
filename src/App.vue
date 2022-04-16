<script setup lang="ts">
import { computed, Ref, ref, StyleValue } from "vue";
const animate_progress = ref(0);
const eaze_in_out = ref(0);
let ticking = false;
const titleStyle:Ref<StyleValue>=computed(()=>({
  position: "fixed",
  top: ((document.body.clientHeight/2-100)*(1-eaze_in_out.value)+100)+"px",
  left: (document.body.clientWidth/2)+"px",
  transform: "translate(-50%,-50%)",
  fontSize: (100-eaze_in_out.value*20)+"px"
}))
const bottomStyle:Ref<StyleValue>=computed(()=>({
  position: "fixed",
  bottom: ((document.body.clientHeight/2-100)*(1-eaze_in_out.value)+100)+"px",
  left: (document.body.clientWidth/2)+"px",
  transform: "translate(-50%,50%)",
  fontSize: (100-eaze_in_out.value*20)+"px"
}))
const titleOpacity:Ref<StyleValue>=computed(()=>({
  opacity: (1-eaze_in_out.value)*100+'%'
}))
const reverseOpacity:Ref<StyleValue>=computed(()=>({
  opacity: eaze_in_out.value*100+'%'
}))

function doSomething(scroll_pos:number) {
  console.log(scroll_pos)
}
window.addEventListener('scroll', function(e) {
  animate_progress.value = window.scrollY/this.document.body.clientHeight;
  const eazing_function=(x:number)=>(x<0.5)?2*x*x:(-1+4*x-2*x*x);
  eaze_in_out.value=eazing_function(animate_progress.value)

  if (!ticking) {
    window.requestAnimationFrame(function() {
      doSomething(animate_progress.value);
      ticking = false;
    });

    ticking = true;
  }
});
</script>

<template>
  <div class="scroll-view">
    <div :style="titleStyle">
      <div>
        <span :style="titleOpacity">ww</span>wulongcha<span :style="titleOpacity">aa</span>
      </div>
    </div>
    <div :style="{...bottomStyle,...reverseOpacity}">
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
  background-color: gray;
  color: white;
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
