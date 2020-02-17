docker build -t ffmpeg_rmtp .
docker container rm -f ffmpeg_rmtp
docker run -it --shm-size=1gb --name ffmpeg_rmtp --restart always -v //c/Dropbox/SimpleSoftwareStudioShare/ffmpeg_rmtp/:/app --entrypoint='bash' ffmpeg_rmtp
