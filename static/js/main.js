function request(url) {
    var ourRequest = new XMLHttpRequest();
    ourRequest.open("GET", url)
    ourRequest.send();
    ourRequest.onload = function(){
        var result = JSON.parse(ourRequest.responseText);
        switch(url){
            case "/get-blogs":
                load_blogs(result)
                break;
            default:
                load_blog(result)
        }
    }
}

function load_blogs(blogs){

    console.log(blogs)
    var rowcounter = 0
    var content = document.getElementById("content")
    content.innerHTML=""

    var table = document.createElement("table")
    var header = table.createTHead();
    var row = table.insertRow(0);

    for(i in blogs){
        if (rowcounter == 3){
            table.appendChild(row)
            var row = table.insertRow(table.rows.length);
            rowcounter = 0
        }
        var cell = row.insertCell(rowcounter);
        cell.setAttribute("align", "center")

        var blogbutt = document.createElement("div")
        blogbutt.setAttribute("class", "btn")

        BlogButtons(blogbutt, i)

        var blogname = document.createTextNode(blogs[i].name)

        blogbutt.appendChild(blogname)
        cell.appendChild(blogbutt)

        rowcounter++
        console.log(rowcounter)

    }

    content.appendChild(table)
}



function BlogButtons(button, id) {
    
    content = document.getElementById("content");

    function blogButtonEvent(){

        var urlString = "/get_blog/" + id
        request(urlString)
        
    }
    
    button.addEventListener("click", blogButtonEvent);
    
}


function load_blog(blogpost){

}

window.addEventListener('load', request("/get-blogs"));