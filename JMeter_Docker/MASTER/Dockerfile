# Use Ubuntu
FROM ubuntu
MAINTAINER TestAutomationGuru

# Install wger & JRE
RUN apt-get clean && \
	apt-get update && \
	apt-get -qy install \
				wget \
				default-jre-headless \
				telnet \
				iputils-ping \
				unzip \
				apt-transport-https \
                    build-essential \
                    ca-certificates \
                    curl \
                    g++ \
                    gcc \
                    git \
                    make \
                    nginx

# Install jmeter
RUN   mkdir /jmeter \
      && cd /jmeter/ \
      && wget https://archive.apache.org/dist/jmeter/binaries/apache-jmeter-3.3.tgz \
      && tar -xzf apache-jmeter-3.3.tgz \
      && rm apache-jmeter-3.3.tgz \
	  && mkdir /jmeter-plugins \
	  && cd /jmeter-plugins/ \
	  && wget https://jmeter-plugins.org/downloads/file/JMeterPlugins-ExtrasLibs-1.4.0.zip \
	  && unzip -o JMeterPlugins-ExtrasLibs-1.4.0.zip -d /jmeter/apache-jmeter-3.3/

# Set Jmeter Home
ENV JMETER_HOME /jmeter/apache-jmeter-3.3/

# Add Jmeter to the Path
ENV PATH $JMETER_HOME/bin:$PATH



#################INSTALLING NODEJS BACKEND#############################

# Replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# Set environment variables
ENV appDir /var/www/app/current

ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 8.5.0

# Install nvm with node and npm
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.26.0/install.sh | bash \
    && source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

# Set up our PATH correctly so we don't have to long-reference npm, node, &c.
ENV NODE_PATH $NVM_DIR/versions/node/v$NODE_VERSION/lib/node_modules
ENV PATH      $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH


# Set the work directory
RUN mkdir -p /var/www/app/current
WORKDIR ${appDir}

# Add our package.json and install *before* adding our application files
ADD package.json ./
RUN npm i --production

# Add application files
ADD . /var/www/app/current


# Ports to be exposed from the container for JMeter Master
EXPOSE 60000 3007

ENV NODE_ENV production


CMD ["node", "master"]
