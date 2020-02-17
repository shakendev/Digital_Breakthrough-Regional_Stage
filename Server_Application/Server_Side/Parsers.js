// Класс, реализующий парсинг и обработку XML файла
function Parsers() {
	
	// Локальные переменные без noscope видимости вне класса
	
	//this.xmlParser = new XMLHttpRequest();
	
}


// Метод парсинга XML файла
Parsers.prototype.parseData = function () {
	return new Promise((resolve, reject) => {
		// объявление объекта с данными
		let ParsedData = new Object;
		
		// Проверка исключения
		if (Object.keys(ParsedData).length !== 0) {
			resolve(ParsedData);
		} else {
			reject(new Error("Error parsing xml file"));
		}
	});
}



// Метод обработки, разобранного на части XML файла
Parsers.prototype.unwrapAndCreateJSON = function (parsedData) {
	return new Promise((resolve, reject) => {
		// Объявление объекта с данными
		let UnwrapedData = new Object;
		
		// Проверка исключения
		if (Object.keys(UnwrapedData).length !== 0) {
			resolve(UnwrapedData);
		} else {
			reject(new Error("Error unwrap date and create JSON"));
		}
	});
}


// Экспорт модуля
module.exports = Parsers;