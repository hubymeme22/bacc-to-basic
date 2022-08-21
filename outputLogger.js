const outputLogger = (req, res, next) => {
	console.log(`[CliRequest] ${req.socket.remoteAddress}:${req.socket.remotePort}  -->  ${req.path}`);
	next();
}

module.exports = outputLogger;