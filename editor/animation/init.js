//Dont change it
requirejs(['ext_editor_io', 'jquery_190', 'raphael_210'],
    function (extIO, $, TableComponent) {
        var $tryit;
        var tCanvas;
        var rCanvas;


        ext.set_console_process_ret(function (this_e, ret) {

            var parsed = ret.match(/\'([.-]{2}) ([.-]{4}) : ([.-]{3}) ([.-]{4}) : ([.-]{3}) ([.-]{4})\'/);
//            console.log(parsed);
            rCanvas.remove();
            $tryit.find(".result-canvas").text("");
            if (!parsed) {
                $tryit.find(".result-canvas").text("The result has wrong format.")
            }
            else {
                var data = "";
                for (var i = 1; i < 7; i++) {
                    var temp = 0;
                    var morse = parsed[i];
                    var ml = morse.length;
                    for (var j = 0; j < morse.length; j++){
                        temp += morse[j] == "-" ? Math.pow(2, ml - j - 1) : 0;
                    }
                    data += temp;
                }
                rCanvas.createCanvas($tryit.find(".result-canvas")[0], data, true);
            }
            $tryit.find(".checkio-result").html("Result<br>" + ret);
        });

        ext.set_generate_animation_panel(function (this_e) {

            $tryit = $(this_e.setHtmlTryIt(ext.get_template('tryit')));

            tCanvas = new MorseClockCanvas({
                radius: 12, paddingX: 8
            });
            tCanvas.createNumbset($tryit.find(".tryit-canvas")[0], "103749");

            tCanvas.createFeedback();

            rCanvas = new MorseClockCanvas({
                radius: 12, paddingY: 5, paddingX: 8, y0: 3
            });

            $tryit.find(".bn-random").click(function (e) {
                tCanvas.randomData();
            });
            $tryit.find(".tryit-canvas").mousedown(function (e) {
                e.originalEvent.preventDefault();
            });
            $tryit.find(".bn-check").click(function (e) {
                this_e.sendToConsoleCheckiO(tCanvas.gatherData());
                e.stopPropagation();
                return false;
            });
        });

        function zeroFill(number, width) {
            width -= number.toString().length;
            if (width > 0) {
                return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
            }
            return number + ""; // always return a string
        }


        function MorseClockCanvas(options) {
            options = options || {};

            var colorOrange4 = "#F0801A";
            var colorOrange3 = "#FA8F00";
            var colorOrange2 = "#FAA600";
            var colorOrange1 = "#FABA00";

            var colorBlue4 = "#294270";
            var colorBlue3 = "#006CA9";
            var colorBlue2 = "#65A1CF";
            var colorBlue1 = "#8FC7ED";

            var colorGrey4 = "#737370";
            var colorGrey3 = "#9D9E9E";
            var colorGrey2 = "#C5C6C6";
            var colorGrey1 = "#EBEDED";

            var colorWhite = "#FFFFFF";

            var x0 = options["x0"] || 10;
            var y0 = options["y0"] || 10;
            var radius = options["radius"] || 20;
            var paddingX = options["paddingX"] || 10;
            var paddingY = options["paddingY"] || 10;

            var sizeX = x0 * 2 + 6 * radius * 2 + paddingX * 7;
            var sizeY = y0 * 2 + 5 * radius * 2 + paddingY * 4;

            var attrCircle = {'stroke': colorBlue4, 'stroke-width': 2};
            var attrNumber = {'fill': colorBlue3, 'font-size': radius * 1.5, 'font-family': 'Verdana'};
            var attrNumber2 = {'fill': colorBlue3, 'font-size': radius * 3, 'font-family': 'Verdana'};

            var paper;
            var circleSet;
            var numberSet;

            var lens = [2, 4, 3, 4, 3, 4];
            var colStart = [0, 2, 6, 9, 13, 16];
            var colMax = [3, 10, 6, 10, 6, 10];

            var obj = this;

            this.createNumbset = function (dom, data) {
//                sizeX = x0 * 2 + 12 * radius;
                sizeY = y0 * 2 + radius * 2;
                paper = Raphael(dom, sizeX, sizeY, 0, 0);
                numberSet = paper.set();
                var x = x0 + radius;
                var c = 0;
                for (var i = 0; i < data.length; i++) {
                    var t = paper.text(x, sizeY / 2, data[i]).attr(attrNumber2);
                    t.col = c++;
                    numberSet.push(t);
                    x += radius * 2 + paddingX;
                    if (i % 2 === 1) {
                        x += paddingX;
                    }
                }
                paper.text(x0 + 4 * radius + 2 * paddingX, sizeY / 2, ":").attr(attrNumber2);
                paper.text(x0 + 8 * radius + 5 * paddingX, sizeY / 2, ":").attr(attrNumber2);
            };


            this.createCanvas = function (dom, data, hideNumb) {
                hideNumb = hideNumb || false;
                var h = 1;
                if (hideNumb) {
                    sizeY = y0 * 2 + 4 * radius * 2 + paddingY * 4;
                    h = 0;
                }
                paper = Raphael(dom, sizeX, sizeY, 0, 0);
                circleSet = paper.set();
                numberSet = paper.set();
                var x = x0 + radius;
                for (var i = 0; i < lens.length; i++) {
//                    var tempSet = paper.set();
                    var numb = parseInt(data[i]);
                    if (!hideNumb) {
                        var t = paper.text(x, sizeY - y0 - radius, numb).attr(attrNumber);
                        t.col = i;
                        numberSet.push(t);
                    }
                    for (var j = 0; j < lens[i]; j++) {
                        var c = paper.circle(x,
                            sizeY - y0 - radius - ((j + h) * (2 * radius + paddingY)),
                            radius).attr(attrCircle);
                        if (numb % 2) {
                            c.attr('fill', colorGrey3);
                            c.bit = 1;
                        }
                        else {
                            c.attr('fill', colorWhite);
                            c.bit = 0;
                        }
                        c.col = i;
                        c.row = j;
                        numb = Math.floor(numb / 2);
                        circleSet.push(c);
                    }
                    x += radius * 2 + paddingX;
                    if (i % 2 === 1) {
                        x += paddingX;
                    }

                }
            };

            this.remove = function() {
                if (paper) {
                    paper.remove();
                    paper = null;
                }
            };

            this.createFeedback = function () {
                numberSet.click(function () {

                    var numb = Number(this.attr("text"));
                    var col = this.col;
                    numb = (numb + 1) % colMax[col];
                    if (col == 1 && numberSet[0].attr("text") == 2 && numb > 3) {
                        numb = 0;
                    }
                    if (col == 0 && numb == 2 && numberSet[1].attr("text") > 3) {
//                        circleSet[2].attr('fill', colorGrey3);
//                        circleSet[3].attr('fill', colorGrey3);
//                        circleSet[4].attr('fill', colorWhite);
//                        circleSet[5].attr('fill', colorWhite);
                        numberSet[1].attr("text", 3);
                    }
                    this.attr("text", numb);
//                    for (var j = 0; j < lens[col]; j++) {
//                        var c = circleSet[colStart[col] + j];
//                        if (numb % 2) {
//                            c.attr('fill', colorGrey3);
//                        }
//                        else {
//                            c.attr('fill', colorWhite);
//                        }
//                        numb = Math.floor(numb / 2);
//                    }
                })
            };

            this.randomData = function () {
                var data = zeroFill(Math.floor(Math.random() * 23), 2) +
                    zeroFill(Math.floor(Math.random() * 59), 2) +
                    zeroFill(Math.floor(Math.random() * 59), 2);
                for (var i = 0; i < lens.length; i++) {
                    var numb = parseInt(data[i]);
                    numberSet[i].attr("text", numb);
//                    for (var j = 0; j < lens[i]; j++) {
//                        var c = circleSet[colStart[i] + j];
//                        if (numb % 2) {
//                            c.attr('fill', colorGrey3);
//                        }
//                        else {
//                            c.attr('fill', colorWhite);
//                        }
//                        numb = Math.floor(numb / 2);
//                    }
                }
            };

            this.gatherData = function () {
                var res = "";
                for (var i = 0; i < 6; i++) {
                    if (i && i % 2 == 0) {
                        res += ":";
                    }
                    res += numberSet[i].attr("text");
                }
                return res;
            }

        }

        var io = new extIO({
            functions: {
                js: 'morseClock',
                python: 'checkio'
            },
            animation: function($expl, data){
                var explanation = data.ext?data.ext.explanation:undefined;
                if (!explanation){
                    return;
                }
                var canvas = new MorseClockCanvas();
                canvas.createCanvas($expl[0], explanation);
            },
            tryit:function (this_e) {
                $tryit = this_e.extSetHtmlTryIt(this_e.getTemplate('tryit'));

                tCanvas = new MorseClockCanvas({
                    radius: 12, paddingX: 8
                });
                tCanvas.createNumbset($tryit.find(".tryit-canvas")[0], "103749");

                tCanvas.createFeedback();

                rCanvas = new MorseClockCanvas({
                    radius: 12, paddingY: 5, paddingX: 8, y0: 3
                });

                $tryit.find(".bn-random").click(function (e) {
                    tCanvas.randomData();
                });
                $tryit.find(".tryit-canvas").mousedown(function (e) {
                    e.originalEvent.preventDefault();
                });
                $tryit.find(".bn-check").click(function (e) {
                    this_e.extSendToConsoleCheckiO(tCanvas.gatherData());
                    e.stopPropagation();
                    return false;
                });
            },
            retConsole: function (ret) {
                var parsed = ret.match(/\'([.-]{2}) ([.-]{4}) : ([.-]{3}) ([.-]{4}) : ([.-]{3}) ([.-]{4})\'/);
                rCanvas.remove();
                $tryit.find(".result-canvas").text("");
                if (!parsed) {
                    $tryit.find(".result-canvas").text("The result has wrong format.")
                }
                else {
                    var data = "";
                    for (var i = 1; i < 7; i++) {
                        var temp = 0;
                        var morse = parsed[i];
                        var ml = morse.length;
                        for (var j = 0; j < morse.length; j++){
                            temp += morse[j] == "-" ? Math.pow(2, ml - j - 1) : 0;
                        }
                        data += temp;
                    }
                    rCanvas.createCanvas($tryit.find(".result-canvas")[0], data, true);
                }
                $tryit.find(".checkio-result").html("Result<br>" + ret);
            }
        });
        io.start();

    }
);
