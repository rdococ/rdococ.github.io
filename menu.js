// the path is at window.location.pathname.
// we should automatically generate a list of links for the documents.
// (what order though?)
var links = [  // Really should probably put this in a different file - or maybe generate it automatically.
	{path:"index.html", label:"Home"},
	{path:"#test", label:"Test"}
];

// A link is of the form:
// <li><a href="path">yay</a></li>
// If the page is THIS page, append "class="active"" to the attribute list.

var text = "";
for (i = 0; i < links.length; i++) {
	if ("/" + links[i].path == location.pathname || links[i].path == "/" && location.pathname == "index.html") {
		text += '<li><a class="active">' + links[i].label + '</a></li>';
	} else {
		text += '<li><a href="' + links[i].path + '">' + links[i].label + '</a></li>';
	}
}

document.getElementById('menu').innerHTML = text;
