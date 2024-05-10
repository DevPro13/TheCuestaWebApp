FROM python:3.12.3-alpine3.18
#working directory /thecuesta
WORKDIR /thecuesta
#copy build from myapp folder into the container
COPY myapp/build ./build
#backend directory for backend files
RUN mkdir backend
COPY requirements.txt .env ./
#install packages
RUN pip install --no-cache-dir -r requirements.txt
#copy sqlite database file
COPY Backend/instance/myWebAppDB.db ./backend/instance/
COPY Backend/application.py Backend/.flaskenv ./backend/
ENV FLASK_ENV production
#Expose port 5000
EXPOSE 5000/tcp
#make working directory as backend
WORKDIR /thecuesta/backend
#RUN program
CMD ["gunicorn", "-b", ":5000", "application:app"]