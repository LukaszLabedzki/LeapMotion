		/** 
			Detector Object
		**/			
		
		var Detector = function() {
			this.currPoint = new Object()
			this.timeout = false
			this.gestures = new Array()
			this.startPointCallback = false
		}
		
		Detector.prototype.setStartPointCallback = function(callback) {
			this.startPointCallback = callback
		}
		
		Detector.prototype.addGesture = function(symbol) {
			this.gestures.push(symbol)
		}
		
		Detector.prototype.setStartPoint = function(x, y, z) {
			for(var i in this.gestures) {
				this.gestures[i].currPoint.x = x
				this.gestures[i].currPoint.y = y
				this.gestures[i].currPoint.z = z
				this.gestures[i].currPoint.num = 1
				this.gestures[i].timeout = false
			}
			
			if(this.startPointCallback)
				this.startPointCallback()
		}
		
		Detector.prototype.newDetect = function(fingers, data) {
		
		}
		
		Detector.prototype.detect = function(x, y) {
			for(var n in this.gestures) {
				if(this.gestures[n].currPoint.num>=1) {
					var nextXdistance = this.gestures[n].getPoint(this.gestures[n].currPoint.num-1).distance.xNext
					var nextYdistance = this.gestures[n].getPoint(this.gestures[n].currPoint.num-1).distance.yNext
					var nextXdirection = this.gestures[n].getPoint(this.gestures[n].currPoint.num-1).distance.xNextDirection
					var nextYdirection = this.gestures[n].getPoint(this.gestures[n].currPoint.num-1).distance.yNextDirection
				
					var wrong = false;
				
					if(nextXdirection==1) 
						if(this.gestures[n].currPoint.x>x || Math.abs(this.gestures[n].currPoint.x-x)<nextXdistance) 
							wrong = true
							
					if(nextXdirection==0) 
						if(this.gestures[n].currPoint.x<x || Math.abs(this.gestures[n].currPoint.x-x)<nextXdistance) 
							wrong = true
							
					if(nextYdirection==1) 
						if(this.gestures[n].currPoint.y>y || Math.abs(this.gestures[n].currPoint.y-y)<nextYdistance) 
							wrong = true
							
					if(nextYdirection==0) 
						if(this.gestures[n].currPoint.y<y || Math.abs(this.gestures[n].currPoint.y-y)<nextYdistance) 
							wrong = true
					
					if(!wrong) {
						console.log('SYMBOL: '+this.gestures[n].name+' nextDirection: '+this.gestures[n].getPoint(this.gestures[n].currPoint.num-1).distance.yNextDirection+' nextX: '+nextXdistance+', nextY: '+nextYdistance+', currX: '+this.gestures[n].currPoint.x+', currY: '+this.gestures[n].currPoint.y+' newX: '+x+', newY: '+y)		
					
						if(this.gestures[n].timeout) clearTimeout(this.gestures[n].timeout)
						
						var me = this.gestures[n]
						
						this.gestures[n].timeout = setTimeout(function() {me.currPoint.num = 1}, 500)
						
						if(typeof this.gestures[n].getPoint(this.gestures[n].currPoint.num-1).distance.xNext == 'undefined') {
							for(var i in this.gestures) {
								this.gestures[i].currPoint.num = 0
								this.gestures[i].currPoint.x = x
								this.gestures[i].currPoint.y = y
							}
							this.gestures[n].callback()

							return false
						}
						
						this.gestures[n].currPoint.x = x
						this.gestures[n].currPoint.y = y
						this.gestures[n].currPoint.num++
					}
				}
			}
		}	