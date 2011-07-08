function Node(resistance){
	this.position = {};
	this.resistance = resistance;	
	this.shortestNextStep;	
}

Node.prototype.findShortestPath = function(grid)
{
	var nextPositions = grid.possibleMovesFrom(this.position.x, this.position.y);
	var leastResistance = MAX_PATH_LENGTH+1;
	
	if (nextPositions)
	{	
		var shortestIndex = -1;		
		for (var i = 0; i<3; i++)
		{
			var nextShortestPathResistance = nextPositions[i].findShortestPath(grid);
			if (nextShortestPathResistance < leastResistance)
			{
				shortestIndex = i;
				leastResistance = nextShortestPathResistance;
			}
			this.shortestNextStep = nextPositions[shortestIndex];			
		}
		return this.resistance + leastResistance;		
	}	
	return this.resistance;
}
