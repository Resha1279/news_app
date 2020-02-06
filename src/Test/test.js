
function generateRandomId() {
    return Math.random().toString(36).substring(2) + new Date().getTime().toString(36);
}

function insertAds(items, interval) {
    if (items.length>0){
        let freq = interval + 1;
        let new_length = items.length + parseInt(items.length / freq) + 1;
        let new_list = [];
        let items_iter = items.entries();
        for (let i = 1; i < new_length; i++) {
            if (i % freq === 0) {
                const ads_data = {type: 'ads', id: generateRandomId()};
                new_list.push(ads_data)
            } else {
                const next = items_iter.next();
                if (!next.done){
                    const item = next.value[1];
                    const type = item.thumb_url&&item.thumb_url !== ""?"withImage":"withoutImage";
                    new_list.push({...item, type: type})
                }
            }
        }
        new_list.push({type: 'ads', id: generateRandomId()});
        return new_list;
    }

}

function insertAdsFeeds(items, interval) {
    if (items.length> 0){
        const no_of_ads = parseInt(items.length / interval);
        let insert_index = interval;
        for (let i = 1 ; i < no_of_ads+1; i++){
            const ads_data = {type: 'ads', id: generateRandomId()};
            items.splice(insert_index,0,ads_data);
            insert_index = insert_index+interval+1;
        }
        return items;
    }
    return items;
}
function hiliter(word, element) {
    var rgxp = new RegExp(word, 'g');
    var repl = `<b class="highlightedText"> ` + word + '</b>';
    return element.replace(rgxp, repl);
}

var i = 0;
const item = ()=>({name:Date.now()+i,index:i++});
const interval = 3;
const items = [item(),item(),item(),item(),item(),item(),item(),item(),item(),item(),item(),item(),item(),item(),item(),item(),item(),item()];
// console.log("original length : ", items.length);
// const result = insertAdsFeeds(items, interval);
// console.log("new length : ", result.length);
const obj = {items:{length:{index:10}}};
const html = `<p style="text-align: justify;">२९ साउन, वीरगञ्ज । नेपाल-भारत पेट्रोलियम पाइपलाइनको काम तीब्र गतिमा भइरहेको छ ।</p>
<p style="text-align: justify;">मोतिहारी-अमलेखगञ्ज पेट्रोलियम परियोजना अन्तर्गत रक्सौलदेखि अमलेखगञ्जसम्म १६ किलेामिटर खण्डमा पाइप गाड्ने काम सम्पन्न भइसकेको छ ।</p>`;
const result  = hiliter('मोतिहारी-अमलेखगञ्ज पेट्रोलियम परियोजना अन्तर्गत रक्सौलदेखि अमलेखगञ्जसम्म १६ किलेामिटर खण्डमा पाइप गाड्ने काम सम्पन्न भइसकेको छ',html);

// var read = require('node-readability');
// console.log(parseInt(5));

// var article_extractor = require("article-extractor");
// article_extractor.extractData('https://nagariknews.nagariknetwork.com/news/57232/', function (err, data) {
//     console.log(data);
// });

// var {
//     extract
// } = require('article-parser');
//
// let url = 'https://nagariknews.nagariknetwork.com/news/55125/';
//
// extract(url).then((article) => {
//     console.log(article);
// }).catch((err) => {
//     console.log(err);
// });
original_text = "This is the original text hello hi namaste text hello hi namaste";
highlight_text = "original ";

var rgxp = /(\w+)/g;
var orginal_text_list = original_text.match(rgxp);
var highlight_text_list = highlight_text.match(rgxp);
var num_matches = 0;
orginal_text_list.forEach(text=>{
   highlight_text_list.forEach(t=>{
       if (text === t){
           num_matches++
       }
   })
});

function highlightCondition(num_matches) {
    return num_matches / highlight_text_list.length * 100 > 90;
}


var moment_tz = require("moment-timezone");
var moment = require("moment");
let datetime_1 = Date.now();

let datetime_2 = moment("2000-09-24");
console.log(parseFloat("1"));

