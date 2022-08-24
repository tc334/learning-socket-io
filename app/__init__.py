from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO

socketio = SocketIO()


def create_app(debug=False):
    app = Flask(__name__)
    CORS(app)
    app.debug = debug
    app.config['SECRET_KEY'] = 'mybadkey'

    from .main import main_bp
    app.register_blueprint(main_bp)

    socketio.init_app(app, logger=True, engineio_logger=True, cors_allowed_origins='*')

    return app
