const textEncoder = new TextEncoder();

const parseCSV = (csv) => {
    let data = [];
    let lines = csv.split("\n");
    let row = lines.length - 1;
    let col = lines[0].split(",").length;

    console.log(row,col);
    for(let i = 0; i< row; i++) {
        data[i] = lines[i].split(",");
    }

    console.log(data);

    return {"row":row,"col":col,"data":data};
}

export const readSheet =(input) => {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.readAsBinaryString(input.files[0]);

        reader.onload = function () {
            try {
                let data = reader.result;
                let workBook = XLSX.read(data, { type: 'binary' });
                let results = [];

                workBook.SheetNames.forEach(function (sheetName) {
                    let csv = XLSX.utils.sheet_to_csv(workBook.Sheets[sheetName]);
                    results.push(parseCSV(csv));
                });

                resolve(results);
            } catch (error) {
                reject(error);
            }
        };

        reader.onerror = function (error) {
            reject(error);
        };
    });
}

export const writeSheet = (data) => {
    const wb = XLSX.utils.book_new();

// 워크시트 생성
    const ws = XLSX.utils.aoa_to_sheet(data);

// 워크시트를 워크북에 추가
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

// 파일로 내보내기
    XLSX.writeFile(wb, "MySheet.xlsx");
}