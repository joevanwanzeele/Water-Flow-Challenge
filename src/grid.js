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
	var shortestPathLength = MAX_PATH_LENGTH+1;
	
	for (var i = 0; i<this.numberOfRows; i++)
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
}

Grid.prototype.shortestPath = function()
{
	var nextNode = this.shortestFirstStep;
	var path = [];
	
	while (nextNode)
	{
		path.push(nextNode.position.x + 1);
		nextNode = nextNode.shortestNextStep;
	}
	
	return path;
}

