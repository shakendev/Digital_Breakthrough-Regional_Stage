// Класс по обработке данных для базы данных
function PostrgeSQL() {

	// Импорт фреймворка для работы с файловой системой
	const FileSystem = require('fs');

	// Инициализация бд
	const PATH_TO_PURCHASES = "purchases.json";
	const PATH_TO_PROCUREMENT = "procurement.json";

	this.purchases = JSON.parse(FileSystem.readFileSync(`Server_Side/data/${PATH_TO_PURCHASES}`));
	this.procurement = JSON.parse(FileSystem.readFileSync(`Server_Side/data/${PATH_TO_PROCUREMENT}`));

}



// Поиск закупки по ID и получение предложений от поставщиков
PostrgeSQL.prototype.searchPurchaseByIDAndGetProcurementList = function (purchaseNumber) {
	return new Promise((resolve, reject) => {
		let temporaryObject = {};
		for (let element in this.purchases) {
			if (this.purchases[element]['ID'] === purchaseNumber) {
				temporaryObject.purchase = this.purchases[element];
				break;
			}
		}
		if (Object.keys(temporaryObject).length !== 0) {
			let temporaryArray = [];
			for (let element in this.procurement) {
				if (this.procurement[element]["purchaseID"] === purchaseNumber) {
					temporaryArray.push(this.procurement[element]);
					console.log(this.procurement[element]["review"]);
				}
			}
			temporaryObject.procurement = temporaryArray;
			resolve(temporaryObject);
		} else {
			reject(new Error("Error search or get procurement list"));
		}
	});
}



// Экспорт класса
module.exports = PostrgeSQL;
