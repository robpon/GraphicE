var object = document.getElementById("canvas");
var objects = ['background'];
var type = "background";
var types = ['background'];
var finalWidth = 0;
var finalHeight = 0;
var oldLength = 1;
var x = 0;
var y = 0;
var press = false;
var drawWidth = 1;
var drawColour = "black";
var drawOpacity = "100";
var proportion =  0;
var editType = 0;
var cutType = 0;
var objX = 0;
var objY = 0;
var style = "blur(0px) brightness(100%) contrast(0%) drop-shadow(0) " +
    "grayscale(0%) hue-rotate(0%) invert(0deg) opacity(0%) saturate(0%) sepia(0%)";
var filtersArray = ["null"];
var filter;
var chosenFunction = ["null"];
function get_cookies(name){
    var cookie;
    var cookies = document.cookie.split(';');
    for(var i =0; i < cookies.length; i++){
        var c = cookies[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if(c.indexOf(name)==0){
            return  cookie = c.substring(name.length+1, c.length);
        }
    }
    return null;
}
var height = get_cookies("height");
var width = get_cookies("width");
var cont = document.getElementById("canvas");
    scaling();
function scaling() {
    var height = window.innerHeight;
    var width =window.innerWidth;


    $("#functions-div").width(width*0.3);
    var height1 = height*0.7;
    var width1 = width*0.7;


    if((this.width/width1)>=(this.height/height1)) {
        proportion = (this.width / width1);
        finalWidth = ((this.width) / proportion) ;
        finalHeight = ((this.height) / proportion);

    }else{
        proportion = (this.height / height1);
        finalWidth = ((this.width) / proportion );
        finalHeight = ((this.height) / proportion );
    }
    $("#contents").width(finalWidth);
    $("#contents").height(finalHeight);




}
cont.height = parseInt(finalHeight+1);
cont.width = parseInt(finalWidth+1);
cont = document.getElementById("canvas1");
cont.height = parseInt(finalHeight+1);
cont.width = parseInt(finalWidth+1);
/*$(window).resize(function () {
  scaling();

});*/
/*function add_layer(){
    var container = document.createElement("div");
    var number = document.createElement("div");
    var hiddenContainer = document.createElement("div");
    var hidden = document.createElement("input");
    var name = document.createElement("input");
    container.id="layer"+layers.length.toString();
    number.id = layers.length.toString();
    hidden.id = "hidden"+layers.length.toString();
    hidden.type = "checkbox";
    container.className = "background";
    container.appendChild(number);
    var length = layers.length;
    container.onclick=function (){
        chooseLayer(length);
    };c
    hiddenContainer.appendChild(hidden);
    container.appendChild(hiddenContainer);
    container.appendChild(name);
    document.getElementById("list").appendChild(container);
    var layer = document.createElement("div");
    var edits = document.getElementById("contents");
layer.id = "layeredit"+(layers.length+1).toString();
layer.className = "layer";
//layer.style.zIndex = (edits.style.zIndex+layers.length+4);
edits.appendChild(layer);
    layers.push("layer"+layers.length.toString());
}*/
function newObject(object){
    switch (object){
        case 'sketch':
create("canvas");
            break;
        case 'photo':
            create('img');
            break;
        case 'title':
            create('p');
            break;
    }
}
var contents = document.getElementById("contents");
contents.addEventListener("mousedown", ev => {
        x = ev.offsetX;
        y = ev.offsetY;
        press = true;
    }
);
function create(type){
    var doc = document.createElement(type);
    switch (type){
        case "canvas":
            doc.height  = finalHeight+1;
            doc.width = finalWidth+1;
            doc.id = "ob"+objects.length.toString();
            document.getElementById("contents").insertBefore(doc, cont);
            types.push("canvas");

            break;
        case "img":
            var doc1 = document.querySelector("input[type=file]").files[0];
            var div = document.createElement("div");
            div.className = "img1";
              var div1 = document.createElement("div");
            div1.className = "img2";

            var img = document.createElement('img');
            var reader = new FileReader();
            reader.addEventListener("load",function (){
                img.src = reader.result;
                img.disabled = true;
                img.onload = function (){
                    //console.log(img.height);
                    if(img.height>img.width){
                        var proportion1 =img.height/(finalHeight/2); img.style.width = (img.width/proportion1)+"px";
                        img.style.height = (finalHeight/2)+"px";
                        img.width = img.width/proportion1;
                        img.height = finalHeight/2;


                    }else{
                        var proportion1 =img.width/(finalWidth/2);
                        img.style.height = (img.height/proportion1)+"px";
                        img.style.width = (finalWidth/2)+"px";
                        img.height = img.height/proportion1;
                        img.width = finalWidth/2;

                    }
                }
                    /*div.addEventListener("mousemove", e => {
                        console.log("d");
                        console.log(e.offsetY);
                        console.log(e.offsetX);
                    });*/
                    var x = 0;
                    var y = 0;
                    var x1 = 0;
                    var y1 = 0;
                    contents.addEventListener("mousedown", ev => {
                        x1 = ev.offsetX;
                        y1 = ev.offsetY;
                    });

                  /*  contents.addEventListener("mousemove", ev => {

           console.log(img);
           console.log(object);
                        if (press === true ) {

                        }

                    });*/




            }, false);

                reader.readAsDataURL(doc1);

            img.id = "ob"+objects.length.toString();
            document.getElementById("contents").insertBefore(img, cont);
            types.push("img");

            break;
        case "p":
            doc.id="ob"+objects.length.toString();
            doc.style.fontSize = (15/proportion)+"px";
            doc.style.color = "#FFF";
            doc.style.fontFamily = "Arial";
            document.getElementById("contents").insertBefore(doc, cont);
            types.push("p");
            break;

    }
    var filter1 = new filters(0,100,100,0,0,0,0,100,100,0);
    filtersArray.push(filter1);
    object = "ob"+objects.length.toString();
    addObject(objects.length, type);
    chosenFunction.push("1");

    objects.push("ob"+objects.length.toString());
   $("#newPhoto").val('');
}


/*ctx.lineWidth = 1;
ctx.beginPath();
ctx.strokeStyle = "red";
ctx.moveTo(2,3);
ctx.lineTo(20, 20);
ctx.stroke();*/

contents.addEventListener("mousemove", ev => {
console.log(chosenFunction[oldLength]);
console.log(type);
switch (type){
    case "canvas":
        if(press===true) {
            var ctx = object.getContext("2d");
            ctx.beginPath();
            ctx.strokeStyle = drawColour;
            ctx.lineWidth = (drawWidth/proportion);
            ctx.moveTo(x, y);
            ctx.lineCap = "round";
            ctx.lineTo(ev.offsetX, ev.offsetY);
            x = ev.offsetX;
            y = ev.offsetY;
            ctx.stroke();
            ctx.closePath();
        }
    case "img":

        if(press===true && editType===2){
            //console.log((ev.offsetX-object.offsetLeft));
positioning(ev.offsetX, ev.offsetY, (ev.offsetX-object.offsetLeft), (ev.offsetY-object.offsetTop));
        }else {
            cursorChanger(ev.offsetX, ev.offsetY);
            if (press === true && editType === 3) {
                sizeChanger(ev.offsetY, ev.offsetX, cutType);
            }
        }
        break;
    case "p":
        if(press===true && editType===2){
            positioning(ev.offsetX, ev.offsetY);
        }
        break;
}

});
document.getElementById("contents").addEventListener("mousedown", ev => {
press = true;
x = ev.offsetX;
y = ev.offsetY;
});
window.addEventListener("mouseup", ev => {
   press = false;
});
function addObject(length1, type){
    var container = document.createElement("div");
    //var number = document.createElement("div");
    var p = document.createElement("p");
    container.id="objects"+objects.length.toString();
    //number.id = objects.length.toString();
    p.id = "hidden"+objects.length.toString();
    p.innerHTML = "Obiekt "+objects.length;
p.className = "text1";


    container.className = "option";
    //q
    // container.appendChild(number);
    container.onclick=function (){
        chooseObject(length1);
    };
    container.appendChild(p);
    switch (type){
        case "canvas":
            container.innerHTML = container.innerHTML+ '<svg class="svg1" height="30" width="30" viewBox="0 0 60 60">' +
                '                <path d="M10 30 C10 30, 20 10 , 30 30 C30 30, 40 50, 50 30" stroke-width="4" stroke="#dbdbdb" fill="none" ></path>' +
                '            </svg>'
            break;
        case "img":
            container.innerHTML = container.innerHTML+'<svg height="30" width="30" viewBox="0 0 60 60">' +
                '                    <path d="M10 10 L50 10 L50 50 L 10 50 Z M10 40 L20 30 L30 40 L40 20 L50 35" stroke-width="4" stroke="#dbdbdb" fill="none" ></path>' +
                '                </svg>'
            break;
        case "p":
            container.innerHTML = container.innerHTML+'<svg height="30" width="30" viewBox="0 0 60 60">' +
                '                <path d="M10 50 L30 10 L50 50 M18 30 L42 30" stroke-width="4" stroke="#dbdbdb" fill="none" ></path>' +
                '            </svg>'
            break;
    }

    document.getElementById("list").appendChild(container);
}
function chooseObject(length){
    object = document.getElementById("ob"+length.toString());
    switch (type){
        case "canvas":
            document.getElementById("drawing-options").className = "hidden";
            break;
        case "img":
            document.getElementById("photo-options").className = "hidden";
            break;
        case "p":
            document.getElementById("title-options").className = "hidden";
break;

    }
    type = types[parseInt(length)];
    switch (type){
        case "canvas":
            document.getElementById("drawing-options").className = "options";
            break;
        case "img":
            document.getElementById("photo-options").className = "options";
            setRang(length);
            break;
            case "p":
            document.getElementById("title-options").className = "options";
            break;

    }
    document.getElementById("objects"+oldLength.toString()).className = "option";
    document.getElementById("objects"+length.toString()).className = "highlight";
    oldLength = length;
}
function setRang(length){
    var filter = filtersArray[length];
    document.getElementById("1P").value = parseInt(filter.blur,10 ).toString();
    document.getElementById("2P").value = parseInt(filter.brightness,10 ).toString();
    document.getElementById("3P").value = parseInt(filter.contrast,10 ).toString();
    document.getElementById("4P").value = parseInt(filter.dropshadow,10 ).toString();
    document.getElementById("5P").value = parseInt(filter.gray,10 ).toString();
    document.getElementById("6P").value = parseInt(filter.rotate,10 ).toString();
    document.getElementById("7P").value = parseInt(filter.invert,10 ).toString();
    document.getElementById("8P").value = parseInt(filter.opacity,10 ).toString();
    document.getElementById("9P").value = parseInt(filter.saturate,10 ).toString();
    document.getElementById("10P").value = parseInt(filter.sepia,10 ).toString();
    editType = parseInt(chosenFunction[length]);

}
function colour(type){
    //console.log(type);
    if(this.type==="canvas") {
        switch (type) {
            case '1':
                drawColour = "#000000";
                break;
            case "2":
                drawColour = "#a1d11d";
                break;
            case "3":
                drawColour = "#02ddf3";
                break;
            case "4":
                drawColour = "#fc0505";
                break;
            case "5":
                drawColour = "#5e00bf";
                break;
            case "6":
                drawColour = "#e36ecd";
                break;
            case "7":
                drawColour = "#faff00";
                break;
        }
    }else if(this.type==="p"){
        switch (type) {
            case '1':
                object.style.color = "#000000";
                break;
            case "2":
                object.style.color = "#a1d11d";
                break;
            case "3":
                object.style.color = "#02ddf3";
                break;
            case "4":
                object.style.color = "#fc0505";
                break;
            case "5":
                object.style.color = "#5e00bf";
                break;
            case "6":
                object.style.color = "#e36ecd";
                break;
            case "7":
                object.style.color = "#faff00";
                break;
        }
    }
}
$("#drawSize").change(function () {
   drawWidth = document.getElementById("drawSize").value;
});
$("#drawOpacity").change(function () {
   drawOpacity = document.getElementById("drawOpacity").value;
});
function chooseImage(){

return null;
}

$(window).resize(scaling());
function editTypeSet(type){
    editType = parseInt(type);
    chosenFunction[oldLength] = editType.toString();
    switch (type){
        case "1":
            break;
        case "2":
            break;
        case "3":
            break;

    }
}
function positioning(x1, y1, x, y){
if(type!= "canvas") {
    var x2 = x1 - x;
    var y2 = y1 - y;

    object.style.left = x1 + 'px';
    object.style.top = y1 + 'px';
}
}
function sizeChanger(offsetY, offsetX, type){
    if(this.type!="canvas"){
    var x = object.offsetLeft;
    var y = object.offsetTop;
//console.log(offsetY);
//console.log(offsetX);
//console.log(y);
//console.log(x);
    switch (type) {
        case 1:
            //console.log(press);
            var y2 = y - offsetY ;
            object.style.top = offsetY+'px';
            object.style.height = object.offsetHeight + y2  + 'px';
            y = object.offsetTop;
            //console.log("Y2 " + y2);
            break;
        case 2:
            var x2 = x+object.offsetWidth-offsetX;
            object.style.width = object.offsetWidth -x2 + 'px';
            x = object.offsetLeft;
            break;
        case 3:
            var y3 = y+object.offsetHeight-offsetY;
            object.style.height = object.offsetHeight - y3 + 'px';
            y = object.offsetHeight;
            break;
        case 4:
            var x3 = x - offsetX;
            object.style.left= offsetX+'px';
            object.style.width = object.offsetWidth +x3 + 'px';
            x = object.offsetLeft;
            break;
    }
        }
}
function cursorChanger(offsetX, offsetY) {
    x = offsetX;
    y = offsetY;
    if (offsetY > object.offsetLeft + 5 && offsetY < object.offsetLeft + object.offsetWidth - 5 && offsetX > object.offsetTop + 5
        && offsetX < object.offsetTop + object.offsetHeight - 5) {
        object.style.cursor = "default";
    }
    /*console.log(type);
    console.log(press);
    console.log(offsetX);
    console.log(offsetY);*/
    if (press === false && type === "img") {
        if (offsetY >= object.offsetTop - 20 && offsetY <= object.offsetTop + 2 &&
            offsetX >= object.offsetLeft
            && offsetX <= object.offsetLeft + object.offsetWidth
        ) {

            object.style.cursor = "n-resize";
            cutType = 1;
            $(object).mousedown(function (ev1) {
                press = true;


            });

        } else if (offsetX >= object.offsetLeft +
            object.offsetWidth - 2 && offsetX <= object.offsetLeft + object.offsetWidth + 20
            && offsetY <= object.offsetHeight + object.offsetTop &&
            offsetY >= object.offsetTop) {
            object.style.cursor = "e-resize";
            cutType = 2;
            $(object).mousedown(function (ev1) {
                press = true;


            });
        } else if (offsetY >= object.offsetTop + object.offsetHeight - 20
            && offsetY <= object.offsetTop + object.offsetHeight + 2 &&
            offsetX >= object.offsetLeft && offsetX <= object.offsetLeft + object.offsetWidth) {
            object.style.cursor = "s-resize";
            cutType = 3;
            $(object).mousedown(function (ev1) {
                press = true;


            });
        } else if (offsetX >= object.offsetLeft - 20 && offsetX <= object.offsetLeft + 5
            && offsetY <= object.offsetHeight + object.offsetTop &&
            offsetY >= object.offsetTop) {
            object.style.cursor = "w-resize";
            cutType = 4;
            $(object).mousedown(function (ev1) {
                press = true;


            });
        } else {
//console.log("Default");
            object.style.cursor = "default";
        }
    }

}

function filter(type){
    var style = object.style.filter;
    //console.log(style);
    var styleArray = style.split(" ");
    //console.log(styleArray);
    switch (type.toString()){
        case "1":
 filtersArray[oldLength].blur = document.getElementById("1P").value;
newStyle(filtersArray[oldLength]);
            break;
           case "2":
               filtersArray[oldLength].brightness = document.getElementById("2P").value;
               newStyle(filtersArray[oldLength]);
            break;
           case "3":
               filtersArray[oldLength].contrast = document.getElementById("3P").value;
               newStyle(filtersArray[oldLength]);
            break;
           case "4":
               filtersArray[oldLength].dropshadow = document.getElementById("4P").value;
               newStyle(filtersArray[oldLength]);
            break;
           case "5":
               filtersArray[oldLength].gray = document.getElementById("5P").value;
               newStyle(filtersArray[oldLength]);
            break;
           case "6":
               filtersArray[oldLength].rotate = document.getElementById("6P").value;
               newStyle(filtersArray[oldLength]);
            break;
           case "7":
               filtersArray[oldLength].invert = document.getElementById("7P").value;
               newStyle(filtersArray[oldLength]);
            break;
           case "8":
               filtersArray[oldLength].opacity = document.getElementById("8P").value;
               newStyle(filtersArray[oldLength]);
            break;
           case "9":
               filtersArray[oldLength].saturate = document.getElementById("9P").value;
               newStyle(filtersArray[oldLength]);
            break;
            case "10":
               filtersArray[oldLength].sepia = document.getElementById("10P").value;
               newStyle(filtersArray[oldLength]);
            break;


    }
}
function newStyle(filter){
    var style =  "blur("+filter.blur+"px) ";
    style += "brightness("+filter.brightness+"%) ";
    style += "contrast("+filter.contrast+"%) ";
    //style += "dropshadow("+filter.dropshadow+"%) ";
    style += "grayscale("+filter.gray+"%) ";
    style += "hue-rotate("+filter.rotate+"deg) ";
    style += "invert("+filter.invert+"%) ";
    style += "opacity("+filter.opacity+"%) ";
    style += "saturate("+filter.saturate+"%) ";
    style += "sepia("+filter.sepia+"%) ";
    object.style.filter = style;

}
function getStyle(filter){
    var style =  "blur("+filter.blur+"px) ";
    style += "brightness("+filter.brightness+"%) ";
    style += "contrast("+filter.contrast+"%) ";
    //style += "dropshadow("+filter.dropshadow+"%) ";
    style += "grayscale("+filter.gray+"%) ";
    style += "hue-rotate("+filter.rotate+"deg) ";
    style += "invert("+filter.invert+"%) ";
    style += "opacity("+filter.opacity+"%) ";
    style += "saturate("+filter.saturate+"%) ";
    style += "sepia("+filter.sepia+"%) ";
    return style;
}
function filters(blur, brightness, contrast, dropshadow,
                 gray, rotate, invert, opacity, saturate,
                 sepia){
    this.blur = blur;
    this.brightness = brightness;
    this.contrast = contrast;
    this.dropshadow = dropshadow;
    this.gray = gray;
    this.rotate = rotate;
    this.invert = invert;
    this.opacity = opacity;
    this.saturate = saturate;
    this.sepia = sepia;

}
$("#textAdder").keyup(function (){

object.innerHTML = $("#textAdder").val();
object.style.width = "fit-content";
object.style.width = object.offsetWidth+"px";
object.style.height = object.offsetHeight+"px";

});
function exportPhoto(){

    var doc = document.createElement("canvas");
    doc.style.height = height+"px";
    doc.style.width = width+"px";
    doc.height = height;
    doc.width = width;


    var ctx = doc.getContext("2d");
    ctx.beginPath();
    ctx.fillStyle="white";
    ctx.rect(0, 0, width, height);
    ctx.fill();
    for (let  i =1; i< objects.length; i++){
var type = types[i];
switch (type){
    case "canvas":
        var canvas = document.getElementById(objects[i]);
        const pixelRatio = window.devicePixelRatio || 1;
        var cont = canvas.getContext("2d");
        var tempCanvas=document.createElement("canvas");
        var tctx=tempCanvas.getContext("2d");
        var cw=canvas.width;
        var ch=canvas.height;
        tempCanvas.width=cw;
        tempCanvas.height=ch;
        tctx.drawImage(canvas,0,0);
        canvas.width*=proportion;
        canvas.height*=proportion;
        cont.drawImage(tempCanvas,0,0,cw,ch,0,0,cw*proportion,ch*proportion);
        ctx.drawImage(canvas, 0,0);

        break;
    case "img":
        var img1 = document.getElementById(objects[i]);
        //console.log(img1);
var x = img1.offsetLeft;
var y = img1.offsetTop;
//console.log(parseInt(img1.style.height,10));
var canvas = document.createElement("canvas");
canvas.style.height = parseInt(img1.style.height,10)*proportion+"px";
canvas.style.width = parseInt(img1.style.width,10)*proportion+"px";
canvas.height = parseInt(img1.style.height,10)*proportion;
canvas.width = parseInt(img1.style.width,10)*proportion;
var cont = canvas.getContext("2d");
cont.filter = getStyle(filtersArray[i]);
cont.drawImage(img1, 0, 0,parseInt(img1.style.width,10)*proportion, parseInt(img1.style.height,10)*proportion, );
ctx.drawImage(canvas, x*proportion,y*proportion);
        break;
        case "p":
        var p = document.getElementById(objects[i]);
            ctx.font = parseInt(p.style.fontSize, 10)*proportion+"px "+p.style.fontFamily;
            ctx.fillStyle = p.style.color.toString();
            ctx.fillText(p.innerHTML, p.offsetLeft*proportion, p.offsetTop*proportion+parseInt(p.style.fontSize, 10)*proportion);
            break;


}

    }
    //document.body.appendChild(doc);
    var link = document.createElement('a');
    link.download = 'filename.png';


    link.href = doc.toDataURL("image/png");
    link.click();

}
function newPhoto(){
    document.getElementById("newPhoto").click();;

}
function textSize(){
    var doc = document.getElementById("textRang");
    object.style.fontSize = doc.value+"px";
}