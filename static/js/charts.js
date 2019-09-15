queue()
    .defer(d3.json, '/flow_task/training')
    .await(makeCharts);

function makeCharts(error, dbData) {
    if (error) {
        console.error("makeGraphs error on receiving dataset:", error.statusText);
        throw error;
    }

    //Create a Crossfilter instance
    var ndx = crossfilter(dbData);

    //Define Dimensions - main category
    var branchDim = ndx.dimension(function (d) {
        return d['branch'];
    });
    var modPassDim = ndx.dimension(dc.pluck('modules_passed'));

    var modFailDim = ndx.dimension(dc.pluck('modules_failed'));

    var modProgDim = ndx.dimension(dc.pluck('modules_in_progress'));

    var modOverDim = ndx.dimension(dc.pluck('modules_overdue'));

    //Calculate metrics and groups
    var modPassByBranch = branchDim.group().reduceSum(dc.pluck('modules_passed'));
    var modFailByBranch = branchDim.group().reduceSum(dc.pluck('modules_failed'));
    var modProgByBranch = branchDim.group().reduceSum(dc.pluck('modules_in_progress'));
    var modOverByBranch = branchDim.group().reduceSum(dc.pluck('modules_overdue'));

    //Charts
    var passRates = dc.barChart('#pass-chart');
    var failRates = dc.barChart('#fail-chart');
    var progRates = dc.barChart('#progress-chart');
    var overRates = dc.barChart('#overdue-chart');

    passRates
        .ordinalColors(["#bdb289"])
        .width(1200)
        .height(350)
        .margins({top: 30, right: 50, bottom: 50, left: 50})
        .gap(6)
        .dimension(branchDim) //x-axis
        .group(modPassByBranch) //y-axis
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel('All branches')
        .yAxis().ticks(4);

    failRates
        .ordinalColors(["#bdb289"])
        .width(1200)
        .height(350)
        .margins({top: 30, right: 50, bottom: 50, left: 50})
        .gap(6)
        .dimension(branchDim) //x-axis
        .group(modFailByBranch) //y-axis
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel('All branches')
        .yAxis().ticks(4);

    progRates
        .ordinalColors(["#bdb289"])
        .width(1200)
        .height(350)
        .margins({top: 30, right: 50, bottom: 50, left: 50})
        .gap(6)
        .dimension(branchDim) //x-axis
        .group(modProgByBranch) //y-axis
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel('All branches')
        .yAxis().ticks(4);

    overRates
        .ordinalColors(["#bdb289"])
        .width(1200)
        .height(350)
        .margins({top: 30, right: 50, bottom: 50, left: 50})
        .gap(6)
        .dimension(branchDim) //x-axis
        .group(modOverByBranch) //y-axis
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel('All branches')
        .yAxis().ticks(4);
    
    dc.renderAll();
}