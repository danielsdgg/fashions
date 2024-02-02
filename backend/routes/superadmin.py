from main import *
from typing import List
from models import session, Superadmin

@app.get('/superadmins', tags=['Get All'], response_model=List[Superadmin])
def get_all_superadminss():
    Superadmins = session.query(Superadmin).all()
    return Superadmins