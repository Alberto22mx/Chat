var socket = io.connect('http://192.168.43.190:6677', {'forceNew': true});

socket.on('messages', (data)=>{
	console.log(data);
	render(data);
});

function render(data){
	var html = data.map((message, index)=>{
		return(`
			<div class="message">
				<strong>${message.nickname}</strong> dice:
				<p>${message.texto}</p>
			</div>
		`);
	}).join(' ');
	var div_msj = document.getElementById('messages');
	div_msj.innerHTML = html;
	div_msj.scrollTop = div_msj.scrollHeight;
}

function addMessage(e){
	var message = {
		nickname: document.getElementById('nickname').value,
		texto: document.getElementById('text').value,
	};
	document.getElementById('nickname').style.display = 'none';
	socket.emit('add-message', message);
	return;
}