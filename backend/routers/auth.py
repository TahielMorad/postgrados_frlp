from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session
from database import get_db
from models.usuario import Usuario
from schemas.auth import LoginRequest, LoginResponse, UsuarioResponse
from security import create_access_token, decode_access_token, verify_password

router = APIRouter(prefix="/auth", tags=["Auth"])
security_scheme = HTTPBearer(auto_error=False)

@router.post("/login", response_model=LoginResponse)
def login(request: LoginRequest, db: Session = Depends(get_db)):
    """Autentica a un usuario y devuelve su token JWT."""
    email_norm = request.email.strip().lower()
    usuario = db.query(Usuario).filter(Usuario.email == email_norm).first()

    if not usuario or not verify_password(request.password, usuario.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales inválidas. Verificá tu correo y contraseña.",
        )

    token = create_access_token(
        subject=usuario.id,
        rol=usuario.rol,
        nombre=usuario.nombre,
    )

    return LoginResponse(
        accessToken=token,
        usuario=UsuarioResponse.model_validate(usuario),
    )

def get_current_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(security_scheme),
    db: Session = Depends(get_db),
) -> Usuario:
    """Valida el token JWT y recupera el usuario actual."""
    if not credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Falta el token de autorización.",
        )

    payload = decode_access_token(credentials.credentials)
    if not payload or "sub" not in payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="El token no es válido o expiró.",
        )

    user_id = payload["sub"]
    usuario = db.query(Usuario).filter(Usuario.id == user_id).first()
    if not usuario:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="No encontramos al usuario.",
        )

    return usuario
