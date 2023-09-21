let text = document.querySelector('textarea');
let btn = document.querySelector('button');
let btmul = document.querySelector('ul');
let svg = document.querySelector('.svg');

let localupc = JSON.parse(localStorage.getItem('UPC CODE'))
let lastupc = localupc? localupc[localupc.length-1].UPC : ''
let upc = localupc || [{name: '初始值',UPC:29500800000}];
let iniupc = parseInt(lastupc.substring(0,lastupc.length-1)) || 29500800000;

// localStorage.clear('UPC CODE');


btn.addEventListener('click', function(){
    if(text.value.length>0){
        
        // 如果ul中有資料就先刪除
        // if(btmul.hasChildNodes()){
        //     btmul.innerHTML = ''
        // }
        // 但好像直接清除就好不需要條件?
        btmul.innerHTML = ''


        // 製造節點 & SHOW在右邊
        createnode('btmli','name','ITEM#','barcode','UPC','icon','Show UPC');



        // 將利用\n拆分出陣列
        let space = text.value.split('\n');
        

        // 利用目前upc資料進行迴圈
        upc.forEach(
            (e) => {
                // 若sapce中的資料與upc的資料中的名稱相同
                // 推入新陣列並create節點載入重複值
                if(space.includes(e.name)){
                    let dup = [];
                    dup.push(e.name);
                    createnode('dupli','name',e.name,'barcode',e.UPC,'icon click','Click');

                    // 在space陣列中刪除與upc名稱相同的資料
                    let index = space.indexOf(e.name);
                    space.splice(index,1);
                    
                }
            }
        )


        
        // 去除重複值後的space陣列進行迴圈
        space.forEach(
            (e) => {
                if(e!==''){
                    // 製造出物件(NAME & UPC)並推入陣列 & 存入localStorage
                    let random = Math.floor(Math.random()*10);
                    let d = {};
                    d.name = e;
                    d.UPC = ++iniupc+`${random}`;
                    upc.push(d);
                    localStorage.setItem('UPC CODE',JSON.stringify(upc));


                    // 製造物件中item# & upc的節點並show在右邊
                    createnode('','name',e,'barcode',d.UPC,'icon click','Click');
                }
            }
        )
        showbarcode();
        text.value ='';
    }
})



function createnode(liclassname,nameclassname,nametext,upcclassname,upctext,iconclassname,icontext){

    let btmli = document.createElement('li');
    btmli.className = liclassname;
    let liname = document.createElement('div');
    liname.className = nameclassname;
    liname.textContent = nametext;
    let libarcode = document.createElement('div');
    libarcode.className = upcclassname;
    libarcode.textContent = upctext;
    let icon = document.createElement('div');
    icon.className = iconclassname;
    icon.textContent = icontext;

    
    btmli.appendChild(liname);
    btmli.appendChild(libarcode);
    btmli.appendChild(icon);
    // btmli.append(liname,libarcode);
    btmul.appendChild(btmli);
}



let create = document.querySelector('.create');
let list = document.querySelector('.list');


create.addEventListener('click',function(){
    btmul.innerHTML = '';
    text.style.display = 'inline-block';
    btn.style.display = 'inline-block';
    svg.style.display = 'none';
    btmul.classList.remove('ullist')
})


list.addEventListener('click',function(){
    btmul.innerHTML = '';
    text.style.display = 'none';
    btn.style.display = 'none';
    svg.style.display = 'none';
    btmul.classList.add('ullist');

    createnode('btmli','name','ITEM#','barcode','UPC','icon','Show UPC');

    for(let i =1;i<upc.length;i++){
        createnode('','name',upc[i].name,'barcode',upc[i].UPC,'icon click','Click');
    }
    showbarcode();
})


function showbarcode(){
    // querySelectorAll回傳的是物件Node List, 為類陣列
    // 轉換成陣列方法有2
    // Array.apply(null, nodelist);
    // [...document.querySelectorAll('div')]
    let showupc = [...document.querySelectorAll('.icon')];
    let upctext = [...document.querySelectorAll('.barcode')];

    let greyscreen = document.querySelector('.allgrey');
    showupc.forEach(
        e => {
            e.addEventListener('click', function(){
                let index = showupc.indexOf(e);
                let upcshow = upctext[index].textContent;

                svg.style.display = 'inline-block';
                greyscreen.style.display = 'block'
                
                JsBarcode(".upcpic", upcshow, {
                    // format: "UPC",
                    lineColor: "#0aa",
                    width: 3,
                    height: 70,
                    background: 'white'
                  });
            })
        }
    )

    document.addEventListener('click',function(e){
        let greyscreen = document.querySelector('.allgrey');
        if(greyscreen===e.target){
            greyscreen.style.display = 'none';
            svg.style.display = 'none'
        }
    })

    
}

// JsBarcode(".upcpic", '295008000017', {
//     format: "EAN13",
//     lineColor: "#0aa",
//     width: 1.5,
//     height: 40,
//     background: 'transparent'
//   });
