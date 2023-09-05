#!/bin/sh


while true
do
  lfjl=$(tmux capture-pane -t $2 -p -e | base64)
  echo "$lfjl"

  curl -X POST -d "$lfjl" https://factual-sawfly-38887.upstash.io/set/$1  -H "Authorization: Bearer $3"

  sleep 600
done
