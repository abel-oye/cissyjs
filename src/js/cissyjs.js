!function(win){
	var cissy = function(){
		var topBarHtml ='<p class="cy-top-bar">
					<button type="button" class="attr" data-trigger="">设置</button>
					<button type="button" class="attr remove" data-trigger="remove">删除</button>
			</p>',
			bottomBarHtml ='<p class="cy-bottom-bar">
					<button type="button" class="attr add" data-trigger="add">添加模块</button>
			</p>';
		var Cissy = function(){
			this.cyMol = $(".cy-module");
		}
		Cissy.prototype = {
			events:function(){
				var Events = function(){
					this.X = this.Y = 0;
				}
				Events.prototype = {
					//删除模块
					remove:function(){
						$(this).closest(".cy-module").remove();
					},
					add:function(){

					},
					dragDown:function(event){
						var event = event || window.event;
						this.X = event.clientX - this.offsetLeft;
						this.Y = event.clientY - this.offsetTop;
						this.drag =true;
						this.moveTemp = this.cloneNode(true);
          				document.body.appendChild(this.moveTemp);
					},
					dragMove:function(event){
						if(!this.drag)return;
						var event = event || window.event;
			            var iL = event.clientX - this.X;
			            var iT = event.clientY - this.Y;
			            var maxL = document.documentElement.clientWidth - this.offsetWidth;
			            var maxT = document.documentElement.clientHeight - this.offsetHeight;

			            iL <= 0 && (iL = 0);
			            iT <= 0 && (iT = 0);
			            iL >= maxL && (iL = maxL);
			            iT >= maxT && (iT = maxT);
			            console.log(this.moveTemp);
			            this.moveTemp.style.zIndex = 99;
			            this.moveTemp.style.opacity = "0.5";
			            this.moveTemp.style.filter = "alpha(opacity=50)";
			            this.moveTemp.style.left = iL + "px";
			            this.moveTemp.style.top = iT + "px";
			            return false;	
					},
					drapUp:function(){
						this.drag=false;
						document.onmousemove = null;
			            document.onmouseup = null;
			            oDrag.style.opacity = this.moveTemp.style.opacity;
			            var arr = {
			              left: this.moveTemp.offsetLeft,
			              top: this.moveTemp.offsetTop
			            };
			            this.style.zIndex = this.moveTemp.style.zIndex;
			            this.releaseCapture && this.releaseCapture()
					}
				}
				return new Events
			},
			bind:function(){
				var self = this;
				this.cyMol.on("click",".remove,.add",function(event){
					event.stopPropagation();
					var $this =$(this);
					console.log(self)
					self.events()[$this.attr("data-trigger")].call(this,event)
				}).on({
					mousedown:function(){
						self.events()["dragDown"].call(this,event)
					},
					mousemove:function(){
						self.events()["dragMove"].call(this,event)
					},
					mouseup:function(){
						self.events()["dragUp"].call(this,event)
					}
				})
			},
			init:function(){
				this.cyMol.each(function(){
					var  $this = $(this);
					$this.append(topBarHtml).append(bottomBarHtml)
				})
				this.bind()
			}
		}
		return new Cissy();
	}

	win.cissy = cissy();
}(window)