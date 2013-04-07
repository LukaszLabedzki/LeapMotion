		/** 
			LeapMotion Object
		**/			
		
		var LeapMotion = function(detector) {
			this.detector = detector
			this.pointables = new Array();
			this.startPoint = false
			this.startPointSetup = 0;
		}
		
		LeapMotion.prototype.frameAction = function(frame) {
			if(frame.pointables != undefined ) {	
				if(frame.pointables.length>=1) {
					var pointables_num = frame.pointables.length
				
					for(i=0;i<pointables_num;i++) {
						if(!this.pointables[i])
							this.pointables[i] = new Object()
							
						this.pointables[i].currXPos = frame.pointables[i].tipPosition[0]
						this.pointables[i].currYPos = frame.pointables[i].tipPosition[1]
						this.pointables[i].currZPos = frame.pointables[i].tipPosition[2]
						
						if(!this.pointables[i].lastXPos) this.pointables[i].lastXPos = currXPos
						if(!this.pointables[i].lastYPos) this.pointables[i].lastYPos = currYPos
						if(!this.pointables[i].lastZPos) this.pointables[i].lastZPos = currZPos
					}
					
					var currXPos = this.pointables[0].currXPos
					var currYPos = this.pointables[0].currYPos
					var currZPos = this.pointables[0].currZPos
					
					this.detector.detect(currXPos, currYPos)
					
					if(!this.startPoint) {
						this.startPoint = new Object()
						this.startPoint.x = currXPos
						this.startPoint.y = currYPos
						this.startPoint.z = currZPos
					} else {
						if(Math.abs(this.startPoint.y-currYPos)>1 || Math.abs(this.startPoint.x-currXPos)>1) {
							this.startPoint = false
						} else {
							this.startPointSetup++
							if(this.startPointSetup>3) {
								this.detector.setStartPoint(currXPos, currYPos)
								this.startPointSetup = 0;
								this.startPoint = false
							}
						}
					}
				}
			}
		}