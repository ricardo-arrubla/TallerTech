from app.models.database import Base, engine
from app.models.cliente import Cliente

Base.metadata.create_all(bind=engine)
