from flask_socketio import emit

from .. import socketio


@socketio.on('joined')
def joined(message):
    print(f"Server just received the following message: {message}")


@socketio.on('update')
def update(message):
    print(f"Server just received the following message: {message}")
    emit("new_data", message, broadcast=True)


@socketio.on('foo')
def bar(message):
    print(f"Server just received the following message: {message}")
