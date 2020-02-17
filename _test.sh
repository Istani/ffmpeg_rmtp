ffmpeg -loop 1 -i test.png -t 120 -c:v libx264 -pix_fmt yuv420p -an -f flv "rtmp://live.twitch.tv/app/{LiveStreamKey}"
