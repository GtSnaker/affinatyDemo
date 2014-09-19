Fs = require \fs
Path = require \path
spawn = require \child_process .spawn

exec = (cmd, opts, cb) ->
	if typeof opts is \function
		cb = opts
		opts = {stdio: \inherit}
	opts.stdio = \inherit unless opts.stdio
	opts.env = process.env unless opts.env
	cmds = cmd.split ' '
	p = spawn cmds.0, cmds.slice(1), opts
	p.on \close (code) ->
		if code then cb new Error "exit code: "+code
		else cb code

path = Path.join(__dirname, \js);
watcher = Fs.watch path, {}, (evt, filename) ->
	console.log "changed", filename, evt
	exec "component build", (done) ->
	console.log "rebuilt!"