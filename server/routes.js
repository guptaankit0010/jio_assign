
module.exports=function(app){
	app.use('/jobs',require('./api/jobs'));
}