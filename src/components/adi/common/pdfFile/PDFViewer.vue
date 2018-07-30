<template>
  <div class="pdf-view-layout">
    <header>
      <h1 id="title"></h1>
    </header>

    <div id="viewerContainer">
      <div id="viewer" class="pdfViewer"></div>
    </div>

    <div id="loadingBar">
      <div class="progress"></div>
      <div class="glimmer"></div>
    </div>

    <div id="errorWrapper" hidden="true">
      <div id="errorMessageLeft">
        <span id="errorMessage"></span>
        <button id="errorShowMore">
          More Information
        </button>
        <button id="errorShowLess">
          Less Information
        </button>
      </div>
      <div id="errorMessageRight">
        <button id="errorClose">
          Close
        </button>
      </div>
      <div class="clearBoth"></div>
      <textarea id="errorMoreInfo" hidden="true" readonly="readonly"></textarea>
    </div>

    <footer>
      <button class="toolbarButton pageUp" title="Previous Page" id="previous" @click="goNextPage()"></button>
      <button class="toolbarButton pageDown" title="Next Page" id="next"></button>

      <input type="number" id="pageNumber" class="toolbarField pageNumber"  size="4" min="1" >
      <button class="toolbarButton zoomOut" title="Zoom Out" id="zoomOut"></button>
      <button class="toolbarButton zoomIn" title="Zoom In" id="zoomIn"></button>
    </footer>
  </div>
</template>
<script>
  //加载PDFJS
  import pdf from '../../../node_modules/pdfjs-dist/build/pdf.js';
  import pdfViewer from '../../../node_modules/pdfjs-dist/web/pdf_viewer.js';
  import Viewer from '../viewer';
  export default{
    data(){
      return{
        myPage:1,
      }
    },
    mounted(){
        const url = 'http://192.168.0.200:8080/media/avatar/fluent-python.pdf';
        Viewer.animationStartedPromise.then(function () {
          Viewer.open({
            url: url
          });
        });
    },
    methods:{
      goNextPage(){
          console.log('下一页的数据');
      }
    },
    watch:{
      myPage(newV,oldV){
          console.log("==================：",$('#pageNumber').val());
      }
    },
  }
</script>

<style scoped>
</style>
