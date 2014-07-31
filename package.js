Package.describe({
    summary: "Get metadata for other websites in Meteor"
});


Npm.depends({
    'cheerio': '0.17.0'
});


// even though we're serving minified, dynamic loading would be nice
Package.on_use(function (api) {
	api.use(['http','jquery']);
	api.export('WebsiteMetadata',['client','server']);
	api.add_files('metadata-server.js', 'server');
	api.add_files('metadata-client.js', 'client');
});
