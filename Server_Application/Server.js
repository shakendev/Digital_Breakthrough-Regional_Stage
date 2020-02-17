// It is a main file which include some functions and methods for working with HTML

// Подключение фреймворка express
const Express = require("express");
// Подключение фреймворка body-parser
const BodyParser = require("body-parser");
// Объявление номера прослушки порта сервера
const PORT = process.env.PORT || 8080;

// Создание экземпляра Express
const server = Express();

// Создание экземпляра BodyParser
const urlencodedParser = BodyParser.urlencoded({
	extended: false
});


// Подключение фреймворков
// Парсер XML
const Parsers = require("./Server_Side/Parsers.js");
const parser = new Parsers();

// Аналитика и обработка данных
const AnalysisNAnalytics = require("./Server_Side/AnalysisNAnalytics.js");
const calculateData = new AnalysisNAnalytics();

// Обработка базы данных Postgres SQL
const PostgreSQL = require("./Server_Side/PostgreSQL.js");
const database = new PostgreSQL();



// Определение пути для которого производится прослушка порта
server.use(Express.static(__dirname + "/Client_Side/main"));



// Подключение на прослушку стартовой формы HTML
server.get("/", urlencodedParser, (request, response) => {
	response.sendFile(__dirname + "/Client_Side/main/index.html");
});



server.use("/state", Express.static('Client_Side/procurements/'));


// Подключение страницы на прослушку формы HTML с гос закупками, ее делает Л. С.
server.get("/state", urlencodedParser, (request, response) => {
	response.sendFile(__dirname + "/Client_Side/procurements/");
});



// GET запрос на обработку формы
server.get("/searchPurchase", urlencodedParser, (request, response) => {

	// Ошибка выполнения 400
	if (!request.query) {
		return response.sendStatus(500);
	}

	let purchaseNumber = request.query["purchaseNumber"];

	// Здесь будет основная обработка
	database.searchPurchaseByIDAndGetProcurementList(purchaseNumber)
		.then(result => {
			//console.log(result);
			console.log(result);
			response.send(result);
		})
		.catch(error => {
			response.send(error.message);
		});
});



server.use("/approve", Express.static('Client_Side/review/'));


// POST запрос на роутинг формы с отзывом
server.get("/approve", urlencodedParser, (request, response) => {
	response.sendFile(__dirname + "/Client_Side/review/index.html");
});



// Выставление порта на прослушку
server.listen(PORT);



// Вывод статуса сервера
console.log("Server is started...");
