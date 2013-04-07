		/** 
			Gesture Object
		**/		
		
		var Gesture = function(name, points, callback) {
			 callback = typeof callback !== 'undefined' ? callback : false;
		
			this.name = name
			this.currPoint = new Object()
			this.callback = callback
			
			var points_num = points.length
			
			for(i=0;i<points_num;i++) {
				points[i].distance = new Object()

				if(i>0) {
					points[i].distance.xPrevious = Math.abs(points[i].position.x-points[i-1].position.x)
					points[i].distance.yPrevious = Math.abs(points[i].position.y-points[i-1].position.y)
				}
				if(i<points_num-1) {
					points[i].distance.xNext = Math.abs(points[i].position.x-points[i+1].position.x)
					points[i].distance.yNext = Math.abs(points[i].position.y-points[i+1].position.y)
					
					if(points[i].position.x>points[i+1].position.x) 
						points[i].distance.xNextDirection = 0
					else if(points[i].position.x<points[i+1].position.x) 
						points[i].distance.xNextDirection = 1
					else
						points[i].distance.xNextDirection = 2
						
					if(points[i].position.y>points[i+1].position.y) 
						points[i].distance.yNextDirection = 0
					else if(points[i].position.y<points[i+1].position.y) 
						points[i].distance.yNextDirection = 1	
					else points[i].distance.yNextDirection = 2
				}

			}
			
			this.points = points

		}
		
		Gesture.prototype.getPoint = function(index) {
			return this.points[index]
		}