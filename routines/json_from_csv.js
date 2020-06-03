import papaparse from '../node_modules/papaparse/papaparse.js';

const csvData = papaparse.parse(open('../test_data/small_example.csv'), { header: true });

export default function(){
let nfi_json = csvData.data[0]
//console.log(nfi_json)


let my_json = nfi_json.id
console.log(my_json)


return nfi_json
}
