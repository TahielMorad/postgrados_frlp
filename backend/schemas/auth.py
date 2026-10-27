from pydantic import BaseModel, EmailStr

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class UsuarioResponse(BaseModel):
    email: str
    nombre: str
    rol: str

    class Config:
        from_attributes = True

class LoginResponse(BaseModel):
    accessToken: str
    usuario: UsuarioResponse
