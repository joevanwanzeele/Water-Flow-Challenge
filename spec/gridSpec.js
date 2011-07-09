describe("Grid", function(){
	var grid;
	
	beforeEach(function(){
	grid = new Grid();
	});
	
	it("can add a row", function(){			
		expect(grid.numberOfRows).toEqual(0);
		expect(grid.numberOfColumns).toEqual(0);	
		addRowFromArray(grid, [1,1,1]);
		expect(grid.numberOfRows).toEqual(1);
		expect(grid.numberOfColumns).toEqual(3);	
	});
	
	it("can return the correct resistance at a location", function(){		
		expect(function(){grid.resistanceAt(0,0)}).toThrow("index out of range");
		expect(function(){grid.resistanceAt(0,1)}).toThrow("index out of range");
		expect(function(){grid.resistanceAt(0,2)}).toThrow("index out of range");
		
		addRowFromArray(grid, [-1,0,100]);
		
		expect(grid.resistanceAt(0,0)).toEqual(-1);
		expect(grid.resistanceAt(0,1)).toEqual(0);
		expect(grid.resistanceAt(0,2)).toEqual(100);		
	});
	
	it("can return the 3 possible next moves as row indices given a current location", function(){
		addRowFromArray(grid, [1,2,3]);
		addRowFromArray(grid, [4,5,6]);
		addRowFromArray(grid, [7,8,9]);
		addRowFromArray(grid, [11,12,13]);
		
		var firstLocation = new Node(2);
		firstLocation.position = {x: 0, y: 1};
		
		var secondLocation = new Node(5);
		secondLocation.position = {x: 1, y: 1};
		
		var thirdLocation = new Node(8);
		thirdLocation.position = {x: 2, y: 1};
		
		expect(grid.possibleMovesFrom(1,0)).toContain(firstLocation);
		expect(grid.possibleMovesFrom(1,0)).toContain(secondLocation);
		expect(grid.possibleMovesFrom(1,0)).toContain(thirdLocation);
		
	});
	
	it("can return the 3 possible next moves as row indices given a current location using wrapping", function(){
		addRowFromArray(grid, [1,2,3]);
		addRowFromArray(grid, [4,5,6]);
		addRowFromArray(grid, [7,8,9]);
		addRowFromArray(grid, [11,12,13]);
		
		var firstLocation = new Node(13);
		firstLocation.position = {x: 3, y: 2};
		
		var secondLocation = new Node(3);
		secondLocation.position = {x: 0, y: 2 };
		
		var thirdLocation = new Node(6);
		thirdLocation.position = {x: 1, y: 2 };
		
		expect(grid.possibleMovesFrom(0,1)).toContain(firstLocation);
		expect(grid.possibleMovesFrom(0,1)).toContain(secondLocation);
		expect(grid.possibleMovesFrom(0,1)).toContain(thirdLocation);
		
		var firstLocation = new Node(9);
		firstLocation.position = {x: 2, y: 2};
		
		var secondLocation = new Node(13);
		secondLocation.position = {x: 3, y: 2 };
		
		var thirdLocation = new Node(3);
		thirdLocation.position = {x: 0, y: 2 };
		
		
		expect(grid.possibleMovesFrom(3,1)).toContain(firstLocation);
		expect(grid.possibleMovesFrom(3,1)).toContain(secondLocation);
		expect(grid.possibleMovesFrom(3,1)).toContain(thirdLocation);
	});
	
	it("will return 0 when trying to get possible moves and in the last column", function(){
		addRowFromArray(grid, [1,2,3]);
		addRowFromArray(grid, [4,5,6]);
		
		expect(grid.possibleMovesFrom(0,2)).toEqual(0);
	});
	
	it("can return the shortest path to the end from it's location", function(){
		addRowFromArray(grid, [0,0,0]);
		addRowFromArray(grid, [1,1,1]);
		addRowFromArray(grid, [1,1,1]);	
		
		grid.findShortestPath();
		
		expect(grid.leastResistance).toEqual(0);
		expect(grid.shortestPath()).toEqual([1, 1, 1]);
	});
	
	it("can return the shortest path for a specific input set", function(){
		addRowFromArray(grid, [3,4,1,2,8,6]);
		addRowFromArray(grid, [6,1,8,2,7,4]);
		addRowFromArray(grid, [5,9,3,9,9,5]);
		addRowFromArray(grid, [8,4,1,3,2,6]);
		addRowFromArray(grid, [3,7,2,8,6,4]);
		
		grid.findShortestPath();
		
		expect(grid.completedPathExists).toEqual(true);
		
		expect(grid.leastResistance).toEqual(16);
		
		expect(grid.shortestPath()).toEqual([1, 2, 3, 4, 4, 5]);
	});
	
	it("can return the shortest path for a slightly modified input set", function(){
		addRowFromArray(grid, [3,4,1,2,8,6]);
		addRowFromArray(grid, [6,1,8,2,7,4]);
		addRowFromArray(grid, [5,9,3,9,9,5]);
		addRowFromArray(grid, [8,4,1,3,2,6]);
		addRowFromArray(grid, [3,7,2,1,2,3]);
		
		grid.findShortestPath();
		
		expect(grid.completedPathExists).toEqual(true);
		
		expect(grid.leastResistance).toEqual(11);
		
		expect(grid.shortestPath()).toEqual([1, 2, 1, 5, 4, 5]);
	});
	
	it("will indicate when no path with a total resistance of 50 or less exists", function(){
		// addRowFromArray(grid, [10,10,10,10,11,0]);
		// addRowFromArray(grid, [10,10,10,10,11,0]);
		// addRowFromArray(grid, [10,10,10,10,11,0]);
		// addRowFromArray(grid, [10,10,10,10,11,0]);
		// addRowFromArray(grid, [10,10,10,10,11,0]);
		
		addRowFromArray(grid, [19,10,19,10,19]);
		addRowFromArray(grid, [21,23,20,19,12]);
		addRowFromArray(grid, [20,12,20,11,10]);
		
		
		grid.findShortestPath();
		
		expect(grid.completedPathExists).toEqual(false);
		expect(grid.leastResistance).toEqual(48);
		expect(grid.shortestPath()).toEqual([1, 1, 1]);
		
	});
	
	it("will figure out path when negative values are introduced", function(){
		addRowFromArray(grid, [10,10,10,10,11,0]);
		addRowFromArray(grid, [10,10,10,10,11,0]);
		addRowFromArray(grid, [10,10,10,10,11,-1]);
		addRowFromArray(grid, [10,10,10,10,11,0]);
		addRowFromArray(grid, [10,10,10,10,11,0]);
		
		grid.findShortestPath();
		expect(grid.completedPathExists).toEqual(true);
		expect(grid.leastResistance).toEqual(40);
	});
	
	// it("can handle up to 10 rows and 100 columns", function(){
		// addRowFromArray(grid, [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]);
		// addRowFromArray(grid, [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]);
		// addRowFromArray(grid, [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]);
		// addRowFromArray(grid, [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]);
		// addRowFromArray(grid, [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
		// addRowFromArray(grid, [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]);
		// addRowFromArray(grid, [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]);
		// addRowFromArray(grid, [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]);
		// addRowFromArray(grid, [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]);
		// addRowFromArray(grid, [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]);
		
		// grid.findShortestPath();
		// expect(grid.completedPathExists).toEqual(true);
		// expect(grid.leastResistance).toEqual(0);
		// expect(grid.shortestPath()).toEqual([6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6]);		
	// });
});


function addRowFromArray(grid, arrayOfResistances)
{
	var row = [];
	for (var i=0; i<arrayOfResistances.length; i++)
	{
		row[i] = new Node(arrayOfResistances[i]);
	}
	
	grid.addRow(row);
}
