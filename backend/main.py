from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config import settings
from routers import health, auth, legajos, documentos, cohortes

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url=f"{settings.API_V1_STR}/docs",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router, prefix=settings.API_V1_STR)
app.include_router(auth.router, prefix=settings.API_V1_STR)
app.include_router(legajos.router, prefix=settings.API_V1_STR)
app.include_router(documentos.router, prefix=settings.API_V1_STR)
app.include_router(cohortes.router, prefix=settings.API_V1_STR)

@app.get("/health", tags=["Health"])
def liveness():
    """Liveness probe: no consulta la base de datos."""
    return {"status": "ok"}

@app.get("/")
def root():
    return {
        "message": "Bienvenido/a al Backend API del Sistema de Posgrados UTN FRLP",
        "docs": f"{settings.API_V1_STR}/docs",
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
