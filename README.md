WebsiteMetadata
====================

Get metadata from other websites in Meteor


Installation
------------------
WebsiteMetadata can be installed with Meteorite. From inside a Meteorite-managed app:
```shell
   $ mrt add website-metadata
```



Usage
---------------
WebsiteMetadata asynchronously loads webpages and parses them to
discover the following information:<br>
- Title of the page
- Links on the page
- Images on the page
- Youtube links/embeds on the page

The api is exposed via the WebsiteMetadata object, which is exposed on
the server and the client. 

Client
------
All functions are executed asynchronously on the client
###.get(url,callback)
@url: The page to request.
@callback: A function to be called like callback(error,metadata)

```javascript
WebsiteMetadata.get("www.youtube.com",function(error,metadata){
    if (error){
        handleError();
        return;
    }
    var title = metadata.title; // Page title as string
	var links = metadata.links; // List of {href:"",title:"",text:""}
	var videos = metadata.videos; // List of {src:"",title:""}
	var images = metadata.images; // List of {src:"",title:"",alt:""}
}); 
```

Server
-------

###.get(url)

Same as client method, except is runs synchronously.<br>
Return a single metadata object in the same form as the client method<br>
Return a object like {error:"Some error description"} on error




```javascript
var result = WebsiteMetadata.get("www.youtube.com",function(error,metadata){
if (!result.error){
    var title = metadata.title; // Page title as string
	var links = metadata.links; // List of {href:"",title:"",text:""}
	var videos = metadata.videos; // List of {src:"",title:""}
	var images = metadata.images; // List of {src:"",title:"",alt:""}
}; 
```

License
-------
MIT

