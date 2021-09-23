const config = {
	type: 'bar',
	data: data,
	options: {
		responsive: true,
		plugins: {
			legend: {
				position: 'top',
			},
			title: {
				display: true,
				text: 'YAMAHAL Sales Statistics',
			},
		},
	},
};

const DATA_COUNT = 3;
const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

const labels = Utils.months({ count: 7 });
const data = {
	labels: labels,
	datasets: [
		{
			label: 'Dataset 1',
			data: Utils.numbers(NUMBER_CFG),
			borderColor: Utils.CHART_COLORS.red,
			backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
		},
		{
			label: 'Dataset 2',
			data: Utils.numbers(NUMBER_CFG),
			borderColor: Utils.CHART_COLORS.blue,
			backgroundColor: Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
		},
	],
};
