#!/bin/sh

#ffmpeg -loop 1 -i test.png -t 120 -c:v libx264 -pix_fmt yuv420p -an -f flv "rtmp://live.twitch.tv/app/{LiveStreamKey}"

#nope
#DIR=$1
#DEVICE=/dev/video0
#inotifywait -m "${DIR}" \
#| awk '$2== "CLOSE_WRITE,CLOSE" {print $1"/"$3; fflush()}' \
#| while read f; do
# gst-launch-0.10 uridecodebin uri="file://${f}" \
# ! ffmpegcolorspace \
# ! videoscale \
# ! imagefreeze \
# ! identity error-after=2 \
# ! v4l2sink show-preroll-frame=false device=${DEVICE}
#done

