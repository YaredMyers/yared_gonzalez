# Use an official Python runtime as a parent image
FROM cabify/backend-bootcamp-messageapp

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY package.json .

#ADD
ADD . /app 

# Install any needed packages specified in requirements.txt
RUN npm install

# Make port 80 available to the world outside this container
EXPOSE 9001

# Run app.py when the container launches
CMD ["node", "app.js"]