from pydantic import BaseModel

class DocumentoResponse(BaseModel):
    id: str
    tipo: str
    path: str
    nombreOriginal: str
    tamanioBytes: int

    class Config:
        from_attributes = True
