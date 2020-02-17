function request(purchase_ID) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', "http://localhost:8080/searchPurchase?purchaseNumber=" + purchase_ID, false);
    xhr.send();
    return xhr.responseText;
}


$(function () {
    $("#textarea1_seach").keypress(function (e) {
        if (e.which == 13) {
            $("#chatbox").append($(this).val() + "<br/>");
            e.preventDefault();
            data_json = request(this.value);
            data_json = JSON.parse(data_json);
            fill_common_fields(data_json);
            fill_card(data_json);
            document.getElementById("context_1").style = "display: none";
            document.getElementById("context_2").style = "display: block";
            $(this).val("");
        }
    });
});

function fill_card(data_json) {
    data_json = data_json.procurement;
    card_div = document.getElementById("all_card");
    for (let i in data_json) {
        var card = document.createElement('div');
        card.innerHTML = "<div class=\"col m11\">\n" +
            "                    <div class=\"col m11\">\n" +
            "                        <div class=\"card horizontal\">\n" +
            "                            <div class=\"card-stacked \" >\n" +
            "                                <div class=\"card-content modal-trigger\" href=\"#modal1\">\n" +
            "                                    <p>" + data_json[i]['description'] + "</p>\n" +
            "                                </div>\n" +
            "                                <div class=\"card-action\">\n" +
            "                                    <a href=\"#\">Подробно о компании</a>\n" +
            "                                </div>\n" +
            "                            </div>\n" +
            "                            <div class=\"col m5 colla\">\n" +
            "                                <ul class=\"collapsible\">\n" +
            "                                    <li>\n" +
            "                                        <div class=\"collapsible-header\">\n" +
            "                                            <i class=\"large material-icons\">sentiment_very_satisfied</i>\n" +
            "                                            Положительные отзывы\n" +
            "                                            <span class=\"new badge green\">" + data_json[i]['review']['plus'].length + "</span></div>\n" +
            "                                        <div class=\"collapsible-body list\">\n" +
            "                                            <div id='" + data_json[i]['purchaseID'] + "_good' class=\"collection\">\n" +
            " " + get_list(data_json[i]['review']['plus']) + " \n" +
            // "                                                <a href=\"#!\" class=\"collection-item\">Работу выполнил раньше срока</a>\n" +
            // "                                                <a href=\"#!\" class=\"collection-item \">Всё чисто и хорошо после работы</a>\n" +
            // "                                                <a href=\"#!\" class=\"collection-item\">Ребята молодцы</a>\n" +
            // "                                                <a href=\"#!\" class=\"collection-item\">Работали очень хорошо</a>\n" +
            "                                            </div>\n" +
            "                                        </div>\n" +
            "                                    </li>\n" +
            "                                    <li>\n" +
            "                                        <div class=\"collapsible-header\">\n" +
            "                                            <i class=\"large material-icons\">sentiment_neutral</i>\n" +
            "                                            Предупреждение\n" +
            "                                            <span class=\"new badge yellow\">" + data_json[i]['review']['neutral'].length + "</span></div>\n" +
            "                                        <div class=\"collapsible-body list\">\n" +
            "                                            <div id='" + data_json[i]['purchaseID'] + "_neutral' class=\"collection\">\n" +
            " " + get_list(data_json[i]['review']['neutral']) + " \n" +
            // "                                                <a href=\"#!\" class=\"collection-item\">Работу выполнил раньше срока</a>\n" +
            // "                                                <a href=\"#!\" class=\"collection-item \">Всё чисто и хорошо после работы</a>\n" +
            // "                                                <a href=\"#!\" class=\"collection-item\">Ребята молодцы</a>\n" +
            // "                                                <a href=\"#!\" class=\"collection-item\">Работали очень хорошо</a>\n" +
            "                                            </div>\n" +
            "										</div>\n" +
            "                                    </li>\n" +
            "                                    <li>\n" +
            "                                        <div class=\"collapsible-header\">\n" +
            "                                            <i class=\"large material-icons\">sentiment_very_dissatisfied</i>\n" +
            "                                            Отрицательные отзывы\n" +
            "                                            <span class=\"new badge red\">" + data_json[i]['review']['minus'].length + "</span></div>\n" +
            "                                        <div class=\"collapsible-body list\">\n" +
            "                                            <div id='" + data_json[i]['purchaseID'] + "_bad' class=\"collection\">\n" +
            " " + get_list(data_json[i]['review']['minus']) + " \n" +
            // "                                                <a href=\"#!\" class=\"collection-item\">Работу выполнил раньше срока</a>\n" +
            // "                                                <a href=\"#!\" class=\"collection-item \">Всё чисто и хорошо после работы</a>\n" +
            // "                                                <a href=\"#!\" class=\"collection-item\">Ребята молодцы</a>\n" +
            // "                                                <a href=\"#!\" class=\"collection-item\">Работали очень хорошо</a>\n" +
            "                                            </div>\n" +
            "</div>\n" +
            "                                    </li>\n" +
            "                                </ul>\n" +
            "                            </div>\n" +
            "                            <div class=\"col m3 colla\">\n" +
            "                            " + get_desicion_card(data_json, i) + "\n" +
            "                            </div>\n" +
            "                        </div>\n" +
            "                    </div>\n" +
            "                </div>";

        card_div.appendChild(card);
    }
}

function get_list(data_json) {
    var line = '';
    for (var j in data_json) {
        line = line + '<a href="#!" class="collection-item">' + data_json[j] + '</a>';
        // alert(line)
    }
    return line
}

function get_desicion_card(data_json, i) {
    data_json_buf = data_json[i]['review'];
    data_json_buf = data_json[i];
    if (data_json_buf['resultReview'] === 'A') {
        return '<img src="/state/img/' + 'brilliant.png' + '" alt="" width="200" height="200" >'
    }

    if (data_json_buf['resultReview'] === 'B') {
        return '<img src="/state/img/' + 'question.png' + '" alt="" width="200" height="200" >'
    }

    if (data_json_buf['resultReview'] === 'C') {
        return '<img src="/state/img/' + 'warning.png' + '" alt="" width="200" height="200" >'
    }

}

function fill_common_fields(data_json) {
    document.getElementById("create_time").innerHTML = data_json.purchase.create_time;
    document.getElementById("purchase").innerHTML = "Закупка №" + data_json.purchase.ID;
    document.getElementById("purchase").innerHTML = "Закупка №" + data_json.purchase.ID;
    document.getElementById("vendor_determination_method").innerHTML = data_json.purchase.vendor_determination_method;
    document.getElementById("name_of_the_electronic_platform").innerHTML = data_json.purchase.name_of_the_electronic_platform;
    document.getElementById("e_platform_address").innerHTML = data_json.purchase.e_platform_address;
    document.getElementById("accommodation_provides").innerHTML = data_json.purchase.accommodation_provides;
    document.getElementById("name_of_the_object_of_purchase").innerHTML = data_json.purchase.name_of_the_object_of_purchase;
    document.getElementById("procurement_stage").innerHTML = data_json.purchase.procurement_stage;
    document.getElementById("information_about_relationship").innerHTML = data_json.purchase.information_about_relationship;
    document.getElementById("number_type_contract").innerHTML = data_json.purchase.number_type_contract;
}

window.onload = function () {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);

    document.addEventListener('click', function () {
        var elems = document.querySelectorAll('.collapsible');

        var instances = M.Collapsible.init(elems, {
            inDuration: 500,
            outDuration: 500
        });
    });
};
