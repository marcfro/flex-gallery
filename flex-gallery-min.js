var FlexGallery,__bind=function(a,b){return function(){return a.apply(b,arguments)}};FlexGallery=(function(){function a(b){this.getShortestColumnKey=__bind(this.getShortestColumnKey,this);this.addFillers=__bind(this.addFillers,this);this.draw=__bind(this.draw,this);var d,c;this.parentWidth=0;this.outerGutter=0;this.columns=[];d={id:"flexGallery",gutter:20,columnWidth:260,fireOnComplete:"tiler:complete",addFillers:true};this.options=this.extend(d,b);$("#"+this.options.id).css({position:"relative",display:"block",margin:"0",padding:"0"});c=this;$(window).resize(function(){return c.draw()});$(window).load(function(){return c.draw()});this.draw()}a.prototype.draw=function(){var f,h,e,d,j,c,k,g,b;k=false;c=$("#"+this.options.id).parent().width();if(this.parentWidth===0||c!==this.parentWidth){k=true;this.parentWidth=c;g=Math.floor(this.parentWidth/this.options.columnWidth);e=g-1;f=Math.floor((this.parentWidth-(e*this.options.gutter))/this.options.columnWidth);if(f<=0){f=1}this.outerGutter=Math.floor((this.parentWidth-((f*this.options.columnWidth)+(e*this.options.gutter)))/2);this.columns=(function(){var l,i;i=[];for(d=l=1;1<=f?l<=f:l>=f;d=1<=f?++l:--l){i.push(0)}return i})()}j=this;$("#"+this.options.id+" li").each(function(l,m){var i,n;if(k||typeof $(m).data("flex-gallery-set")==="undefined"){$(m).css({"max-width":j.options.columnWidth+"px",position:"absolute",left:"0",top:"0",display:"block",visibility:"hidden","min-width":j.options.columnWidth+"px"});i=$(m).height();n=j.getShortestColumnKey();$(m).css({top:j.columns[n]+"px",left:j.calculateLeftPosition(n)+"px",visibility:"visible"});j.columns[n]+=parseInt(i+j.options.gutter,10);return $(m).data("flex-gallery-set",1)}});h=this.columns.slice();h.sort(this.sorter);b=h[this.columns.length-1];$("#"+this.options.id).css({height:b+"px"});if(k&&this.options.addFillers){this.addFillers(b)}$("#"+this.options.id).trigger(this.options.fireOnComplete,null,{outerGutter:this.outerGutter});return $("#"+this.options.id)};a.prototype.addFillers=function(b){var c,e,d;$(".flex-gallery-filler").each(function(f,g){return g.remove()});d=this.columns;for(c in d){e=d[c];if(e<b){c=parseInt(c,10);$(document.createElement("div")).appendTo($("#"+this.options.id)).css({"max-width":this.options.columnWidth+"px",position:"absolute",display:"block","min-width":this.options.columnWidth+"px",height:(b-e-this.options.gutter)+"px",left:this.calculateLeftPosition(c)+"px",top:e+"px"}).addClass("flex-gallery-filler")}}};a.prototype.calculateLeftPosition=function(b){return(b*this.options.columnWidth)+(this.options.gutter*b)+this.outerGutter};a.prototype.getShortestColumnKey=function(){var f,c,d,b,g,e;b=0;f=this.columns.slice();f.sort(this.sorter);e=this.columns;for(d in e){g=e[d];if(g===0){return d}c=0;while(c<f.length){if(g===f[0]){return d}c++}}return b};a.prototype.sorter=function(d,c){return d-c};a.prototype.extend=function(b,d){var c,e;for(c in d){e=d[c];b[c]=e}return b};return a})();