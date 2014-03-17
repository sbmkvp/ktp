var utils = function (){
	return {
		distribution: function (array,n) {
			var bins = [];
			var counts = []
			var min = array.sort(function(a,b){return a-b})[0];
			var max = array.sort(function(a,b){return a-b})[array.length-1]
			var width = (max-min)/n;
			for (var i=0;i<n;i++){
				bins.push(min+width*(i+1));
				counts.push(0);
			}
			for(j in array) {
				for(k in bins) {
					if(k==0){
						if(array[j]<=bins[k]) {counts[k]++}
					} else {
						if(array[j]>bins[k-1]&&array[j]<=bins[k]) {counts[k]++}
					}
				}
			}
			var tbins = [];
			for(i in bins){ bins[i]=bins[i].toFixed(0); }
			for(i in bins){
				if(i==0){tbins[i]=min+'-'+bins[i];}
				else {tbins[i]=bins[i-1]+'-'+bins[i];}
			}
			return [min,max,tbins,counts];
		},
		average: function (x) {
			var sum=0;
			for(i in x){
				sum+=x[i]
			}
			return sum/x.length;
		},
		dataCorrector: function (data) {
			var corrections =[
				['Andrew','Andrew Martin'],
				['Bob Townroe  ','Bob Townroe'],
				['Brian','Brian Lyons'],
				['Dave Sheehey','David Sheehy'],
				['David Dein','David Dean'],
				['Marcus Beaumount','Marcus Beaumont'],
				['Rob Lees','Robert Lees'],
				['rob lees','Robert Lees'],
				['Tamel Anel Hamid','Tamer Abdel Hamid'],
				['Tamer Abdel','Tamer Abdel Hamid'],
				['Tamer Abdelhamid','Tamer Abdel Hamid'],
				['Tamer Abel Hamid','Tamer Abdel Hamid'],
				['Kirti Patel','Kirit Patel']
			];
			var removals = ['Pway Designer -tbc'];
			for(i in data){
				data[i].people=JSON.parse(data[i].people);
				for(j in corrections) {
					if(data[i].name==corrections[j][0]){ data[i].name=corrections[j][1]; }
					for(k in data[i].people) {
						if(data[i].people[k][0]==corrections[j][0]){ data[i].people[k][0]=corrections[j][1]; }
					}
				}
				for(j in removals) {
					for(k in data[i].people) {
						if(data[i].people[k][0]==removals[j]){ 
							data[i].people[k][0]='';
							data[i].people[k][1]=false;
						}
					}
				}
			}
		},
		refine: function (unrefined) {
			var refined = {}, refnames =[], id = 0;
			refined.nodes = [];
			refined.links = [];
			for(i in unrefined) {
				//if(unrefined[i].invo==1){
					var rec = {};
					rec.id = id;
					rec.name = unrefined[i].name;
					rec.role = unrefined[i].role;
					rec.org = unrefined[i].org;
					rec.time = unrefined[i].time;
					//rec.invo = Number(unrefined[i].invo);
					refined.nodes.push(rec);
					refnames.push(unrefined[i].name);
					id++;
				//}
			} 
			for (i in unrefined) {
				//if(unrefined[i].invo==1){			
					for (j in unrefined[i].people) {
						var name = unrefined[i].people[j][0];
						if (refnames.indexOf(name)==-1&&unrefined[i].people[j][1]) {
							var rec  = {};
							rec.id = id;
							rec.name = name;
							rec.role = null;
							rec.org = null;
							rec.time = null;
							//rec.invo = 1;
							refined.nodes.push(rec);
							refnames.push(name);
							id++;
						}
						if (unrefined[i].people[j][1]){
							var lnk = {};
							lnk.source = refined.nodes[i].id;
							lnk.target = refnames.indexOf(unrefined[i].people[j][0]);
							lnk.directed = 1;
							refined.links.push(lnk);
						}
					}
				//}
			}
			return refined;
		},
		makeGraph: function(data) {
			var graph = new Viva.Graph.graph();
			for (i in data.nodes) {
				var at={};
				var atkeys = Object.keys(data.nodes[i]);
				for(j in atkeys){
					if(atkeys[j]!='id'){ at[atkeys[j]] = data.nodes[i][atkeys[j]]; }
				}
				graph.addNode(data.nodes[i].id,at);
			}
			for (i in data.links) {
				graph.addLink(data.links[i].source,data.links[i].target);
			}
			return graph;
		},
		analysis: function (graph) {
			var ops = Viva.Graph.operations();
			var degree = graph.getDegree();
			var bet = Viva.Graph.centrality().betweennessCentrality(graph).sort(function(a,b){
				if (Number(a.key)<Number(b.key)){ return -1; }
				if (Number(a.key)>Number(b.key)){ return 1; }
				return 0;
			});
			tempbet = []; for(i in bet) { tempbet[i] = bet[i].value}
			var degDist = utils().distribution(degree,10);
			var betDist = utils().distribution(tempbet,10);
			return [
				{
					'name':'General Information',
					'table' : [
						['No. of People',graph.getNodesCount()],
						['No. of Connections',graph.getLinksCount()],
						['Density of Network',ops.density(graph).toFixed(2)]
					]
				},
				{
					'name':'Connectivity',
					'table' : [
						['Average Connections',ops.avgDegree(graph).toFixed(2)],
						['Min. Connections',degDist[0].toFixed(2)],
						['Max. Connections',degDist[1].toFixed(2)]
					],
					'charts' : [
						['Degree',degDist[3],degDist[2]]
					]
				},
				{
					'name':'Centralness',
					'table' : [
						['Average centralness',utils().average(tempbet).toFixed(2)],
						['Min. centralness',betDist[0].toFixed(2)],
						['Max. centralness',betDist[1].toFixed(2)]
					],
					'charts' : [
						['Centrality',betDist[3],betDist[2]]
					]
				}
			]
		},
		nodePositions:function(n,t) {
			t = t || 'circle';
			console.log(t);
			var nodePositions = [];
			if (t == 'circle') {
				for (var i=0; i<n; i++) {
					nodePositions.push({
						x:window.innerHeight*0.7/2*Math.cos(i*2*Math.PI/n),
						y:window.innerHeight*0.7/2*Math.sin(i*2*Math.PI/n)
					});
				}
			} else if (t == 'random'){
				for (var i=0; i<n; i++) {
					nodePositions.push({
						x:window.innerHeight*0.7*Math.random(),
						y:window.innerHeight*0.7*Math.random()
					});
				}
			}
			return nodePositions;
		}
	};
};