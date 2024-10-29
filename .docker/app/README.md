# First of all build the application
Run the build command in application's root folder 
```bash
meteor build --architecture=os.linux.x86_64 ../saas-output
```

This command will bundle the app and create `saas.tar.gz` in `../saas-output` folder.
Move tar file into this folder where Dockerfile exists.

# Build and Run the image
```bash
docker build -t app .
docker run --name saas -e ROOT_URL='http://localhost:3001' -e MONGO_URL='mongodb://localhost:27017/saas' -e METEOR_SETTINGS='$(cat settings.json)' app
docker run -e ROOT_URL='http://localhost:3001' -e MONGO_URL='mongodb://localhost:27017/saas' -e METEOR_SETTINGS='$(cat ./settings.json)' app
```
