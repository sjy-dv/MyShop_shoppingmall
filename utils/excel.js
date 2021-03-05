const exceljs = require('exceljs');

module.exports = (function () {
  const E = {};

  E.CreateXlsx = async (object) => {
    const workbook = await new exceljs.Workbook();
    const sheet = await workbook.addWorksheet('매출 정산표.');
    sheet.columns = [
      { headers: '순번' },
      { headers: '판매된 상품' },
      { headers: '판매 가격' },
      { headers: '결제 수단' },
      { headers: '구매자' },
    ];
    const xlsxfile = () => {
      let xlsxobj = [];
      for (var keys in object) {
        let value = object[Object.keys(object)[keys]];
        let idx = JSON.stringify(value.idx);
        let p_name = JSON.stringify(value.p_name);
        let p_price = JSON.stringify(value.p_price);
        let pg_name = JSON.stringify(value.pg_name);
        let buyer = JSON.stringify(value.buyer);
        xlsxobj.push([idx, p_name, p_price, pg_name, buyer]);
      }
      sheet.addRows(xlsxobj);
      workbook.xlsx.writeFile(`${Date_NOW()}_매출 정산표`);
    };
    xlsxfile();
    if (!xlsxfile) console.log('xlsx created error!');
  };

  return E;
})();
