from sqlalchemy.orm import Session
from .. import models


def get_all_users(db: Session):
    return (
        db.query(models.User)
        .order_by(models.User.id.desc())
        .all()
    )


def delete_user(db: Session, user_id: int):
    user = (
        db.query(models.User)
        .filter(models.User.id == user_id)
        .first()
    )

    if not user:
        return False

    db.delete(user)
    db.commit()

    return True