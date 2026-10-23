@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    # ----------------------------
    # Admin Login
    # ----------------------------
    if (
        form_data.username == "admin"
        and form_data.password == "1906"
    ):
        token = create_access_token({"sub": "admin"})

        return {
            "access_token": token,
            "token_type": "bearer",
            "role": "admin",
            "user": {
                "id": 0,
                "full_name": "Administrator",
                "email": "admin@studymate.ai",
            },
        }

    # ----------------------------
    # Student Login
    # ----------------------------
    user = (
        db.query(models.User)
        .filter(models.User.email == form_data.username)
        .first()
    )

    if not user or not verify_password(
        form_data.password,
        user.hashed_password,
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )

    token = create_access_token({"sub": str(user.id)})

    return {
        "access_token": token,
        "token_type": "bearer",
        "role": "student",
        "user": {
            "id": user.id,
            "full_name": user.full_name,
            "email": user.email,
        },
    }