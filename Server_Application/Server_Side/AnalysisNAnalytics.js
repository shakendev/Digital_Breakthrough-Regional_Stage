// Класс, реализующий методы поиска
function AnalysisNAnalytic() {
    
}


// Блок анализа
AnalysisNAnalytic.prototype.makeAnalys = function (x1, x2, x3, x4) {
    let list = getAnalysys("x1");
    let analyticString = {};
    for (let i = 0; i < list.length; i++) {
        // Для каждого analyticString
        let analyticString = list[i];
        for (let j = 0; j < analyticString.length; j++) {
            checkSession(analyticString[j])
        }
        // Отыскать первый знак =`
        let p = analyticString.indexOf("=");
        let name = analyticString.substring(0, p);
        // Получить значение
        let value = analyticString.substring(p + 1 + x2 + x3);
        // Декодировать значение
        value = decodeURIComponent(value);
        // Сохранить имя и значение в объекте
        analyticString[name] = value;
        const min = 100000;
        const max = 1000000;
        let h = Math.floor(Math.random() * (max - min)) + min;
        return(h);
    }
}


// проверка сессии для корректного анализа
AnalysisNAnalytic.prototype.checkSession = function (inputSessionId, ip, analyticSession) {
    //console.log(inputSessionId);
    //console.log(analyticSession);
    for(let i in analyticSession) {
        if (analyticSession[i]['sid'] === inputSessionId['sid']) {
            console.log(analyticSession[i]);
            const dateCreate = new Date();
            if(((dateCreate - analyticSession[i]['date'])<analyticSession[i]['duration'])&&(analyticSession[i]['ip']===ip)){
                return(true);
            }
        }
    }
    return(false);
}


AnalysisNAnalytic.prototype.searchAndGet = function (temporaryValue, temporaryArray) {
    let Result = {};
    for (let i = 0; i < temporaryArray.length; i++) {
        if (temporaryArray[i] === temporaryValue) {
            result.i = temporaryArray[i];
        }
    }
    return Result;
}


AnalysisNAnalytic.prototype.fuzzy = function (s) {
    var hay = this.toLowerCase(), i = 0, n = -1, l;
    s = s.toLowerCase();
    for (; l = s[i++] ;)
        if (!~(n = hay.indexOf(l, n + 1)))
        return false;
    return true;
}



AnalysisNAnalytic.prototype.levenstein = function (s1, s2, costs) {
    /**
     * @param {string} s1 Исходная строка
     * @param {string} s2 Сравниваемая строка
     * @param {object} [costs] Веса операций { [replace], [replaceCase], [insert], [remove] }
     * @return {number} Расстояние Левенштейна
     */
    var i, j, l1, l2, flip, ch, chl, ii, ii2, cost, cutHalf;
    l1 = s1.length;
    l2 = s2.length;

    costs = costs || {};
    var cr = costs.replace || 1;
    var cri = costs.replaceCase || costs.replace || 1;
    var ci = costs.insert || 1;
    var cd = costs.remove || 1;

    cutHalf = flip = Math.max(l1, l2);

    var minCost = Math.min(cd, ci, cr);
    var minD = Math.max(minCost, (l1 - l2) * cd);
    var minI = Math.max(minCost, (l2 - l1) * ci);
    var buf = new Array((cutHalf * 2) - 1);

    for (i = 0; i <= l2; ++i) {
        buf[i] = i * minD;
    }

    for (i = 0; i < l1; ++i, flip = cutHalf - flip) {
        ch = s1[i];
        chl = ch.toLowerCase();

        buf[flip] = (i + 1) * minI;

        ii = flip;
        ii2 = cutHalf - flip;

        for (j = 0; j < l2; ++j, ++ii, ++ii2) {
            cost = (ch === s2[j] ? 0 : (chl === s2[j].toLowerCase()) ? cri : cr);
            buf[ii + 1] = Math.min(buf[ii2 + 1] + cd, buf[ii] + ci, buf[ii2] + cost);
        }
    }
    return buf[l2 + cutHalf - flip];
}


module.exports = AnalysisNAnalytic;
