from flask import jsonify, Blueprint
from . import main_bp


@main_bp.route('/test')
def test_route():
    print("the test_route() method was called")
    return "Hello, World!"
