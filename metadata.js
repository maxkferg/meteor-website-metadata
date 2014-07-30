cheerio = Npm.require("cheerio");

metadata = function(){
	this.get = function(url,callback){
		HTTP.get(url,function(error,response){
			if (error || response.data){
				var metadata = this._parse(response.data);
				if (metadata){
					callback(null,metadata);
				} else {
					callback({error:"Unable to parse"},null);
				}
			} else {
				callback(error,null)
			}
		});
	}
	this._parse = function(data){
		var metadata = {};
		var $ = cheerio.load(data);
		// Get the title
		metadata.title = $(document).find("title").text();

		// Add the html links
		metadata.links = $('a').map(function(link){
			return {
				"href":link.attr("href"),
				"title":link.attr("title"),
				"text":link.text()
			}
		});

		// Add the images
		metadata.images = $('img').map(function(link){
			return {
				"src":link.attr("src"),
				"title":link.attr("title"),
				"alt":link.attr("alt")
			}
		});

		// Add the youtube embeds
		var regex1 = /"(.*?youtube.com.*?)"/;
		var regex2 = /'(.*?youtube.com.*?)'/;
		var matches = [].concat(regex1.exec(data),regex2.exec(data));
		metadata.videos = [];
		for ( var i=0; i< matches.length; i+=2 ){
			// Get the id of the video
			var link = matches[i];
			var re = /youtube.com\/v\/(.*)\?/; 
			var id = re.exec(link)[1];
			metadata.push({link:link,id:id});
		}

		// If the page has videos, use one as a thumbnail
		_.each(metadata.videos,function(video){
			if (video.id){
				metadata.thumbnail = "http://img.youtube.com/vi/"+video.id+"/default.jpg";
			}
		});

		// Otherwise the first image
		if (!metadata.thumbnail && metadata.images.length){
			metadata.thumbnail = metadata.images[0].src;
		} else if (!metadata.thumbnail){
			metadata.thumbnail = undefined;
		}
		return metadata;
	}
}



if (Meteor.isClient){
	WebsiteMetadata = new metadata();
} else {
	WebsiteMetadata = new metadata();
	WebsiteMetadata.get = Meteor._wrapAsync(WebsiteMetadata.get);
}


