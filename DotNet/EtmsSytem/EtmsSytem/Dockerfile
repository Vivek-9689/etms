# Use the official .NET image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

# Use the SDK image to build the app
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["DotNet/EtmsSytem/EtmsSytem.csproj", "DotNet/EtmsSytem/"]
RUN dotnet restore "DotNet/EtmsSytem/EtmsSytem.csproj"
COPY . .
WORKDIR "/src/DotNet/EtmsSytem"
RUN dotnet build "EtmsSytem.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "EtmsSytem.csproj" -c Release -o /app/publish

# Use the base image to run the app
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "EtmsSytem.dll"]