var MAX_PATH_LENGTH = 50;

function Grid(){
	this.numberOfRows = 0;
	this.numberOfColumns = 0;	
	this.matrix = new Array();
	this.shortestFirstStep;
	this.leastResistance;
	this.completedPathExists;
}

Grid.prototype.addRow = function(row){
	if (this.numberOfColumns && row.length != this.numberOfColumns)
		throw("all rows must be of same length");
	
	for (var i=0; i<row.length; i++)
	{
		row[i].position = {x: this.matrix.length, y:i};		
	}	
	this.matrix.push(row);
	
	if (!this.numberOfColumns) this.numberOfColumns = row.length;
	this.numberOfRows++;
}

Grid.prototype.resistanceAt = function(row,col){
	if (row >= this.numberOfRows || col >= this.numberOfColumns)
		throw("index out of range");		
	
	return this.matrix[row][col].resistance;
}

Grid.prototype.possibleMovesFrom = function(row, col){
	if (col == this.numberOfColumns - 1)
		return 0;
		
	var top = row - 1 < 0 ? this.matrix[this.numberOfRows - 1][col + 1] : this.matrix[row - 1][col + 1]; 
	var middle = this.matrix[row][col + 1];
	var bottom = row + 1 == this.numberOfRows ? this.matrix[0][col + 1] : this.matrix[row + 1][col + 1];
	
	return [top, middle, bottom];
}

Grid.prototype.findShortestPath = function()
{	
	var shortestPathLength = this.matrix[0][0].findShortestPath(this);
	this.shortestFirstStep = this.matrix[0][0];
	
	for (var i = 1; i<this.numberOfRows; i++)
	{
		var currentLength = this.matrix[i][0].findShortestPath(this);
		
		if (currentLength < shortestPathLength)
		{
			shortestPathLength = currentLength;
			this.shortestFirstStep = this.matrix[i][0];
		}		
		this.leastResistance = shortestPathLength;		
	}	
	this.completedPathExists = shortestPathLength <= MAX_PATH_LENGTH;
	
	this.setLeastResistance();
}

Grid.prototype.shortestPath = function()
{
	var nextNode = this.shortestFirstStep;
	var path = [];
	var totalLength = 0;
	
	while (nextNode)
	{
		totalLength += nextNode.resistance;
		if (totalLength <= MAX_PATH_LENGTH)
		{
			path.push(nextNode.position.x + 1);		
			nextNode = nextNode.shortestNextStep;
		}
		else
			break;
	}	
	return path;
}


Grid.prototype.setLeastResistance = function()
{
	var total = 0;	
	var nextNode = this.shortestFirstStep;	
	while (nextNode)
	{
		if (total + nextNode.resistance > MAX_PATH_LENGTH)
		{
			this.leastResistance = total;
			return;
		}		
		total += nextNode.resistance;
		nextNode = nextNode.shortestNextStep;
	}
}


