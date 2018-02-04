function request(url,item) {
    var ourRequest = new XMLHttpRequest();
    ourRequest.open("GET", url)
    ourRequest.send();
    ourRequest.onload = function(){
        var result = JSON.parse(ourRequest.responseText);
        switch(item){
            case "blogs":
                load_blogs(result)
                break;
            case "blog":
                load_blog(result)
                break;
            case "blogpost":
                load_blogpost(result)
                break;
        }
    }
}

function load_blogs(blogs){

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

        var blogButt = document.createElement("div")
        blogButt.setAttribute("class", "btn")
        blogButt.setAttribute("id", "blogButt")

        BlogButtons(blogButt, i, blogs[i].name)

        var blogname = document.createTextNode(blogs[i].name)

        blogButt.appendChild(blogname)
        cell.appendChild(blogButt)

        rowcounter++

    }

    content.appendChild(table)
}



function BlogButtons(button, id, blogName) {
    
    var navTitle = document.getElementById("navTitle")

    function blogButtonEvent(){

        var urlString = "/get-blog/" + id
        request(urlString, "blog")
        navTitle.innerHTML = blogName
        
    }
    
    button.addEventListener("click", blogButtonEvent);
    
}


function load_blog(blogposts){


    //Navigation bar
    var navbar = document.getElementById("navButtons")

    var aboutButton = document.createElement("span")
    aboutButton.setAttribute("class", "btn")
    aboutButton.setAttribute("id", "navButt")

    var about = document.createTextNode("About")

    var contactButton = document.createElement("span")
    contactButton.setAttribute("class", "btn")
    contactButton.setAttribute("id", "navButt")

    var contact = document.createTextNode("Contact")

    aboutButton.appendChild(about)
    contactButton.appendChild(contact)
    navbar.appendChild(aboutButton)
    navbar.appendChild(contactButton)

    //Page content
    var content = document.getElementById("content")
    content.innerHTML=""

    for(i in blogposts){

        var postBox = document.createElement("div")
        postBox.setAttribute("class", "container")
        postBox.setAttribute("id", "postBox")

        var postTitleBox = document.createElement("div")
        postTitleBox.setAttribute("class", "container")
        postTitleBox.setAttribute("id", "postTitleBox")

        var postTitle = document.createTextNode(blogposts[i].title)

        var postMessageBox = document.createElement("div")
        postMessageBox.setAttribute("class", "container")        
        postMessageBox.setAttribute("id", "postMessage")

        var postMessage = document.createTextNode(blogposts[i].message)

        var postButton = document.createElement("a")
        postButton.setAttribute("id", "postButton")
        postButton.setAttribute("href", "#")
        postButton.style.float = "right"

        BlogPostButtons(postButton, blogposts[i].id)

        var postButtonText = document.createTextNode("See answers")


        postTitleBox.appendChild(postTitle)
        postMessageBox.appendChild(postMessage)
        postBox.appendChild(postTitleBox)
        postBox.appendChild(postMessageBox)
        postButton.appendChild(postButtonText)
        postBox.appendChild(postButton)
        content.appendChild(postBox)

    }
}

function BlogPostButtons(button, id) {
    
    content = document.getElementById("content");

    function blogpostButtonEvent(){

        var urlString = "/get-blogpost/" + id
        request(urlString, "blogpost")
        
    }
    
    button.addEventListener("click", blogpostButtonEvent);
    
}


window.addEventListener('load', request("/get-blogs", "blogs"));

/*            <nav class="navbar" id="navbar" style="background-color:rgb(254, 255, 175)">
<span><h1 class="container" id="navTitle">Blog engine</h1></span>
<span class="container" id="navButtons"></span>
</nav>*/