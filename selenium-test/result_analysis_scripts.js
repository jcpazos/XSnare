//convert results to "normalized values"
let i;
let results = [];
for (i=0; i<arr.length; i++) {
	let newRes = [];
	let j;
	for (j=0;j<20;j++) {
		let toAdd = [];
		if (arr[i][j][0]) {
			toAdd[0] = arr[i][j][1] - arr[i][j][0];
			toAdd[1] = arr[i][j][2] - arr[i][j][0];
			toAdd[2] = arr[i][j][4] - arr[i][j][3];
			toAdd[3] = arr[i][j][5] - arr[i][j][4];
			toAdd[4] = arr[i][j][6];
		}
		newRes.push(toAdd);
	}
	results.push(newRes);
}

//get means from valid results
let no_extension_means = [];
for (i=0;i<results.length;i++) {
	let currMean = [];
	let j
	for (j=0; j<5; j++) {
		let mean = 0;
		let k;
		for (k=0;k<20;k++) {
			if (results[i][k][0]) {
				mean+=results[i][k][j];
			}
		}
		currMean.push(mean/20);
	}
	no_extension_means.push(currMean);
}

//get means from valid results
let extension_means = [];
for (i=0;i<results.length;i++) {
	let currMean = [];
	let j
	for (j=0; j<5; j++) {
		let mean = 0;
		let k;
		for (k=0;k<20;k++) {
			if (results[i][k][0]) {
				mean+=results[i][k][j];
			}
		}
		currMean.push(mean/20);
	}
	extension_means.push(currMean);
}

let counter = 0;
for (i=0; i<extension_means.length; i++) {
	if (extension_means[i][0] > no_extension_means[i][0]) {
		counter++;
	}
}