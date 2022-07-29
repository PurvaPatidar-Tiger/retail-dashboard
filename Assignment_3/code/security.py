from werkzeug.security import safe_str_cmp

from models.owner import OwnerModel


def authenticate(ownername, password):
    owner = OwnerModel.find_by_ownername(ownername)
    print(owner)
    if owner and safe_str_cmp(owner.password, password):
        return owner


def identity(payload):
    owner_id = payload["identity"]
    return OwnerModel.find_by_id(owner_id)
