from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    database_url: str = "postgresql+psycopg://localhost/ecologistica"
    jwt_secret: str = ""
    jwt_minutes: int = 60
    bootstrap_operator_email: str = ""
    bootstrap_operator_password: str = ""

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


settings = Settings()
