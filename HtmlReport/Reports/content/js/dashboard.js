/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 83.33333333333333, "KoPercent": 16.666666666666668};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.5, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.0, 500, 1500, "Department-1"], "isController": false}, {"data": [0.5, 500, 1500, "HistoryPage"], "isController": false}, {"data": [1.0, 500, 1500, "Department-0"], "isController": false}, {"data": [0.5, 500, 1500, "AdvistorPage"], "isController": false}, {"data": [0.0, 500, 1500, "EcE"], "isController": false}, {"data": [0.5, 500, 1500, "MessagePage"], "isController": false}, {"data": [0.5, 500, 1500, "HistoryPage-1"], "isController": false}, {"data": [0.0, 500, 1500, "MechPage-1"], "isController": false}, {"data": [1.0, 500, 1500, "HistoryPage-0"], "isController": false}, {"data": [0.5, 500, 1500, "Member of Council page-1"], "isController": false}, {"data": [1.0, 500, 1500, "EcE-0"], "isController": false}, {"data": [1.0, 500, 1500, "Member of Council page-0"], "isController": false}, {"data": [1.0, 500, 1500, "MechPage-0"], "isController": false}, {"data": [0.0, 500, 1500, "EcE-1"], "isController": false}, {"data": [0.0, 500, 1500, "Department"], "isController": false}, {"data": [0.0, 500, 1500, "MechPage"], "isController": false}, {"data": [1.0, 500, 1500, "MessagePage-0"], "isController": false}, {"data": [0.5, 500, 1500, "MessagePage-1"], "isController": false}, {"data": [0.5, 500, 1500, "JainPage"], "isController": false}, {"data": [0.0, 500, 1500, "AdminPage"], "isController": false}, {"data": [1.0, 500, 1500, "CivilPage-0"], "isController": false}, {"data": [0.0, 500, 1500, "CivilPage"], "isController": false}, {"data": [0.0, 500, 1500, "CivilPage-1"], "isController": false}, {"data": [1.0, 500, 1500, "AdvistorPage-0"], "isController": false}, {"data": [0.5, 500, 1500, "AdvistorPage-1"], "isController": false}, {"data": [1.0, 500, 1500, "JainPage-0"], "isController": false}, {"data": [0.5, 500, 1500, "JainPage-1"], "isController": false}, {"data": [1.0, 500, 1500, "AdminPage-0"], "isController": false}, {"data": [0.0, 500, 1500, "AdminPage-1"], "isController": false}, {"data": [0.5, 500, 1500, "Member of Council page"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 30, 5, 16.666666666666668, 1127.4, 65, 3213, 694.0, 2833.7000000000003, 3169.0, 3213.0, 1.770956316410862, 66.1796921118654, 0.31522100059031877], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Department-1", 1, 0, 0.0, 1523.0, 1523, 1523, 1523.0, 1523.0, 1523.0, 1523.0, 0.6565988181221273, 56.05455925804334, 0.08784574031516744], "isController": false}, {"data": ["HistoryPage", 1, 0, 0.0, 711.0, 711, 711, 711.0, 711.0, 711.0, 711.0, 1.4064697609001406, 38.16010680379747, 0.3571114627285514], "isController": false}, {"data": ["Department-0", 1, 0, 0.0, 477.0, 477, 477, 477.0, 477.0, 477.0, 477.0, 2.0964360587002098, 0.7656905136268344, 0.28048021488469604], "isController": false}, {"data": ["AdvistorPage", 1, 0, 0.0, 730.0, 730, 730, 730.0, 730.0, 730.0, 730.0, 1.36986301369863, 42.77209974315068, 0.3799229452054795], "isController": false}, {"data": ["EcE", 1, 1, 100.0, 3213.0, 3213, 3213, 3213.0, 3213.0, 3213.0, 3213.0, 0.31123560535325245, 26.684197984749456, 0.08327983971366325], "isController": false}, {"data": ["MessagePage", 1, 0, 0.0, 659.0, 659, 659, 659.0, 659.0, 659.0, 659.0, 1.5174506828528074, 57.43343370637329, 0.3852902124430956], "isController": false}, {"data": ["HistoryPage-1", 1, 0, 0.0, 637.0, 637, 637, 637.0, 637.0, 637.0, 637.0, 1.5698587127158556, 42.03051412872841, 0.1992984693877551], "isController": false}, {"data": ["MechPage-1", 1, 0, 0.0, 2768.0, 2768, 2768, 2768.0, 2768.0, 2768.0, 2768.0, 0.361271676300578, 39.64286319093208, 0.05080382947976879], "isController": false}, {"data": ["HistoryPage-0", 1, 0, 0.0, 73.0, 73, 73, 73.0, 73.0, 73.0, 73.0, 13.698630136986301, 4.909567636986302, 1.7390839041095891], "isController": false}, {"data": ["Member of Council page-1", 1, 0, 0.0, 677.0, 677, 677, 677.0, 677.0, 677.0, 677.0, 1.4771048744460857, 43.855878415805016, 0.203390417282127], "isController": false}, {"data": ["EcE-0", 1, 0, 0.0, 79.0, 79, 79, 79.0, 79.0, 79.0, 79.0, 12.658227848101266, 4.6232199367088604, 1.6935324367088607], "isController": false}, {"data": ["Member of Council page-0", 1, 0, 0.0, 76.0, 76, 76, 76.0, 76.0, 76.0, 76.0, 13.157894736842104, 4.857113486842105, 1.811780427631579], "isController": false}, {"data": ["MechPage-0", 1, 0, 0.0, 73.0, 73, 73, 73.0, 73.0, 73.0, 73.0, 13.698630136986301, 5.096853595890411, 1.9263698630136987], "isController": false}, {"data": ["EcE-1", 1, 0, 0.0, 3133.0, 3133, 3133, 3133.0, 3133.0, 3133.0, 3133.0, 0.3191828917969997, 27.248992578997765, 0.04270317985955953], "isController": false}, {"data": ["Department", 1, 1, 100.0, 2005.0, 2005, 2005, 2005.0, 2005.0, 2005.0, 2005.0, 0.4987531172069825, 42.76126091022444, 0.13345542394014964], "isController": false}, {"data": ["MechPage", 1, 1, 100.0, 2841.0, 2841, 2841, 2841.0, 2841.0, 2841.0, 2841.0, 0.3519887363604365, 38.75519733368532, 0.09899683210137275], "isController": false}, {"data": ["MessagePage-0", 1, 0, 0.0, 82.0, 82, 82, 82.0, 82.0, 82.0, 82.0, 12.195121951219512, 4.370712652439024, 1.5482088414634145], "isController": false}, {"data": ["MessagePage-1", 1, 0, 0.0, 576.0, 576, 576, 576.0, 576.0, 576.0, 576.0, 1.736111111111111, 65.08721245659723, 0.2204047309027778], "isController": false}, {"data": ["JainPage", 1, 0, 0.0, 908.0, 908, 908, 908.0, 908.0, 908.0, 908.0, 1.1013215859030838, 31.23494286894273, 0.27963243392070486], "isController": false}, {"data": ["AdminPage", 1, 1, 100.0, 2435.0, 2435, 2435, 2435.0, 2435.0, 2435.0, 2435.0, 0.4106776180698152, 13.362262577002053, 0.10988834702258726], "isController": false}, {"data": ["CivilPage-0", 1, 0, 0.0, 77.0, 77, 77, 77.0, 77.0, 77.0, 77.0, 12.987012987012989, 4.7686688311688314, 1.762885551948052], "isController": false}, {"data": ["CivilPage", 1, 1, 100.0, 2660.0, 2660, 2660, 2660.0, 2660.0, 2660.0, 2660.0, 0.3759398496240602, 34.512673284774436, 0.10206179511278195], "isController": false}, {"data": ["CivilPage-1", 1, 0, 0.0, 2583.0, 2583, 2583, 2583.0, 2583.0, 2583.0, 2583.0, 0.38714672861014326, 35.39935092431281, 0.052552143825009674], "isController": false}, {"data": ["AdvistorPage-0", 1, 0, 0.0, 65.0, 65, 65, 65.0, 65.0, 65.0, 65.0, 15.384615384615385, 5.694110576923077, 2.1334134615384617], "isController": false}, {"data": ["AdvistorPage-1", 1, 0, 0.0, 665.0, 665, 665, 665.0, 665.0, 665.0, 665.0, 1.5037593984962407, 46.39626409774436, 0.20852913533834586], "isController": false}, {"data": ["JainPage-0", 1, 0, 0.0, 68.0, 68, 68, 68.0, 68.0, 68.0, 68.0, 14.705882352941176, 5.270565257352941, 1.866957720588235], "isController": false}, {"data": ["JainPage-1", 1, 0, 0.0, 840.0, 840, 840, 840.0, 840.0, 840.0, 840.0, 1.1904761904761907, 33.33682105654762, 0.15113467261904762], "isController": false}, {"data": ["AdminPage-0", 1, 0, 0.0, 80.0, 80, 80, 80.0, 80.0, 80.0, 80.0, 12.5, 4.5654296875, 1.67236328125], "isController": false}, {"data": ["AdminPage-1", 1, 0, 0.0, 2355.0, 2355, 2355, 2355.0, 2355.0, 2355.0, 2355.0, 0.42462845010615713, 13.661093418259023, 0.056810642250530785], "isController": false}, {"data": ["Member of Council page", 1, 0, 0.0, 753.0, 753, 753, 753.0, 753.0, 753.0, 753.0, 1.3280212483399734, 39.919748090969456, 0.3657246015936255], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["The operation lasted too long: It took 2,660 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 20.0, 3.3333333333333335], "isController": false}, {"data": ["The operation lasted too long: It took 2,005 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 20.0, 3.3333333333333335], "isController": false}, {"data": ["The operation lasted too long: It took 2,435 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 20.0, 3.3333333333333335], "isController": false}, {"data": ["The operation lasted too long: It took 2,841 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 20.0, 3.3333333333333335], "isController": false}, {"data": ["The operation lasted too long: It took 3,213 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, 20.0, 3.3333333333333335], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 30, 5, "The operation lasted too long: It took 2,660 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, "The operation lasted too long: It took 2,005 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, "The operation lasted too long: It took 2,435 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, "The operation lasted too long: It took 2,841 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, "The operation lasted too long: It took 3,213 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["EcE", 1, 1, "The operation lasted too long: It took 3,213 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Department", 1, 1, "The operation lasted too long: It took 2,005 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["MechPage", 1, 1, "The operation lasted too long: It took 2,841 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["AdminPage", 1, 1, "The operation lasted too long: It took 2,435 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["CivilPage", 1, 1, "The operation lasted too long: It took 2,660 milliseconds, but should not have lasted longer than 2,000 milliseconds.", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
