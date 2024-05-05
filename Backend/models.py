from sqlalchemy.orm import declarative_base,relationship
from sqlalchemy import Column, Integer, String,ForeignKey,Float
Base=declarative_base()
class User(Base):
    """This table contains User details"""
    __tablename__='users'
    id=Column(Integer,primary_key=True)
    name=Column(String)
    email=Column(String)
    address=Column(String)
    height=Column(Float)
    weight=Column(Float)
class VideoTable(Base):
    """
    This table contains video file name and detials of the owner.
    """
    __tablename__='videotable'
    id=Column(Integer,primary_key=True)
    filename=Column(String)
    userid=Column(Integer,ForeignKey('users.id'))
    user=relationship('User')