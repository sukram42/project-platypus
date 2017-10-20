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
				unzip

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

ENV LOCALPORT 50000
ENV SERVERPORT 1099

# Ports to be exposed from the container for JMeter Slaves/Server
EXPOSE $SERVERPORT $LOCALPORT

# Application to run on starting the container
ENTRYPOINT $JMETER_HOME/bin/jmeter-server \
                        -Dserver.rmi.localport=$LOCALPORT \
                        -Dserver_port=$SERVERPORT