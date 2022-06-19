var options = {
  fullWidth: true,
  height: 250
};

var dataP = {
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  series: [[1924, 2101, 1751, 1276, 1547, 1487, 1835, 1674, 2008, 1369, 1182, 2254]],
};
new Chartist.Bar('#chartPedidos', dataP, options);

var dataVC = {
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  series: [[8637, 9593, 9487, 8237, 7159, 9226, 7327, 9672, 8064, 7435, 8799, 7369],
          [1924, 2101, 2604, 1276, 1547, 1487, 1835, 1674, 2008, 1369, 1182, 2254]],
};
new Chartist.Line('#chartVisCad', dataVC, options);

var dataAu = new Chartist.Line('#chartAtiUsu', {
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  series: [{
    name: 'series-1',
    data: [8637, 9593, 6543, 8237, 7159, 9226, 7327, 9672, 8064, 7435, 8799, 7369]
  }, {
    name: 'series-2',
    data: [3571, 2598, 3210, 4067, 2674, 3412, 2048, 3643, 4169, 3058, 3251, 3910]
  }, {
    name: 'series-3',
    data: [1924, 2101, 1098, 2556, 1547, 1487, 1835, 1674, 2008, 1369, 1182, 2254]
  }]
}, {
  fullWidth: true,
  height: 250,
  series: {
    'series-1': {
      lineSmooth: Chartist.Interpolation.step()
    },
    'series-2': {
      showPoint: true
    },
    'series-3': {
      lineSmooth: Chartist.Interpolation.simple(),
      showArea: true
    }
  }
});

var dataMM = {
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  series: [[8637, 9593, 6543, 8237, 7159, 9226, 7327, 9672, 8064, 7435, 8799, 7369],
          [3571, 2598, 3210, 4067, 2674, 3412, 2048, 3643, 4169, 3058, 3251, 3910],
          [1924, 2101, 1098, 2556, 1547, 1487, 1835, 1674, 2008, 1369, 1182, 2254]],
};
new Chartist.Bar('#chartMoviMes', dataMM, options);

var dataPC = {
  series: [5, 3, 4]
};
var sum = function(a, b) { return a + b };
new Chartist.Pie('#chartPerCom', dataPC, {
  labelInterpolationFnc: function(value) {
    return Math.round(value / dataPC.series.reduce(sum) * 100) + '%';
  }
});

new Chartist.Pie('#chartPrograms', {
  series: [20, 10, 30]
}, {
  donut: true,
  donutWidth: 20,
  donutSolid: true,
  startAngle: 0,
  showLabel: true
});