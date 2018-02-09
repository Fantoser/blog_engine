function request(url,item) {
    var ourRequest = new XMLHttpRequest();
    ourRequest.open("GET", url)
    ourRequest.send();
    ourRequest.onload = function(){
        var result = JSON.parse(ourRequest.responseText);
        switch(item){
            case "userID":
                userID(result)
                break;
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

function openNav() {
    document.getElementById("sidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("sidenav").style.width = "0";
}

function userID(userID){
    sessionStorage.userID = userID.id
}

function load_blogs(blogs){

    request("/get-userID", "userID")

    //Sidebar

    var sideContent = document.getElementById("sideContent")

    var sideButt = document.createElement("div")
    sideButt.setAttribute("class", "btn rounded-0")
    sideButt.setAttribute("id", "sideButt")

    var sideButtText = document.createTextNode("Create New Blog")

    myBlogsBox = document.createElement("a")
    myBlogsBox.setAttribute("id", "myBlogsBox")

    var myBlogsText = document.createTextNode("My Blogs:")
    

    sideButt.appendChild(sideButtText)
    sideContent.appendChild(sideButt)
    myBlogsBox.appendChild(myBlogsText)
    sideContent.appendChild(myBlogsBox)

    sideButton(sideButt)

    //Content

    var rowcounter = 0
    var content = document.getElementById("content")
    content.innerHTML=""

    var table = document.createElement("table")
    var header = table.createTHead();
    var row = table.insertRow(0);

    for(i in blogs){
        if (rowcounter == 5){
            table.appendChild(row)
            var row = table.insertRow(table.rows.length);
            rowcounter = 0
        }
        var cell = row.insertCell(rowcounter);
        cell.setAttribute("align", "center")

        var blogButt = document.createElement("div")
        blogButt.setAttribute("class", "btn")
        blogButt.setAttribute("id", "blogButt")

        BlogButtons(blogButt, blogs[i])

        var blogname = document.createTextNode(blogs[i].name)

        blogButt.appendChild(blogname)
        cell.appendChild(blogButt)

        rowcounter++


        if(blogs[i].owner_id == sessionStorage.userID){

            var sideButt = document.createElement("div")
            sideButt.setAttribute("class", "btn rounded-0")
            sideButt.setAttribute("id", "sideButt")
        
            var sideButtText = document.createTextNode(blogs[i].name)

            sideButt.appendChild(sideButtText)
            sideContent.appendChild(sideButt)

            BlogButtons(sideButt, blogs[i])
        }

    }

    content.appendChild(table)

}



function BlogButtons(button, blog) {
    
    var navTitle = document.getElementById("navTitle")

    function blogButtonEvent(){

        var urlString = "/get-blog/" + blog.id
        request(urlString, "blog")
        navTitle.innerHTML = blog.name
        Storage["id"] = blog.id
        Storage["about"] = blog.about
        Storage["contact"] = blog.contact
        
    }
    
    button.addEventListener("click", blogButtonEvent);
    
}

function sideButton(button){

    function sideButtonEvent(){

        load_newBlog()

    }

    button.addEventListener("click", sideButtonEvent);

}


function load_blog(blogposts){


    //Navigation bar
    var navbar = document.getElementById("navButtons")
    navbar.innerHTML = ""

    var blogpostsButton = document.createElement("span")
    blogpostsButton.setAttribute("class", "col navButt")
    blogpostsButton.setAttribute("id", "blogpostsButton")

    var blogpostsText = document.createTextNode("Blogposts")

    var aboutButton = document.createElement("span")
    aboutButton.setAttribute("class", "col navButt")
    aboutButton.setAttribute("id", "aboutButton")

    var aboutText = document.createTextNode("About")

    var contactButton = document.createElement("span")
    contactButton.setAttribute("class", "col navButt")
    contactButton.setAttribute("id", "contactButton")

    var contactText = document.createTextNode("Contact")

    var linksButton = document.createElement("span")
    linksButton.setAttribute("class", "col navButt")
    linksButton.setAttribute("id", "linksButton")

    var linksText = document.createTextNode("Links")

    blogpostsButton.appendChild(blogpostsText)
    aboutButton.appendChild(aboutText)
    contactButton.appendChild(contactText)

    navbar.appendChild(blogpostsButton)
    navbar.appendChild(aboutButton)
    navbar.appendChild(contactButton)

    navButtons(blogpostsButton, aboutButton, contactButton)

    //Page content
    var content = document.getElementById("content")
    content.innerHTML=""

    var piclist = []

    for(i=blogposts.length-1; i>=0; i--){

        var postBox = document.createElement("div")
        postBox.setAttribute("class", "container")
        postBox.setAttribute("id", "postBox")

        var postTitleBox = document.createElement("div")
        postTitleBox.setAttribute("class", "container")
        postTitleBox.setAttribute("id", "postTitleBox")

        var postTitle = document.createTextNode(blogposts[i].title)

        if(blogposts[i].img != null){

        var imageBox = document.createElement("div")
        imageBox.setAttribute("class", "container")
        imageBox.setAttribute("id", "imageBox") 

        var image = document.createElement("img")
        image.setAttribute("src", "/static/pics/" + blogposts[i].img)
        image.setAttribute("alt", blogposts[i].img)
        }

        var postMessageBox = document.createElement("div")
        postMessageBox.setAttribute("class", "container")        
        postMessageBox.setAttribute("id", "postMessage")

        var postMessage = document.createTextNode(blogposts[i].message)

        var postButtonBox = document.createElement("div")
        postButtonBox.setAttribute("id", "postButtonBox")
        postButtonBox.setAttribute("class", "row justify-content-end")

        var postButton = document.createElement("div")
        postButton.setAttribute("id", "blogpostButton")
        postButton.setAttribute("class", "col-2.5")

        BlogPostButtons(postButton, blogposts[i].id)

        var postButtonText = document.createTextNode("See answers")


        postTitleBox.appendChild(postTitle)
        postMessageBox.appendChild(postMessage)
        postBox.appendChild(postTitleBox)
        if(blogposts[i].img != null){
            imageBox.appendChild(image)
            postBox.appendChild(imageBox)
        }
        postBox.appendChild(postMessageBox)
        postButton.appendChild(postButtonText)
        postButtonBox.appendChild(postButton)
        postBox.appendChild(postButtonBox)
        content.appendChild(postBox)

    }
}


function navButtons(blogpostsButton, aboutButton, contactButton) {

    var content = document.getElementById("content")

    function blogpostsButtonEvent(){

        var urlString = "/get-blog/" + Storage["id"]
        request(urlString, "blog")
    }

    blogpostsButton.addEventListener("click", blogpostsButtonEvent);


    function aboutButtonEvent(){
    
        infopage("About")

    }
        
    aboutButton.addEventListener("click", aboutButtonEvent);


    function contactButtonEvent(){
        
        infopage("Contact")

    }
        
    contactButton.addEventListener("click", contactButtonEvent);

}

function infopage(info){
    content.innerHTML = ""
    
    var postBox = document.createElement("div")
    postBox.setAttribute("class", "container")
    postBox.setAttribute("id", "postBox")

    var postTitleBox = document.createElement("div")
    postTitleBox.setAttribute("class", "container")
    postTitleBox.setAttribute("id", "postTitleBox")

    var postTitle = document.createTextNode(info)

    var postMessageBox = document.createElement("div")
    postMessageBox.setAttribute("class", "container")        
    postMessageBox.setAttribute("id", "postMessage")

    if(Storage[info.toLowerCase()] == null){
        var postMessage = document.createTextNode("This page doesn't contain any information")
    }else{
        var postMessage = document.createTextNode(Storage[info.toLowerCase()])
    }

    postTitleBox.appendChild(postTitle)
    postMessageBox.appendChild(postMessage)
    postBox.appendChild(postTitleBox)
    postBox.appendChild(postMessageBox)
    content.appendChild(postBox)
}


function BlogPostButtons(button, id) {
    
    content = document.getElementById("content");

    function blogpostButtonEvent(){

        var urlString = "/get-blogpost/" + id
        request(urlString, "blogpost")
        
    }
    
    button.addEventListener("click", blogpostButtonEvent);

}



function load_blogpost(blogpost){

    var content = document.getElementById("content")
    content.innerHTML=""

    //Blogpost
    var postBox = document.createElement("div")
    postBox.setAttribute("class", "container")
    postBox.setAttribute("id", "postBox")

    var postTitleBox = document.createElement("div")
    postTitleBox.setAttribute("class", "container")
    postTitleBox.setAttribute("id", "postTitleBox")

    var postTitle = document.createTextNode(blogpost[0].title)

    if(blogpost[0].img != null){
        
        var imageBox = document.createElement("div")
        imageBox.setAttribute("class", "container")
        imageBox.setAttribute("id", "imageBox") 

        var image = document.createElement("img")
        image.setAttribute("src", "/static/pics/" + blogpost[0].img)
        image.setAttribute("alt", blogpost[0].img)
    }

    var postMessageBox = document.createElement("div")
    postMessageBox.setAttribute("class", "container")        
    postMessageBox.setAttribute("id", "postMessage")

    var postMessage = document.createTextNode(blogpost[0].message)

    postTitleBox.appendChild(postTitle)
    postMessageBox.appendChild(postMessage)
    postBox.appendChild(postTitleBox)
    if(blogpost[0].img != null){
        imageBox.appendChild(image)
        postBox.appendChild(imageBox)
    }
    postBox.appendChild(postMessageBox)
    content.appendChild(postBox)


    //Answers

    var answersBox = document.createElement("div")
    answersBox.setAttribute("class", "container")
    answersBox.setAttribute("id", "answersBox")

    var h2 = document.createElement("h2")
    h2.setAttribute("id", "answerText")

    var answers = document.createTextNode("Answers:")
    
    h2.appendChild(answers)
    answersBox.appendChild(h2)


    if(blogpost[1].length == 0){

        var answerTextBox = document.createElement("div")
        answerTextBox.setAttribute("class", "container")

        var answerMessage = document.createTextNode("There's no comments yet")

        answerTextBox.appendChild(answerMessage)
        answersBox.appendChild(h2)
        answersBox.appendChild(answerTextBox)

    }else{

        for(i in blogpost[1]){

            var answerBox = document.createElement("div")
            answerBox.setAttribute("class", "container")
            answerBox.setAttribute("id", "answerBox")

            var usernameBox = document.createElement("div")
            usernameBox.setAttribute("class", "container")
            usernameBox.setAttribute("id", "usernameBox")

            var username = document.createTextNode(blogpost[1][i].username + ":")

            var answerTextBox = document.createElement("div")
            answerTextBox.setAttribute("class", "container")

            var answerText = document.createTextNode(blogpost[1][i].message)

            usernameBox.appendChild(username)
            answerBox.appendChild(usernameBox)
            answerTextBox.appendChild(answerText)
            answerBox.appendChild(answerTextBox)
            answersBox.appendChild(answerBox)

        }
    }

    content.appendChild(answersBox)

}

function load_newBlog(){
    
        var content = document.getElementById("content")
        content.innerHTML=""
    
        var navTitle = document.getElementById("navTitle")
        navTitle.innerHTML = "Create New Blog"
    
        var form = document.createElement("form")
        form.setAttribute("action", "/submit-blog/"+sessionStorage.userID)
        form.setAttribute("method", "post")
        
    
        var titleTextBox = document.createElement("div")
        titleTextBox.setAttribute("class", "container")
        titleTextBox.setAttribute("id", "titleTextBox")
    
        var titleText = document.createTextNode("Title")
    
        var newTitleBox = document.createElement("div")
        newTitleBox.setAttribute("class", "container")
        newTitleBox.setAttribute("id", "newTitleBox")
    
        var newTitle = document.createElement("input")
        newTitle.setAttribute("type", "text")
        newTitle.setAttribute("name", "title")
        newTitle.setAttribute("size", "80")
        newTitle.setAttribute("id", "newTitle")
    
        var submitBox = document.createElement("div")
        submitBox.setAttribute("class", "container")
        submitBox.setAttribute("id", "submitBox")
        
    
        var submit = document.createElement("button")
        submit.setAttribute("class", "btn")
        submit.innerHTML="Submit"
    
        titleTextBox.appendChild(titleText)
        newTitleBox.appendChild(newTitle)
    
        submitBox.appendChild(submit)
    
        form.appendChild(titleTextBox)
        form.appendChild(newTitleBox)
        form.appendChild(submitBox)
    
        content.appendChild(form)
    
    }


function load_newBlogPost(){

    var content = document.getElementById("content")
    content.innerHTML=""

    var navTitle = document.getElementById("navTitle")
    navTitle.innerHTML = "Create New Blog"

    var form = document.createElement("form")
    form.setAttribute("action", "/submit-blog")
    form.setAttribute("method", "post")
    

    var titleTextBox = document.createElement("div")
    titleTextBox.setAttribute("class", "container")
    titleTextBox.setAttribute("id", "titleTextBox")

    var titleText = document.createTextNode("Title")

    var newTitleBox = document.createElement("div")
    newTitleBox.setAttribute("class", "container")
    newTitleBox.setAttribute("id", "newTitleBox")

    var newTitle = document.createElement("input")
    newTitle.setAttribute("type", "text")
    newTitle.setAttribute("size", "80")
    newTitle.setAttribute("id", "newTitle")

    var postTextBox = document.createElement("div")
    postTextBox.setAttribute("class", "container")
    postTextBox.setAttribute("id", "postTextBox")

    var postText = document.createTextNode("Message")

    var newPostBox = document.createElement("div")
    newPostBox.setAttribute("class", "container")
    newPostBox.setAttribute("id", "newPostBox")

    var newPost = document.createElement("textarea")
    newPost.setAttribute("rows", "8")
    newPost.setAttribute("cols", "80")
    newPost.setAttribute("id", "newPost")

    var submitBox = document.createElement("div")
    submitBox.setAttribute("class", "container")
    submitBox.setAttribute("id", "submitBox")
    

    var submit = document.createElement("button")
    submit.setAttribute("class", "btn")
    submit.innerHTML="Submit"

    titleTextBox.appendChild(titleText)
    newTitleBox.appendChild(newTitle)

    postTextBox.appendChild(postText)
    newPostBox.appendChild(newPost)

    submitBox.appendChild(submit)

    form.appendChild(titleTextBox)
    form.appendChild(newTitleBox)
    form.appendChild(postTextBox)
    form.appendChild(newPostBox)
    form.appendChild(submitBox)

    content.appendChild(form)

}


window.addEventListener('load', request("/get-blogs", "blogs"));

/*            <nav class="navbar" id="navbar" style="background-color:rgb(254, 255, 175)">
<span><h1 class="container" id="navTitle">Blog engine</h1></span>
<span class="container" id="navButtons"></span>
</nav>*/