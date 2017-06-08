// var dataArray = [23, 13, 21, 14, 37, 15, 18, 34, 30];




var sentiments = ["positive", "negative", "neutral"];



// var x = d3.scale.ordinal()
//     .rangeRoundBands([0, width]);

// var y = d3.scale.linear()
//     .rangeRound([height, 0]);

// var z = d3.scale.category10();

// var xAxis = d3.svg.axis()
//     .scale(x)
//     .orient("bottom")
//     .tickFormat(d3.time.format("%b"));

// var yAxis = d3.svg.axis()
//     .scale(y)
//     .orient("right");

// var svg = d3.select("body").append("svg")
//           .attr("height","100%")
//           .attr("width","100%");

// svg.selectAll("rect")
//     .data(dataArray)
//     .enter().append("rect")
//           .attr("class", "bar")
//     	  .attr("height", function(d, i) {return (d * 10)})
//           .attr("width","40")
//           .attr("x", function(d, i) {return (i * 60) + 25})
//           .attr("y", function(d, i) {return 400 - (d * 10)});
          

// svg.selectAll("text")
//     .data(dataArray)
//     .enter().append("text")
//     .text(function(d) {return d})
//           .attr("class", "text")
//           .attr("x", function(d, i) {return (i * 60) + 36})
//           .attr("y", function(d, i) {return 415 - (d * 10)});



		var w = 700;                        //width
		var h = 400;                        //height
		var padding = {top: 40, right: 40, bottom: 40, left:40};
		var dataset;
		//Set up stack method
		var stack = d3.layout.stack();

		d3.json("sample.json",function(json){
			dataset = json;

			//Data, stacked
			stack(dataset);

			var color_hash = {
				    0 : ["Neutral","#9b978f"],
					1 : ["Positive","#004977"],
					2 : ["Negative","#d12e32"]

			};


			//Set up scales
			var xScale = d3.time.scale()
				.domain([new Date(dataset[0][0].time),d3.time.day.offset(new Date(dataset[0][dataset[0].length-1].time),8)])
				.rangeRound([0, w-padding.left-padding.right]);

			var yScale = d3.scale.linear()
				.domain([0,				
					d3.max(dataset, function(d) {
						return d3.max(d, function(d) {
							return d.y0 + d.y;
						});
					})
				])
				.range([h-padding.bottom-padding.top,0]);

			var xAxis = d3.svg.axis()
						   .scale(xScale)
						   .orient("bottom")
						   .ticks(d3.time.days,1);

			var yAxis = d3.svg.axis()
						   .scale(yScale)
						   .orient("left")
						   .ticks(10);



			//Create SVG element
			var svg = d3.select("#mbars")
						.append("svg")
						.attr("width", w)
						.attr("height", h);

			// Add a group for each row of data
			var groups = svg.selectAll("g")
				.data(dataset)
				.enter()
				.append("g")
				.attr("class","rgroups")
				.attr("transform","translate("+ padding.left + "," + (h - padding.bottom) +")")
				.style("fill", function(d, i) {
					return color_hash[dataset.indexOf(d)][1];
				});

			// Add a rect for each data value
			var rects = groups.selectAll("rect")
				.data(function(d) { return d; })
				.enter()
				.append("rect")
				.attr("width", 2)
				.style("fill-opacity",1e-6);


			rects.transition()
			     .duration(function(d,i){
			    	 return 500 * i;
			     })
			     .ease("linear")
			    .attr("x", function(d) {
					return xScale(new Date(d.time));
				})
				.attr("y", function(d) {
					return -(- yScale(d.y0) - yScale(d.y) + (h - padding.top - padding.bottom)*2);
				})
				.attr("height", function(d) {
					return -yScale(d.y) + (h - padding.top - padding.bottom);
				})
				.attr("width", 15)
				.style("fill-opacity",1);

				svg.append("g")
					.attr("class","x axis")
					.attr("transform","translate(40," + (h - padding.bottom) + ")")
					.call(xAxis);


				svg.append("g")
					.attr("class","y axis")
					.attr("transform","translate(" + padding.left + "," + padding.top + ")")
					.call(yAxis);

				// adding legend

				var legend = svg.append("g")
								.attr("class","legend")
								.attr("x", w - padding.right - 65)
								.attr("y", 25)
								.attr("height", 200)
								.attr("width",200);

				legend.selectAll("g").data(dataset)
					  .enter()
					  .append('g')
					  .each(function(d,i){
					  	var g = d3.select(this);
					  	g.append("rect")
					  		.attr("x", w - padding.right - 65)
					  		.attr("y", i*25 + 10)
					  		.attr("width", 10)
					  		.attr("height",10)
					  		.style("fill",color_hash[String(i)][1]);

					  	g.append("text")
					  	 .attr("x", w - padding.right - 50)
					  	 .attr("y", i*25 + 20)
					  	 .attr("height",30)
					  	 .attr("width",100)
					  	 .style("fill",color_hash[String(i)][1])
					  	 .text(color_hash[String(i)][0]);
					  });

				svg.append("text")
				.attr("transform","rotate(-90)")
				.attr("y", 0 - 5)
				.attr("x", 0-(h/2))
				.attr("dy","1em")
				.text("Number of Tweets");

			svg.append("text")
			   .attr("class","xtext")
			   .attr("x",w/2 - padding.left)
			   .attr("y",h - 5)
			   .attr("text-anchor","middle")
			   .text("Date");

			svg.append("text")
	        .attr("class","title")
	        .attr("x", (w / 2))             
	        .attr("y", 20)
	        .attr("text-anchor", "middle")  
	        .style("font-size", "16px") 
	        .style("text-decoration", "underline")  
	        

		

					d3.json(str,function(json){

						dataset = json;
						stack(dataset);

						console.log(dataset);

						xScale.domain([new Date(0, 0, 0,dataset[0][0].time,0, 0, 0),new Date(0, 0, 0,dataset[0][dataset[0].length-1].time,0, 0, 0)])
						.rangeRound([0, w-padding.left-padding.right]);

						yScale.domain([0,				
										d3.max(dataset, function(d) {
											return d3.max(d, function(d) {
												return d.y0 + d.y;
											});
										})
									])
									.range([h-padding.bottom-padding.top,0]);

						xAxis.scale(xScale)
						     .ticks(d3.time.hour,2)
						     .tickFormat(d3.time.format("%H"));

						yAxis.scale(yScale)
						     .orient("left")
						     .ticks(10);

						 groups = svg.selectAll(".rgroups")
		                    .data(dataset);

		                    groups.enter().append("g")
		                    .attr("class","rgroups")
		                    .attr("transform","translate("+ padding.left + "," + (h - padding.bottom) +")")
		                    .style("fill",function(d,i){
		                        return color(i);
		                    });


		                    rect = groups.selectAll("rect")
		                    .data(function(d){return d;});

		                    rect.enter()
		                      .append("rect")
		                      .attr("x",w)
		                      .attr("width",1)
		                      .style("fill-opacity",1e-6);

		                rect.transition()
		                    .duration(1000)
		                    .ease("linear")
		                    .attr("x",function(d){
		                        return xScale(new Date(0, 0, 0,d.time,0, 0, 0));
		                    })
		                    .attr("y",function(d){
		                        return -(- yScale(d.y0) - yScale(d.y) + (h - padding.top - padding.bottom)*2);
		                    })
		                    .attr("height",function(d){
		                        return -yScale(d.y) + (h - padding.top - padding.bottom);
		                    })
		                    .attr("width",15)
		                    .style("fill-opacity",1);

		                rect.exit()
					       .transition()
					       .duration(1000)
					       .ease("circle")
					       .attr("x",w)
					       .remove();

		                groups.exit()
					       .transition()
					       .duration(1000)
					       .ease("circle")
					       .attr("x",w)
					       .remove();


						svg.select(".x.axis")
						   .transition()
						   .duration(1000)
						   .ease("circle")
						   .call(xAxis);

						svg.select(".y.axis")
						   .transition()
						   .duration(1000)
						   .ease("circle")
						   .call(yAxis);

						svg.select(".xtext")
						   .text("Hours");

						
					});			
				});


	
