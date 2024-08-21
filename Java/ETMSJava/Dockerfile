# Use the official OpenJDK image
FROM openjdk:17-jdk-slim
VOLUME /tmp
COPY ./Java/ETMSJava/target/ETMSJava-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]