var util = {};
(function() {
    //两点间的距离
    util.len = function(start, end){
        var w = end.left-start.left
        var h = end.top-start.top;
        return Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2));
    };
})();