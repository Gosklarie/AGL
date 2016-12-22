define("effect/effect.async",function(e){(function(){e("effect/rainy"),e("effect/fireworks"),e("effect/erase")}).call(this)});
;define("effect/rainy",function(e,t,r){(function(){var t,n,a,i,s,d;t=e("zepto"),n=e("effect/rainy/rainyDay"),s=function(e){var t;return t=document.createElement("a"),t.href=e,t.host},i={},d=function(e,r){var a,s;return a=t(r.parentNode.parentNode),s=new n({image:r,parentElement:r.parentNode,top:r.style.top+r.style.borderWidth,left:r.style.left+r.style.borderWidth,zIndex:r.style.zIndex,width:parseInt(parseFloat(r.parentNode.style.width)*parseInt(a.css("width"))/100),height:parseInt(parseFloat(r.parentNode.style.height)*parseInt(a.css("height"))/100),webkitTransform:r.style.webkitTransform,borderRadius:e.style["border-radius"]}),s.gravity=s.GRAVITY_NON_LINEAR,s.trail=s.TRAIL_DROPS,t(s.canvas).css("opacity",0).fadeIn(1500),s.rain([[0,2,.5],[1,5,1]],60),i[e.id]=s},a=function(e){var t;return t=i[e.id],t&&t.destroy(),delete i[e.id]},r.exports={init:d,destroy:a}}).call(this)});
;define("effect/fireworks",function(t,i,s){(function(){var t,i,e,o,h,n,r,a;a=function(t,i){return Math.random()*(i-t)+t},o=function(t,i,s,e){var o,h;return o=t-s,h=i-e,Math.sqrt(Math.pow(o,2)+Math.pow(h,2))},e=function(){function t(t){var i;for(this.Fireworks=t.Fireworks,this.x=t.x,this.y=t.y,this.coordinates=[],this.coordinateCount=null!=(i=t.coordinateCount)?i:5;this.coordinateCount--;)this.coordinates.push([this.x,this.y]);this.angle=a(0,2*Math.PI),this.speed=a(1,10),this.friction=.95,this.gravity=1,this.hue=a(t.hue-20,t.hue+20),this.brightness=a(50,80),this.alpha=1,this.decay=a(.015,.03)}return t.prototype.update=function(t){var i;return this.coordinates.pop(),this.coordinates.unshift([this.x,this.y]),this.speed*=this.friction,this.x+=Math.cos(this.angle)*this.speed,this.y+=Math.sin(this.angle)*this.speed+this.gravity,this.alpha-=this.decay,this.alpha<=this.decay?(i=this.Fireworks.particles,i.splice(t,1)):void 0},t.prototype.draw=function(){var t,i;return i=this.Fireworks.ctx,i.beginPath(),t=this.coordinates[this.coordinates.length-1],i.moveTo(t[0],t[1]),i.lineTo(this.x,this.y),i.strokeStyle="hsla("+this.hue+",100%,"+this.brightness+"%,"+this.alpha+")",i.lineWidth=1*(window.devicePixelRatio||1),i.stroke()},t}(),t=function(){function t(t){var i,s,e,h,n,r;for(i=t.sx,s=t.sy,e=t.tx,h=t.ty,this.Fireworks=t.Fireworks,this.x=i,this.y=s,this.sx=i,this.sy=s,this.tx=e,this.ty=h,this.distanceToTarget=o(i,s,e,h),this.distanceTraveled=0,this.coordinates=[],this.coordinateCount=3;this.coordinateCount--;)this.coordinates.push([this.x,this.y]);this.angle=Math.atan2(h-s,e-i),this.speed=null!=(n=t.speed)?n:2,this.acceleration=null!=(r=t.acceleration)?r:1.05,this.brightness=a(50,70),this.targetRadius=1}return t.prototype.update=function(t){var i,s,e;return this.coordinates.pop(),this.coordinates.unshift([this.x,this.y]),this.targetRadius<8?this.targetRadius+=.3:this.targetRadius=1,this.speed*=this.acceleration,s=Math.cos(this.angle)*this.speed,e=Math.sin(this.angle)*this.speed,this.distanceTraveled=o(this.sx,this.sy,this.x+s,this.y+e),this.distanceTraveled>=this.distanceToTarget?(i=this.Fireworks.fireworks,this.Fireworks.createParticles({x:this.tx,y:this.ty}),i.splice(t,1)):(this.x+=s,this.y+=e)},t.prototype.draw=function(){var t,i,s;return i=this.Fireworks.ctx,s=this.Fireworks.hue,i.beginPath(),t=this.coordinates[this.coordinates.length-1],i.moveTo(t[0],t[1]),i.lineTo(this.x,this.y),i.strokeStyle="hsl("+s+", 100%,"+this.brightness+"%)",i.lineWidth=1*(window.devicePixelRatio||1),i.stroke(),i.beginPath(),i.arc(this.tx,this.ty,this.targetRadius,0,2*Math.PI),i.stroke()},t}(),i=function(){function i(t){var i,s,e,o,h;this.options=t,this.source=t.source,this.fireworks=[],this.particles=[],this.maxWorkSize=null!=(i=t.maxWorkSize)?i:8,this.hue=null!=(s=t.hue)?s:120,this.limiterTotal=null!=(e=t.limiterTotal)?e:5,this.limiterTick=0,this.maxTimerTotal=null!=(o=t.maxTimerTotal)?o:40,this.minTimerTotal=null!=(h=t.minTimerTotal)?h:20,this.initTimerTotal(),this.mousedown=!1,this.mx=void 0,this.my=void 0,this.playing=!1,this.initCtx(),this.initCtxEvent()}return i.prototype.initCtx=function(){var t,i,s;return i=$(this.source),t=i.parent(),s=document.createElement("canvas"),$(s).attr("style",this.getPositionStyle()).css({animation:"none",webkitAnimation:"none"}),s.width=(this.options.width||$(this.source).width())*(window.devicePixelRatio||1),s.height=(this.options.height||$(this.source).height())*(window.devicePixelRatio||1),s.style.width="100%",s.style.height="100%",this.cw=s.width,this.ch=s.height,this.canvas=s,this.ctx=s.getContext("2d"),t.append(s)},i.prototype.initCtxEvent=function(){var t,i;return i=this,t=$(this.canvas),t.on("touchmove",function(t){var s;return s=i.getEventPosition(t),i.mx=s.x,i.my=s.y}),t.on("touchstart",function(t){var s;return i.mousedown=!0,s=i.getEventPosition(t),i.mx=s.x,i.my=s.y}),t.on("touchend",function(){return i.mousedown=!1})},i.prototype.getEventPosition=function(t){var i,s,e,o,h,n,r;return e={x:0,y:0},"touchstart"===t.type||"touchmove"===t.type||"touchend"===t.type||"touchcancel"===t.type?(s=null!=(n=t.originalEvent)?n:t,h=null!=(r=s.touches)?r:s.changedTouches,h&&h[0]&&(o=h[0],e.x=o.pageX,e.y=o.pageY)):("mousedown"===t.type||"mouseup"===t.type||"mousemove"===t.type||"mouseover"===t.type||"mouseout"===t.type||"mouseenter"===t.type||"mouseleave"===t.type)&&(e.x=t.pageX,e.y=t.pageY),i=$(this.canvas).offset(),e.x-=i.left,e.y-=i.top,e},i.prototype.initTimerTotal=function(){return this.timerTotal=this.maxTimerTotal,this.timerTick=0},i.prototype.getPositionStyle=function(){var t;return t=$(this.source),"position:absolute;"+t.attr("style")},i.prototype.createParticles=function(t){var i,s,o;for(s=30,t.Fireworks=this,t.hue=this.hue,o=[];s--;)i=new e(t),o.push(this.particles.push(i));return o},i.prototype.createFireWork=function(i){var s;return this.fireworks.length<this.maxWorkSize?(i.Fireworks=this,s=new t(i),this.fireworks.push(s)):void 0},i.prototype.play=function(){var t,i,s,e,o,h,n,r;if(e=this,this.playing===!0){for(this.animId=requestAnimationFrame(function(){return e.play()}),i=this.ctx,s=this.cw,t=this.ch,o=this.fireworks,n=this.particles,this.hue+=.5,i.globalCompositeOperation="destination-out",i.fillStyle="rgba(0, 0, 0, 0.5)",i.fillRect(0,0,s,t),i.globalCompositeOperation="lighter",h=o.length;h--;)o[h].draw(),o[h].update(h);for(h=n.length;h--;)n[h].draw(),n[h].update(h);return this.timerTick>=this.timerTotal?this.mousedown!==!0&&(r=a(0,s),this.createFireWork({sx:r,sy:t,tx:r,ty:a(0,t/2)}),this.initTimerTotal()):this.timerTick++,this.limiterTick>=this.limiterTotal?this.mousedown===!0?(this.createFireWork({sx:this.mx,sy:t,tx:this.mx,ty:this.my}),this.limiterTick=0):void 0:this.limiterTick++}},i.prototype.start=function(){return this.playing!==!0?($(this.canvas).css("display","block"),this.playing=!0,this.play()):void 0},i.prototype.stop=function(){return this.playing===!0?($(this.canvas).css("display","none"),this.playing=!1):void 0},i.prototype.destroy=function(){return this.animId&&(cancelAnimationFrame(this.animId),this.animId=null),this.canvas&&(this.canvas.parentNode.removeChild(this.canvas),this.canvas=null),this.source=null,this.fireworks=null,this.particles=null,this.maxWorkSize=null,this.hue=null,this.limiterTotal=null,this.limiterTick=null,this.maxTimerTotal=null,this.minTimerTotal=null,this.mousedown=null,this.mx=null,this.my=null,this.playing=null,this.cw=null,this.ch=null,this.ctx=null,this.playing=null},i}(),n={},r=function(t,s){var e,o;return e=$(s.parentNode.parentNode),o=new i({source:s,width:parseInt(parseFloat(s.parentNode.style.width)*parseInt(e.css("width"))/100),height:parseInt(parseFloat(s.parentNode.style.height)*parseInt(e.css("height"))/100)}),o.start(),n[t.id]=o},h=function(t){var i;return i=n[t.id],i&&i.destroy(),delete n[t.id]},s.exports={init:r,destroy:h}}).call(this)});
;define("effect/erase",function(t,e,o){(function(){var e,i,s,n,r,a,c,h;n=t("effect/erase/stackblur"),e=t("zepto"),i=function(t,e,o,i,s){var n,r,a;return t.save(),n=s,i>s&&(n=i),r=i/n,a=s/n,t.scale(r,a),t.beginPath(),t.arc(e/r,o/a,n,0,2*Math.PI,!1),t.closePath(),t.restore(),t.fill()},h=function(t,e,o,i,s,n){return t.save(),2*n>i&&(n=i/2),2*n>s&&(n=s/2),t.beginPath(),t.moveTo(e+n,o),t.arcTo(e+i,o,e+i,o+s,n),t.arcTo(e+i,o+s,e,o+s,n),t.arcTo(e,o+s,e,o,n),t.arcTo(e,o,e+i,o,n),t.closePath(),t.restore(),t.fill()},s=function(){function t(t){var o,s,r,a,c,d=this;this.opts=t,this.style=this.opts.style,s=e(this.opts.source),c=s.attr("src"),this.$div=e("<div></div>"),o=e("<canvas>"),o.appendTo(this.$div),this.$div.appendTo(s.parent()),r=o[0].getContext("2d"),a=new Image,a.crossOrigin="anonymous",d=this,a.onload=function(){var t,e,c,p,f,u;return u=d.style,c=u["border-width"],t=u["border-radius"],e=0,"[object String]"===Object.prototype.toString.call(t)&&(t.indexOf("%")>0?e=parseInt(t)/100:t=~~t),f=s[0].width,p=s[0].height,o.attr({width:f,height:p}),r.globalCompositeOperation="source-over",r.drawImage(a,0,0,f,p),r.globalCompositeOperation="destination-out",n.stackBlurCanvasRGBA(o[0],0,0,f,p,25),e>0&&(r.globalCompositeOperation="destination-in",i(r,f/2,p/2,f*e,p*e)),t>1&&(r.globalCompositeOperation="destination-in",h(r,0,0,f,p,t)),d.$div.css({position:"absolute","-webkit-transform":s.css("webkitTransform"),width:s.css("width"),height:s.css("height"),top:s.css("top"),left:s.css("left"),zIndex:s.css("zIndex"),borderRadius:t,borderWidth:c||0,borderStyle:"solid",borderColor:"transparent"}),d.$div.append('<div class="erase-finger"><div class="erase-img"></div><p class="erase-p">擦一擦</p></div>')},a.src=c,this.init(s,o,r)}return t.prototype.init=function(t,e,o){var i,s,n,r,a,c,h,d,p,f,u=this;return p=0,f=0,a=0,s=t.offset().left,n=t.offset().top,r=parseInt(t.css("width")),i=parseInt(t.css("height")),d=function(c){return u.$div.find(".erase-finger").remove(),a&&clearTimeout(a),s=t.offset().left,n=t.offset().top,r=parseInt(t.css("width")),i=parseInt(t.css("height")),c.preventDefault(),c.stopPropagation(),s=t.offset().left,n=t.offset().top,r=parseInt(t.css("width")),i=parseInt(t.css("height")),p=c.targetTouches[0].pageX-s,f=c.targetTouches[0].pageY-n,o.lineCap="round",o.lineJoin="round",o.lineWidth=50,o.globalCompositeOperation="destination-out",e.on("touchmove",h)},h=function(t){var e,i;return a&&(clearTimeout(a),a=null),t.preventDefault(),t.stopPropagation(),e=t.targetTouches[0].pageX-s,i=t.targetTouches[0].pageY-n,o.beginPath(),o.save(),o.moveTo(p,f),o.lineTo(e,i),o.stroke(),o.closePath(),o.restore(),p=e,f=i},c=function(t){var i;return e.off("touchmove",h),t.preventDefault(),t.stopPropagation(),i=function(){var t,i,s,n,r,a,h,p,f,l,g,v;for(console.log("touchend"),t=e[0],n=o.getImageData(0,0,t.width,t.height),r=30,i=0,a=f=0,g=n.width;r>0?g>=f:f>=g;a=f+=r)for(h=l=0,v=n.height;r>0?v>=l:l>=v;h=l+=r)s=4*(h*n.width+a),n.data[s+3]>0&&i++;return i/(n.width*n.height/(r*r))<.7?(console.log("finish"),e.fadeOut(),e.off("touchstart",d),e.off("touchend",c),"function"==typeof(p=u.opts).onFinished?p.onFinished():void 0):void 0},a=setTimeout(i,100)},e.on("touchstart",d),e.on("touchend",c)},t.prototype.start=function(){},t.prototype.destroy=function(){},t}(),a={},c=function(t,o,i){var n;if(!a[t.id])return n=new s(e.extend({source:o,style:t.style},i)),n.start(),a[t.id]=n},r=function(){},o.exports={init:c,destroy:r}}).call(this)});
;define("effect/rainy/rainyDay",function(t,i,s){function e(t,i){if(this===window)return new e(t,i);this.img=t.image;var s={opacity:1,blur:10,crop:[0,0,this.img.naturalWidth,this.img.naturalHeight],enableSizeChange:!0,parentElement:document.getElementsByTagName("body")[0],fps:30,fillStyle:"#8ED6FF",enableCollisions:!0,gravityThreshold:3,gravityAngle:Math.PI/2,gravityAngleVariance:0,reflectionScaledownFactor:5,reflectionDropMappingWidth:200,reflectionDropMappingHeight:200,width:this.img.clientWidth,height:this.img.clientHeight,position:"absolute",top:0,left:0};for(var o in s)"undefined"==typeof t[o]&&(t[o]=s[o]);this.options=t,this.drops=[],this.canvas=i||this.prepareCanvas(),this.prepareBackground(),this.prepareGlass(),this.reflection=this.REFLECTION_MINIATURE,this.trail=this.TRAIL_DROPS,this.gravity=this.GRAVITY_NON_LINEAR,this.collision=this.COLLISION_SIMPLE}function o(t,i,s,e,o){this.x=Math.floor(i),this.y=Math.floor(s),this.r=Math.random()*o+e,this.rainyday=t,this.context=t.context,this.reflection=t.reflected}function n(){this.r=0,this.g=0,this.b=0,this.next=null}function r(t,i,s){this.resolution=s,this.xc=t,this.yc=i,this.matrix=new Array(t);for(var e=0;t+5>=e;e++){this.matrix[e]=new Array(i);for(var o=0;i+5>=o;++o)this.matrix[e][o]=new h(null)}}function h(t){this.drop=t,this.next=null}var a=function(){var t={isPc:!1,isMac:!1,isLinux:!1,isIPad:!1},i=navigator.platform,s=navigator.userAgent;return t.isPc=0==i.indexOf("Win"),t.isMac=0==i.indexOf("Mac"),t.isLinux=0==i.indexOf("Linux"),t.isIPad=null!=s.match(/iPad/i)?!0:!1,t}();e.prototype.EllipseTwo=function(t,i,s,e,o){t.save();var n=o;e>o&&(n=e);var r=e/n,h=o/n;t.scale(r,h),t.beginPath(),t.arc(i/r,s/h,n,0,2*Math.PI,!1),t.fill(),t.closePath(),t.restore()},e.prototype.roundRect=function(t,i,s,e,o,n){t.save();var n=0;2*n>e&&(n=e/2),2*n>o&&(n=o/2),t.beginPath(),t.moveTo(i+n,s),t.arcTo(i+e,s,i+e,s+o,n),t.arcTo(i+e,s+o,i,s+o,n),t.arcTo(i,s+o,i,s,n),t.arcTo(i,s,i+e,s,n),t.closePath(),t.restore(),t.fill()},e.prototype.preToRadius=function(){var t=null,i=null,s=this.canvas.getContext("2d"),e=this.options.width,o=this.options.height;"[object String]"===Object.prototype.toString.call(this.options.borderRadius)?this.options.borderRadius.indexOf("%")>0?i=parseInt(this.options.borderRadius,10)/100:t=~~this.options.borderRadius:t=this.options.borderRadius,i>0&&this.EllipseTwo(s,e/2,o/2,e*i,o*i),t>1&&this.roundRect(s,0,0,e,o,t)},e.prototype.prepareCanvas=function(){var t=document.createElement("canvas");return t.style.position=this.options.position,t.style.top=this.options.top,t.style.left=this.options.left,t.style.zIndex=this.options.zIndex,t.style.webkitTransform=this.options.webkitTransform,t.style.borderRadius=this.options.borderRadius,t.style.width="100%",t.style.height="100%",t.width=this.options.width,t.height=this.options.height,this.options.parentElement.appendChild(t),this.options.enableSizeChange&&this.setResizeHandler(),t},e.prototype.setResizeHandler=function(){null!==window.onresize?this.setResizeTimer=window.setInterval(this.checkSize.bind(this),100):(window.onresize=this.checkSize.bind(this),window.onorientationchange=this.checkSize.bind(this))},e.prototype.checkSize=function(){var t=this.img.clientWidth,i=this.img.clientHeight,s=this.img.offsetLeft,e=this.img.offsetTop,o=this.canvas.width,n=this.canvas.height,r=this.canvas.offsetLeft,h=this.canvas.offsetTop;if(o!==t||n!==i){if(this.background)return;this.canvas.width=t,this.canvas.height=i,this.prepareBackground(),this.glass.width=this.canvas.width,this.glass.height=this.canvas.height,this.prepareReflections()}(r!==s||h!==e)&&(this.canvas.offsetLeft=s,this.canvas.offsetTop=e)},e.prototype.animateDrops=function(){this.addDropCallback&&this.addDropCallback();for(var t=this.drops.slice(),i=[],s=0;s<t.length;++s)t[s].animate()&&i.push(t[s]);this.drops=i,this.animId=window.requestAnimationFrame(this.animateDrops.bind(this))},e.prototype.prepareReflections=function(){this.reflected=document.createElement("canvas"),this.reflected.width=this.canvas.width/this.options.reflectionScaledownFactor,this.reflected.height=this.canvas.height/this.options.reflectionScaledownFactor;var t=this.reflected.getContext("2d");t.drawImage(this.img,this.options.crop[0],this.options.crop[1],this.options.crop[2],this.options.crop[3],0,0,this.reflected.width,this.reflected.height)},e.prototype.prepareGlass=function(){this.glass=document.createElement("canvas"),this.glass.width=this.canvas.width,this.glass.height=this.canvas.height,this.context=this.glass.getContext("2d")},e.prototype.rain=function(t,i){if(this.reflection!==this.REFLECTION_NONE&&this.prepareReflections(),this.animateDrops(),this.presets=t,this.PRIVATE_GRAVITY_FORCE_FACTOR_Y=.001*this.options.fps/25,this.PRIVATE_GRAVITY_FORCE_FACTOR_X=.001*(Math.PI/2-this.options.gravityAngle)*this.options.fps/50,this.options.enableCollisions){for(var s=0,e=0;e<t.length;e++)t[e][0]+t[e][1]>s&&(s=Math.floor(t[e][0]+t[e][1]));if(s>0){var n=Math.ceil(this.canvas.width/s),h=Math.ceil(this.canvas.height/s);this.matrix=new r(n,h,s)}else this.options.enableCollisions=!1}for(var e=0;e<t.length;e++)t[e][3]||(t[e][3]=-1);var l=0;this.addDropCallback=function(){var s=(new Date).getTime();if(!(i>s-l)){l=s;var e=this.canvas.getContext("2d");e.clearRect(0,0,this.canvas.width,this.canvas.height),e.drawImage(this.background,0,0,this.canvas.width,this.canvas.height),$(document.body).append(this.background),1!=a.isPc&&(e.globalCompositeOperation="destination-atop",this.preToRadius());for(var n,r=0;r<t.length;r++)if(t[r][2]>1||-1===t[r][3]){if(0!==t[r][3]){t[r][3]--;for(var h=0;h<t[r][2];++h)this.putDrop(new o(this,Math.random()*this.canvas.width,Math.random()*this.canvas.height,t[r][0],t[r][1]))}}else if(Math.random()<t[r][2]){n=t[r];break}n&&this.putDrop(new o(this,Math.random()*this.canvas.width,Math.random()*this.canvas.height,n[0],n[1])),e.save(),e.globalAlpha=this.options.opacity,1!=a.isPc&&(e.globalCompositeOperation="source-atop"),e.drawImage(this.glass,0,0,this.canvas.width,this.canvas.height),$(document.body).append(this.background),e.restore()}}.bind(this)},e.prototype.destroy=function(){this.animId&&(window.cancelAnimationFrame(this.animId),this.animId=null),this.setResizeTimer&&(clearInterval(this.setResizeTimer),this.setResizeTimer=null),this.options.parentElement.removeChild(this.canvas),document.body.removeChild(this.background),this.drops=null,this.options=null,this.canvas=null,this.background=null,this.reflection=null,this.trail=null,this.gravity=null,this.collision=null,this.img=null,this.addDropCallback=null,this.reflected=null,this.parentElement=null},e.prototype.putDrop=function(t){t.draw(),this.gravity&&t.r>this.options.gravityThreshold&&(this.options.enableCollisions&&this.matrix.update(t),this.drops.push(t))},e.prototype.clearDrop=function(t,i){var s=t.clear(i);if(s){var e=this.drops.indexOf(t);e>=0&&this.drops.splice(e,1)}return s},o.prototype.draw=function(){this.context.save(),this.context.beginPath();var t=this.r;if(this.r=.95*this.r,this.r<3)this.context.arc(this.x,this.y,this.r,0,2*Math.PI,!0),this.context.closePath();else if(this.colliding||this.yspeed>2){if(this.colliding){var i=this.colliding;this.r=1.001*(this.r>i.r?this.r:i.r),this.x+=i.x-this.x,this.colliding=null}var s=1+.1*this.yspeed;this.context.moveTo(this.x-this.r/s,this.y),this.context.bezierCurveTo(this.x-this.r,this.y-2*this.r,this.x+this.r,this.y-2*this.r,this.x+this.r/s,this.y),this.context.bezierCurveTo(this.x+this.r,this.y+s*this.r,this.x-this.r,this.y+s*this.r,this.x-this.r/s,this.y)}else this.context.arc(this.x,this.y,.9*this.r,0,2*Math.PI,!0),this.context.closePath();this.context.clip(),this.r=t,this.rainyday.reflection&&this.rainyday.reflection(this),this.context.restore()},o.prototype.clear=function(t){return this.context.clearRect(this.x-this.r-1,this.y-this.r-2,2*this.r+2,2*this.r+2),t?(this.terminate=!0,!0):this.y-this.r>this.rainyday.canvas.height||this.x-this.r>this.rainyday.canvas.width||this.x+this.r<0?!0:!1},o.prototype.animate=function(){if(this.terminate)return!1;var t=this.rainyday.gravity(this);if(!t&&this.rainyday.trail&&this.rainyday.trail(this),this.rainyday.options.enableCollisions){var i=this.rainyday.matrix.update(this,t);i&&this.rainyday.collision(this,i)}return!t||this.terminate},e.prototype.TRAIL_NONE=function(){},e.prototype.TRAIL_DROPS=function(t){(!t.trailY||t.y-t.trailY>=100*Math.random()*t.r)&&(t.trailY=t.y,this.putDrop(new o(this,t.x+(2*Math.random()-1)*Math.random(),t.y-t.r-5,Math.ceil(t.r/5),0)))},e.prototype.TRAIL_SMUDGE=function(t){var i=t.y-t.r-3,s=t.x-t.r/2+2*Math.random();0>i||0>s||this.context.drawImage(this.clearbackground,s,i,t.r,2,s,i,t.r,2)},e.prototype.GRAVITY_NONE=function(){return!0},e.prototype.GRAVITY_LINEAR=function(t){return this.clearDrop(t)?!0:(t.yspeed?(t.yspeed+=this.PRIVATE_GRAVITY_FORCE_FACTOR_Y*Math.floor(t.r),t.xspeed+=this.PRIVATE_GRAVITY_FORCE_FACTOR_X*Math.floor(t.r)):(t.yspeed=this.PRIVATE_GRAVITY_FORCE_FACTOR_Y,t.xspeed=this.PRIVATE_GRAVITY_FORCE_FACTOR_X),t.y+=t.yspeed,t.draw(),!1)},e.prototype.GRAVITY_NON_LINEAR=function(t){return this.clearDrop(t)?!0:(t.collided?(t.collided=!1,t.seed=Math.floor(t.r*Math.random()*this.options.fps),t.skipping=!1,t.slowing=!1):(!t.seed||t.seed<0)&&(t.seed=Math.floor(t.r*Math.random()*this.options.fps),t.skipping=t.skipping===!1?!0:!1,t.slowing=!0),t.seed--,t.yspeed?t.slowing?(t.yspeed/=1.1,t.xspeed/=1.1,t.yspeed<this.PRIVATE_GRAVITY_FORCE_FACTOR_Y&&(t.slowing=!1)):t.skipping?(t.yspeed=this.PRIVATE_GRAVITY_FORCE_FACTOR_Y,t.xspeed=this.PRIVATE_GRAVITY_FORCE_FACTOR_X):(t.yspeed+=1*this.PRIVATE_GRAVITY_FORCE_FACTOR_Y*Math.floor(t.r),t.xspeed+=1*this.PRIVATE_GRAVITY_FORCE_FACTOR_X*Math.floor(t.r)):(t.yspeed=this.PRIVATE_GRAVITY_FORCE_FACTOR_Y,t.xspeed=this.PRIVATE_GRAVITY_FORCE_FACTOR_X),0!==this.options.gravityAngleVariance&&(t.xspeed+=(2*Math.random()-1)*t.yspeed*this.options.gravityAngleVariance),t.y+=t.yspeed,t.x+=t.xspeed,t.draw(),!1)},e.prototype.positiveMin=function(t,i){var s=0;return s=i>t?0>=t?i:t:0>=i?t:i,0>=s?1:s},e.prototype.REFLECTION_NONE=function(){this.context.fillStyle=this.options.fillStyle,this.context.fill()},e.prototype.REFLECTION_MINIATURE=function(t){var i=Math.max((t.x-this.options.reflectionDropMappingWidth)/this.options.reflectionScaledownFactor,0),s=Math.max((t.y-this.options.reflectionDropMappingHeight)/this.options.reflectionScaledownFactor,0),e=this.positiveMin(2*this.options.reflectionDropMappingWidth/this.options.reflectionScaledownFactor,this.reflected.width-i),o=this.positiveMin(2*this.options.reflectionDropMappingHeight/this.options.reflectionScaledownFactor,this.reflected.height-s),n=Math.max(t.x-1.1*t.r,0),r=Math.max(t.y-1.1*t.r,0);this.context.drawImage(this.reflected,i,s,e,o,n,r,2*t.r,2*t.r)},e.prototype.COLLISION_SIMPLE=function(t,i){for(var s,e=i;null!=e;){var o=e.drop;if(Math.sqrt(Math.pow(t.x-o.x,2)+Math.pow(t.y-o.y,2))<t.r+o.r){s=o;break}e=e.next}if(s){var n,r;t.y>s.y?(n=t,r=s):(n=s,r=t),this.clearDrop(r),this.clearDrop(n,!0),this.matrix.remove(n),r.draw(),r.colliding=n,r.collided=!0}},e.prototype.prepareBackground=function(){this.background=document.createElement("canvas"),this.background.width=this.canvas.width,this.background.height=this.canvas.height,this.background.style.display="none",this.clearbackground=document.createElement("canvas"),this.clearbackground.width=this.canvas.width,this.clearbackground.height=this.canvas.height;var t=this.background.getContext("2d");t.clearRect(0,0,this.canvas.width,this.canvas.height),t.drawImage(this.img,this.options.crop[0],this.options.crop[1],this.options.crop[2],this.options.crop[3],0,0,this.canvas.width,this.canvas.height),t=this.clearbackground.getContext("2d"),t.clearRect(0,0,this.canvas.width,this.canvas.height),t.drawImage(this.img,this.options.crop[0],this.options.crop[1],this.options.crop[2],this.options.crop[3],0,0,this.canvas.width,this.canvas.height),!isNaN(this.options.blur)&&this.options.blur>=1&&this.stackBlurCanvasRGB(this.canvas.width,this.canvas.height,this.options.blur)},e.prototype.stackBlurCanvasRGB=function(t,i,s){var e=[[0,9],[1,11],[2,12],[3,13],[5,14],[7,15],[11,16],[15,17],[22,18],[31,19],[45,20],[63,21],[90,22],[127,23],[181,24]],o=[512,512,456,512,328,456,335,512,405,328,271,456,388,335,292,512,454,405,364,328,298,271,496,456,420,388,360,335,312,292,273,512,482,454,428,405,383,364,345,328,312,298,284,271,259,496,475,456,437,420,404,388,374,360,347,335,323,312,302,292,282,273,265,512,497,482,468,454,441,428,417,405,394,383,373,364,354,345,337,328,320,312,305,298,291,284,278,271,265,259,507,496,485,475,465,456,446,437,428,420,412,404,396,388,381,374,367,360,354,347,341,335,329,323,318,312,307,302,297,292,287,282,278,273,269,265,261,512,505,497,489,482,475,468,461,454,447,441,435,428,422,417,411,405,399,394,389,383,378,373,368,364,359,354,350,345,341,337,332,328,324,320,316,312,309,305,301,298,294,291,287,284,281,278,274,271,268,265,262,259,257,507,501,496,491,485,480,475,470,465,460,456,451,446,442,437,433,428,424,420,416,412,408,404,400,396,392,388,385,381,377,374,370,367,363,360,357,354,350,347,344,341,338,335,332,329,326,323,320,318,315,312,310,307,304,302,299,297,294,292,289,287,285,282,280,278,275,273,271,269,267,265,263,261,259];s|=0;var r=this.background.getContext("2d");try{var h=r.getImageData(0,0,t,i)}catch(a){return void console.error(a)}var l,c,p,d,g,f,u,y,m,v,x,R,w,T,b,I,_,A,C,E,M=h.data,O=s+1,F=O*(O+1)/2,k=new n,P=new n,V=k;for(p=1;2*s+1>p;p++)V=V.next=new n,p===O&&(P=V);V.next=k;var D=null,Y=null;u=f=0;for(var N,S=o[s],L=0;L<e.length;++L)if(s<=e[L][0]){N=e[L-1][1];break}for(c=0;i>c;c++){for(T=b=I=y=m=v=0,x=O*(_=M[f]),R=O*(A=M[f+1]),w=O*(C=M[f+2]),y+=F*_,m+=F*A,v+=F*C,V=k,p=0;O>p;p++)V.r=_,V.g=A,V.b=C,V=V.next;for(p=1;O>p;p++)d=f+((p>t-1?t-1:p)<<2),y+=(V.r=_=M[d])*(E=O-p),m+=(V.g=A=M[d+1])*E,v+=(V.b=C=M[d+2])*E,T+=_,b+=A,I+=C,V=V.next;for(D=k,Y=P,l=0;t>l;l++)M[f]=y*S>>N,M[f+1]=m*S>>N,M[f+2]=v*S>>N,y-=x,m-=R,v-=w,x-=D.r,R-=D.g,w-=D.b,d=u+((d=l+s+1)<t-1?d:t-1)<<2,T+=D.r=M[d],b+=D.g=M[d+1],I+=D.b=M[d+2],y+=T,m+=b,v+=I,D=D.next,x+=_=Y.r,R+=A=Y.g,w+=C=Y.b,T-=_,b-=A,I-=C,Y=Y.next,f+=4;u+=t}for(l=0;t>l;l++){for(b=I=T=m=v=y=0,f=l<<2,x=O*(_=M[f]),R=O*(A=M[f+1]),w=O*(C=M[f+2]),y+=F*_,m+=F*A,v+=F*C,V=k,p=0;O>p;p++)V.r=_,V.g=A,V.b=C,V=V.next;for(g=t,p=1;O>p;p++)f=g+l<<2,y+=(V.r=_=M[f])*(E=O-p),m+=(V.g=A=M[f+1])*E,v+=(V.b=C=M[f+2])*E,T+=_,b+=A,I+=C,V=V.next,i-1>p&&(g+=t);for(f=l,D=k,Y=P,c=0;i>c;c++)d=f<<2,M[d]=y*S>>N,M[d+1]=m*S>>N,M[d+2]=v*S>>N,y-=x,m-=R,v-=w,x-=D.r,R-=D.g,w-=D.b,d=l+((d=c+O)<i-1?d:i-1)*t<<2,y+=T+=D.r=M[d],m+=b+=D.g=M[d+1],v+=I+=D.b=M[d+2],D=D.next,x+=_=Y.r,R+=A=Y.g,w+=C=Y.b,T-=_,b-=A,I-=C,Y=Y.next,f+=t}r.putImageData(h,0,0)},r.prototype.update=function(t,i){if(t.gid){if(!this.matrix[t.gmx]||!this.matrix[t.gmx][t.gmy])return null;if(this.matrix[t.gmx][t.gmy].remove(t),i)return null;if(t.gmx=Math.floor(t.x/this.resolution),t.gmy=Math.floor(t.y/this.resolution),!this.matrix[t.gmx]||!this.matrix[t.gmx][t.gmy])return null;this.matrix[t.gmx][t.gmy].add(t);var s=this.collisions(t);if(s&&null!=s.next)return s.next}else{if(t.gid=Math.random().toString(36).substr(2,9),t.gmx=Math.floor(t.x/this.resolution),t.gmy=Math.floor(t.y/this.resolution),!this.matrix[t.gmx]||!this.matrix[t.gmx][t.gmy])return null;this.matrix[t.gmx][t.gmy].add(t)}return null},r.prototype.collisions=function(t){var i=new h(null),s=i;return i=this.addAll(i,t.gmx-1,t.gmy+1),i=this.addAll(i,t.gmx,t.gmy+1),i=this.addAll(i,t.gmx+1,t.gmy+1),s},r.prototype.addAll=function(t,i,s){if(i>0&&s>0&&i<this.xc&&s<this.yc)for(var e=this.matrix[i][s];null!=e.next;)e=e.next,t.next=new h(e.drop),t=t.next;return t},r.prototype.remove=function(t){this.matrix[t.gmx][t.gmy].remove(t)},h.prototype.add=function(t){for(var i=this;null!=i.next;)i=i.next;i.next=new h(t)},h.prototype.remove=function(t){for(var i=this,s=null;null!=i.next;)s=i,i=i.next,i.drop.gid===t.gid&&(s.next=i.next)},s&&s.exports&&(s.exports=e)});
;define("effect/erase/stackblur",function(a,t,e){function r(){this.r=0,this.g=0,this.b=0,this.a=0,this.next=null}var n={};n.mul_table=[512,512,456,512,328,456,335,512,405,328,271,456,388,335,292,512,454,405,364,328,298,271,496,456,420,388,360,335,312,292,273,512,482,454,428,405,383,364,345,328,312,298,284,271,259,496,475,456,437,420,404,388,374,360,347,335,323,312,302,292,282,273,265,512,497,482,468,454,441,428,417,405,394,383,373,364,354,345,337,328,320,312,305,298,291,284,278,271,265,259,507,496,485,475,465,456,446,437,428,420,412,404,396,388,381,374,367,360,354,347,341,335,329,323,318,312,307,302,297,292,287,282,278,273,269,265,261,512,505,497,489,482,475,468,461,454,447,441,435,428,422,417,411,405,399,394,389,383,378,373,368,364,359,354,350,345,341,337,332,328,324,320,316,312,309,305,301,298,294,291,287,284,281,278,274,271,268,265,262,259,257,507,501,496,491,485,480,475,470,465,460,456,451,446,442,437,433,428,424,420,416,412,408,404,400,396,392,388,385,381,377,374,370,367,363,360,357,354,350,347,344,341,338,335,332,329,326,323,320,318,315,312,310,307,304,302,299,297,294,292,289,287,285,282,280,278,275,273,271,269,267,265,263,261,259],n.shg_table=[9,11,12,13,13,14,14,15,15,15,15,16,16,16,16,17,17,17,17,17,17,17,18,18,18,18,18,18,18,18,18,19,19,19,19,19,19,19,19,19,19,19,19,19,19,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24],n.stackBlurCanvasRGBA=function(a,t,e,g,o,b){if(!(isNaN(b)||1>b)){b|=0;var f,s=a,l=s.getContext("2d");try{try{f=l.getImageData(t,e,g,o)}catch(c){f=l.getImageData(t,e,g,o)}}catch(c){throw alert("Cannot access image"),new Error("unable to access image data: "+c)}var i,x,u,h,m,v,d,w,_,C,D,I,k,p,y,B,N,A,E,G,R,j,q,z,F=f.data,H=b+b+1,J=g-1,K=o-1,L=b+1,M=L*(L+1)/2,O=new r,P=O;for(u=1;H>u;u++)if(P=P.next=new r,u==L)var Q=P;P.next=O;var S=null,T=null;d=v=0;var U=n.mul_table[b],V=n.shg_table[b];for(x=0;o>x;x++){for(B=N=A=E=w=_=C=D=0,I=L*(G=F[v]),k=L*(R=F[v+1]),p=L*(j=F[v+2]),y=L*(q=F[v+3]),w+=M*G,_+=M*R,C+=M*j,D+=M*q,P=O,u=0;L>u;u++)P.r=G,P.g=R,P.b=j,P.a=q,P=P.next;for(u=1;L>u;u++)h=v+((u>J?J:u)<<2),w+=(P.r=G=F[h])*(z=L-u),_+=(P.g=R=F[h+1])*z,C+=(P.b=j=F[h+2])*z,D+=(P.a=q=F[h+3])*z,B+=G,N+=R,A+=j,E+=q,P=P.next;for(S=O,T=Q,i=0;g>i;i++)F[v+3]=q=D*U>>V,0!=q?(q=255/q,F[v]=(w*U>>V)*q,F[v+1]=(_*U>>V)*q,F[v+2]=(C*U>>V)*q):F[v]=F[v+1]=F[v+2]=0,w-=I,_-=k,C-=p,D-=y,I-=S.r,k-=S.g,p-=S.b,y-=S.a,h=d+((h=i+b+1)<J?h:J)<<2,B+=S.r=F[h],N+=S.g=F[h+1],A+=S.b=F[h+2],E+=S.a=F[h+3],w+=B,_+=N,C+=A,D+=E,S=S.next,I+=G=T.r,k+=R=T.g,p+=j=T.b,y+=q=T.a,B-=G,N-=R,A-=j,E-=q,T=T.next,v+=4;d+=g}for(i=0;g>i;i++){for(N=A=E=B=_=C=D=w=0,v=i<<2,I=L*(G=F[v]),k=L*(R=F[v+1]),p=L*(j=F[v+2]),y=L*(q=F[v+3]),w+=M*G,_+=M*R,C+=M*j,D+=M*q,P=O,u=0;L>u;u++)P.r=G,P.g=R,P.b=j,P.a=q,P=P.next;for(m=g,u=1;b>=u;u++)v=m+i<<2,w+=(P.r=G=F[v])*(z=L-u),_+=(P.g=R=F[v+1])*z,C+=(P.b=j=F[v+2])*z,D+=(P.a=q=F[v+3])*z,B+=G,N+=R,A+=j,E+=q,P=P.next,K>u&&(m+=g);for(v=i,S=O,T=Q,x=0;o>x;x++)h=v<<2,F[h+3]=q=D*U>>V,q>0?(q=255/q,F[h]=(w*U>>V)*q,F[h+1]=(_*U>>V)*q,F[h+2]=(C*U>>V)*q):F[h]=F[h+1]=F[h+2]=0,w-=I,_-=k,C-=p,D-=y,I-=S.r,k-=S.g,p-=S.b,y-=S.a,h=i+((h=x+L)<K?h:K)*g<<2,w+=B+=S.r=F[h],_+=N+=S.g=F[h+1],C+=A+=S.b=F[h+2],D+=E+=S.a=F[h+3],S=S.next,I+=G=T.r,k+=R=T.g,p+=j=T.b,y+=q=T.a,B-=G,N-=R,A-=j,E-=q,T=T.next,v+=g}l.putImageData(f,t,e)}},e.exports=n});